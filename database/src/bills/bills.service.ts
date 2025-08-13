import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  getBills() {
    return this.prisma.bill.findMany();
  }

  createBill(data) {
    return this.prisma.bill.create({ data });
  }
}
