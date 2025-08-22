import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create({
    name,
    email,
    passwordHash,
    budget: 0,
    bills: { create: [] },
    priorities: { create: [] },
  });

    const token = await this.signToken(user.id, user.email);
    return { access_token: token, user: { id: user.id, name: user.name, email: user.email } };
  }

  // auth.service.ts
 async validateUserByEmail(email: string, password: string) {
  const user = await this.users.findByEmail(email); // ✅ use your existing method

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) return null;

  return { id: user.id, email: user.email, name: user.name };
}

  async login(user: { id: string; email: string; name: string }) {
    const token = await this.signToken(user.id, user.email);
    return { access_token: token, user };
  }

  private async signToken(sub: string, email: string) {
    return this.jwt.signAsync({ sub, email });
  }

  async findUserById(id: string) {
  const user = await this.usersService.findById(id); 
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.name };
}
}
