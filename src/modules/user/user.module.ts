import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserController } from './application/controllers/user.controller';
import { PrismaClient } from '@prisma/client';
import { CountryService } from '../country/application/services/country.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, PrismaClient, CountryService],
})
export class UserModule {}
