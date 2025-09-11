import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  // Make a payment
  async makePayment(userId: string, billId: string, amount: number) {
    const bill = await this.prisma.bill.findFirst({
      where: { id: billId, userId },
    });

    if (!bill) throw new NotFoundException('Bill not found');
    if (bill.status === 'Paid') throw new BadRequestException('Bill already paid');

    if (amount !== bill.amount) {
      throw new BadRequestException(`Payment amount must be exactly ₱${bill.amount}`);
    }

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        amount,
        billId,
        userId,
      },
    });

    // Update bill status
    const updatedBill = await this.prisma.bill.update({
      where: { id: bill.id },
      data: { status: 'Paid' },
    });

    return {
      message: 'Payment successful',
      payment,
      updatedBill,
    };
  }

  // Get all payment history for a user
  async getHistory(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { paidAt: 'desc' },
      include: { bill: true },
    });
  }

  // Get bill payment status
  async getBillStatus(userId: string, billId: string) {
    const bill = await this.prisma.bill.findFirst({
      where: { id: billId, userId },
    });

    if (!bill) throw new NotFoundException('Bill not found');

    return {
      billId: bill.id,
      name: bill.name,
      status: bill.status,
      amount: bill.amount,
      dueDate: bill.dueDate,
    };
  }
  
}
