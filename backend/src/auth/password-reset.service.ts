import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(userId: string, ttlMinutes: number) {
    await this.prisma.authToken.updateMany({ where: { userId, type: 'PASSWORD_RESET', usedAt: null }, data: { usedAt: new Date() } });
    const token = randomBytes(48).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    await this.prisma.authToken.create({ data: { userId, type: 'PASSWORD_RESET', tokenHash, expiresAt: new Date(Date.now() + Math.max(5, ttlMinutes) * 60_000) } });
    return token;
  }

  async reset(tokenValue: string, password: string) {
    const tokenHash = createHash('sha256').update(tokenValue).digest('hex');
    const token = await this.prisma.authToken.findUnique({ where: { tokenHash } });
    if (!token || token.type !== 'PASSWORD_RESET' || token.usedAt || token.expiresAt <= new Date()) throw new UnauthorizedException('Invalid or expired password reset token.');
    const now = new Date();
    const passwordHash = await argon2.hash(password);
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: token.userId }, data: { passwordHash } }),
      this.prisma.authToken.update({ where: { id: token.id }, data: { usedAt: now } }),
      this.prisma.authToken.updateMany({ where: { userId: token.userId, type: 'REFRESH', usedAt: null }, data: { usedAt: now } }),
    ]);
  }
}
