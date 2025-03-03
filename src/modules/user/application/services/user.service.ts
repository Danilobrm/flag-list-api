import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Holiday } from 'src/modules/country/models/types/country';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  //   async addHolidayToCalendar(holidays: Holiday[]) {
  // didn't had time to finish implementing this function
  //   }

  // Find a user by email
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
