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
import { VerifyEmailDto } from './dto/verify-email.dto';
import { EmailService } from './email.service';

const CONSTITUTION_VERSION = 'First Edition';
const TERMS_VERSION = '1.0';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService, private readonly config: ConfigService, private readonly email: EmailService) {}

  private publicUser(user: { id: string; email: string; displayName: string; role: string; status: string; emailVerifiedAt?: Date | null }) {
    return { id: user.id, email: user.email, displayName: user.displayName, role: user.role, status: user.status, emailVerified: Boolean(user.emailVerifiedAt) };
  }

  private getEmailVerificationTokenExpiryMs() {
    const minutes = this.config.get<number>('EMAIL_VERIFICATION_TOKEN_TTL_MINUTES', 1440);
    return Math.max(5, minutes) * 60_000;
  }

  private async createEmailVerificationToken(userId: string) {
    await this.prisma.authToken.updateMany({ where: { userId, type: 'EMAIL_VERIFICATION', usedAt: null }, data: { usedAt: new Date() } });
    const rawToken = randomBytes(48).toString('base64url');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    await this.prisma.authToken.create({ data: { userId, type: 'EMAIL_VERIFICATION', tokenHash, expiresAt: new Date(Date.now() + this.getEmailVerificationTokenExpiryMs()) } });
    return rawToken;
  }

  async register(dto: RegisterDto) {
    if (dto.acceptConstitution !== true || dto.acceptTerms !== true) {
      throw new ConflictException('You must accept the TFA Constitution and Terms and Conditions to create an account.');
    }

    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('An account with this email already exists.');

    const now = new Date();
    const passwordHash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName: dto.displayName.trim(),
        constitutionAcceptedAt: now,
        constitutionVersion: CONSTITUTION_VERSION,
        termsAcceptedAt: now,
        termsVersion: TERMS_VERSION,
      },
      select: { id: true, email: true, displayName: true, role: true, status: true, emailVerifiedAt: true },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTRATION_POLICY_ACCEPTED',
        entityType: 'User',
        entityId: user.id,
        details: {
          constitutionVersion: CONSTITUTION_VERSION,
          termsVersion: TERMS_VERSION,
          acceptedAt: now.toISOString(),
        },
      },
    });

    const token = await this.createEmailVerificationToken(user.id);
    await this.email.sendEmailVerification(user.email, token);
    return { ...this.publicUser(user), message: 'Account created. Check your email to verify your address before signing in.' };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true, email: true, displayName: true, passwordHash: true, role: true, status: true, emailVerifiedAt: true } });
    if (!user || user.status !== 'ACTIVE' || !(await argon2.verify(user.passwordHash, dto.password))) throw new UnauthorizedException('Invalid email or password.');
    if (!user.emailVerifiedAt) throw new UnauthorizedException('Please verify your email address before signing in.');
    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return { accessToken, user: this.publicUser(user) };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, displayName: true, role: true, status: true, emailVerifiedAt: true } });
    if (!user || user.status !== 'ACTIVE' || !user.emailVerifiedAt) throw new UnauthorizedException();
    return this.publicUser(user);
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');
    const token = await this.prisma.authToken.findUnique({ where: { tokenHash }, include: { user: { select: { emailVerifiedAt: true } } } });

    if (!token) throw new UnauthorizedException('Invalid or expired email verification link.');

    // React Strict Mode can run the verification effect twice during development.
    // Treat an already-consumed token for an already-verified account as success.
    if (token.usedAt && token.user.emailVerifiedAt) {
      return { message: 'Email address verified successfully. You can now sign in.' };
    }

    if (token.type !== 'EMAIL_VERIFICATION' || token.usedAt || token.expiresAt <= new Date()) {
      throw new UnauthorizedException('Invalid or expired email verification link.');
    }

    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: token.userId }, data: { emailVerifiedAt: now } }),
      this.prisma.authToken.update({ where: { id: token.id }, data: { usedAt: now } }),
      this.prisma.authToken.updateMany({ where: { userId: token.userId, type: 'EMAIL_VERIFICATION', usedAt: null }, data: { usedAt: now } }),
    ]);
    return { message: 'Email address verified successfully. You can now sign in.' };
  }

  async resendEmailVerification(dto: ForgotPasswordDto) {
    const email = dto.email.trim().toLowerCase();
    const message = 'If the account requires email verification, a new verification email has been sent.';
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true, email: true, status: true, emailVerifiedAt: true } });
    if (!user || user.status !== 'ACTIVE' || user.emailVerifiedAt) return { message };
    const token = await this.createEmailVerificationToken(user.id);
    await this.email.sendEmailVerification(user.email, token);
    return { message };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true, email: true, status: true } });
    const message = 'If the account exists, a password reset email has been sent.';
    if (!user || user.status !== 'ACTIVE') return { message };
    await this.prisma.authToken.updateMany({ where: { userId: user.id, type: 'PASSWORD_RESET', usedAt: null }, data: { usedAt: new Date() } });
    const rawToken = randomBytes(48).toString('base64url');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    await this.prisma.authToken.create({ data: { userId: user.id, type: 'PASSWORD_RESET', tokenHash, expiresAt: new Date(Date.now() + this.getResetTokenExpiryMs()) } });
    await this.email.sendPasswordReset(user.email, rawToken);
    return { message };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');
    const token = await this.prisma.authToken.findUnique({ where: { tokenHash } });
    if (!token || token.type !== 'PASSWORD_RESET' || token.usedAt || token.expiresAt <= new Date()) throw new UnauthorizedException('Invalid or expired password reset token.');
    const now = new Date();
    const passwordHash = await argon2.hash(dto.password);
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: token.userId }, data: { passwordHash } }),
      this.prisma.authToken.update({ where: { id: token.id }, data: { usedAt: now } }),
      this.prisma.authToken.updateMany({ where: { userId: token.userId, type: 'REFRESH', usedAt: null }, data: { usedAt: now } }),
    ]);
    return { message: 'Password reset successfully.' };
  }

  getResetTokenExpiryMs() {
    const minutes = this.config.get<number>('PASSWORD_RESET_TOKEN_TTL_MINUTES', 30);
    return Math.max(5, minutes) * 60_000;
  }
}
