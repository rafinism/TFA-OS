import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly email: EmailService,
  ) {}

  private publicUser(user: {
    id: string;
    email: string;
    displayName: string;
    role: string;
    status: string;
  }) {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      status: user.status,
    };
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException(
        'An account with this email already exists.',
      );
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName: dto.displayName.trim(),
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        status: true,
      },
    });

    return this.publicUser(user);
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        displayName: true,
        passwordHash: true,
        role: true,
        status: true,
      },
    });

    if (
      !user ||
      user.status !== 'ACTIVE' ||
      !(await argon2.verify(user.passwordHash, dto.password))
    ) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      role: user.role,
    });

    return {
      accessToken,
      user: this.publicUser(user),
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        status: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException();
    }

    return this.publicUser(user);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    const message =
      'If the account exists, a password reset email has been sent.';

    if (!user || user.status !== 'ACTIVE') {
      return { message };
    }

    await this.prisma.authToken.updateMany({
      where: {
        userId: user.id,
        type: 'PASSWORD_RESET',
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    const rawToken = randomBytes(48).toString('base64url');

    const tokenHash = createHash('sha256')
      .update(rawToken)
      .digest('hex');

    await this.prisma.authToken.create({
      data: {
        userId: user.id,
        type: 'PASSWORD_RESET',
        tokenHash,
        expiresAt: new Date(
          Date.now() + this.getResetTokenExpiryMs(),
        ),
      },
    });

    await this.email.sendPasswordReset(
      user.email,
      rawToken,
    );

    return { message };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const token = await this.prisma.authToken.findUnique({
      where: { tokenHash },
    });

    if (
      !token ||
      token.type !== 'PASSWORD_RESET' ||
      token.usedAt ||
      token.expiresAt <= new Date()
    ) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token.',
      );
    }

    const now = new Date();
    const passwordHash = await argon2.hash(dto.password);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: token.userId },
        data: { passwordHash },
      }),

      this.prisma.authToken.update({
        where: { id: token.id },
        data: { usedAt: now },
      }),

      this.prisma.authToken.updateMany({
        where: {
          userId: token.userId,
          type: 'REFRESH',
          usedAt: null,
        },
        data: { usedAt: now },
      }),
    ]);

    return {
      message: 'Password reset successfully.',
    };
  }

  getResetTokenExpiryMs() {
    const minutes = this.config.get<number>(
      'PASSWORD_RESET_TOKEN_TTL_MINUTES',
      30,
    );

    return Math.max(5, minutes) * 60_000;
  }
}