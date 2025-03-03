import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client'; // Prisma User model
import * as bcrypt from 'bcrypt'; // Correct for bcrypt

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient, // Inject Prisma service to access the database
    private jwtService: JwtService, // Inject JWT service
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  // Login the user and generate a JWT token
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    const payload = { sub: user?.id, email: user?.email };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  // Validate user during login
  async validateUser(email: string, password: string): Promise<User | null> {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user; // Return the user object if valid
  }
}
