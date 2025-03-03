import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient],
})
export class AuthModule {}
