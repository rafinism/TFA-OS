import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter?: nodemailer.Transporter;
  private readonly from?: string;
  private readonly appUrl: string;

  constructor(config: ConfigService) {
    const host = config.get<string>('SMTP_HOST');
    const port = config.get<number>('SMTP_PORT');
    const user = config.get<string>('SMTP_USER');
    const pass = config.get<string>('SMTP_PASSWORD');
    const from = config.get<string>('SMTP_FROM', user ?? '');
    this.appUrl = config.get<string>('APP_URL', 'http://localhost:3000');

    if (host && port && user && pass && from) {
      this.from = from;
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: config.get<string>('SMTP_SECURE', 'false') === 'true',
        auth: { user, pass },
      });
      this.logger.log('SMTP email delivery enabled.');
    } else {
      this.logger.warn('SMTP is not configured. Email delivery is disabled for local development.');
    }
  }

  private buildUrl(path: string, token: string) {
    return `${this.appUrl.replace(/\/$/, '')}/${path}?token=${encodeURIComponent(token)}`;
  }

  private async send(options: { to: string; subject: string; text: string; html: string; developmentUrl: string }) {
    if (!this.transporter || !this.from) {
      this.logger.warn(`Development link for ${options.to}: ${options.developmentUrl}`);
      return;
    }
    await this.transporter.sendMail({ from: this.from, ...options });
  }

  async sendEmailVerification(email: string, token: string): Promise<void> {
    const url = this.buildUrl('verify-email', token);
    await this.send({
      to: email,
      subject: 'Verify your TFA email address',
      text: `Welcome to TFA. Verify your email address here: ${url}\n\nThis link expires soon. If you did not create this account, you can ignore this email.`,
      html: `<p>Welcome to TFA.</p><p><a href="${url}">Verify your email address</a></p><p>This link expires soon. If you did not create this account, you can ignore this email.</p>`,
      developmentUrl: url,
    });
  }

  async sendPasswordReset(email: string, token: string): Promise<void> {
    const url = this.buildUrl('reset-password', token);
    await this.send({
      to: email,
      subject: 'TFA password reset',
      text: `A password reset was requested for your TFA account. Reset your password here: ${url}\n\nThis link expires soon. If you did not request this, you can ignore this email.`,
      html: `<p>A password reset was requested for your TFA account.</p><p><a href="${url}">Reset your password</a></p><p>This link expires soon. If you did not request this, you can ignore this email.</p>`,
      developmentUrl: url,
    });
  }
}
