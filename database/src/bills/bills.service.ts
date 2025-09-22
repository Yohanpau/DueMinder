import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBillDto } from './dtos/create-bill.dto';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  // Create a bill and link it to a user
  async create(userId: string, data: CreateBillDto) {
  const priorityMap: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  return this.prisma.bill.create({
    data: {
      name: data.name,
      amount: parseFloat(data.amount as any), // ensure it's a number
      dueDate: new Date(data.dueDate),
      priority: priorityMap[data.priority] ?? 2, // default to Medium if undefined
      userId: userId,
    },
  });
}

  // Get all bills for a user
  async findAll(userId: string) {
    return this.prisma.bill.findMany({
      where: { userId },
    });
  }

  // Get one bill
  async findOne(userId: string, id: string) {
    const bill = await this.prisma.bill.findFirst({
      where: { id, userId },
    });
    if (!bill) throw new NotFoundException('Bill not found');
    return bill;
  }

  // Update a bill
  async update(userId: string, id: string, data: any) {
  const bill = await this.findOne(userId, id); // ensure ownership

  const priorityMap: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  return this.prisma.bill.update({
    where: { id: bill.id },
    data: {
      name: data.name,
      amount: data.amount ? parseFloat(data.amount) : bill.amount,
      dueDate: data.dueDate ? new Date(data.dueDate) : bill.dueDate,
      priority: data.priority ? priorityMap[data.priority] ?? bill.priority : bill.priority,
    },
  });
}

  // Delete a bill
  async remove(userId: string, id: string) {
    const bill = await this.findOne(userId, id); // ensure ownership
    return this.prisma.bill.delete({
      where: { id: bill.id },
    });
  }
}
