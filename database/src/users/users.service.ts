import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { bills: true, priorities: true }, // also fetch related data if needed
    });
  }

  async getBudget(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: { budget: true },
  });
  return { budget: user?.budget || 0 };
}

async updateBudget(id: string, budget: number) {
  return this.prisma.user.update({
    where: { id },
    data: { budget },
  });
}

}
