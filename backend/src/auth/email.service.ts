import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly appUrl: string;

  constructor(config: ConfigService) {
    const host = config.get<string>('SMTP_HOST');
    const port = config.get<number>('SMTP_PORT');
    const user = config.get<string>('SMTP_USER');
    const pass = config.get<string>('SMTP_PASSWORD');
    this.from = config.get<string>('SMTP_FROM', user ?? '');
    this.appUrl = config.get<string>('APP_URL', 'http://localhost:3000');

    if (!host || !port || !user || !pass || !this.from) {
      throw new Error('SMTP configuration is required for email delivery.');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: config.get<string>('SMTP_SECURE', 'false') === 'true',
      auth: { user, pass },
    });
  }

  async sendPasswordReset(email: string, token: string): Promise<void> {
    const url = `${this.appUrl.replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`;
    await this.transporter.sendMail({
      from: this.from,
      to: email,
      subject: 'TFA password reset',
      text: `A password reset was requested for your TFA account. Reset your password here: ${url}\n\nThis link expires soon. If you did not request this, you can ignore this email.`,
      html: `<p>A password reset was requested for your TFA account.</p><p><a href="${url}">Reset your password</a></p><p>This link expires soon. If you did not request this, you can ignore this email.</p>`,
    });
  }
}
