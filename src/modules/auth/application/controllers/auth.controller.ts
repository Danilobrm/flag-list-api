// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  createUser(@Body() body: { email: string; password: string }): any {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { access_token } = await this.authService.login(
      body.email,
      body.password,
    );

    return { access_token };
  }
}
