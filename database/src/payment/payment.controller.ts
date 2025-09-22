import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaymentDto } from './dtos/payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':billId')
  async makePayment(
    @Req() req,
    @Param('billId') billId: string,
    @Body() createPaymentDto: CreatePaymentDto, 
  ) {
    return this.paymentsService.makePayment(
      req.user.sub,
      billId,
      createPaymentDto.amount,
    );
  }

  @Get('history')
  async getHistory(@Req() req) {
    return this.paymentsService.getHistory(req.user.sub);
  }

  @Get('status/:billId')
  async getBillStatus(@Req() req, @Param('billId') billId: string) {
    return this.paymentsService.getBillStatus(req.user.sub, billId);
  }
}
