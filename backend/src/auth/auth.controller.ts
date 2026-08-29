import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) { return this.authService.register(dto); }

  @Post('login')
  login(@Body() dto: LoginDto) { return this.authService.login(dto); }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) { return this.authService.forgotPassword(dto); }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) { return this.authService.resetPassword(dto); }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request: AuthenticatedRequest) { return this.authService.getProfile(request.user.id); }
}
