import { Controller, Get, Post, Body } from '@nestjs/common';
import { BillsService } from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get()
  getBills() {
    return this.billsService.getBills();
  }

  @Post()
  createBill(@Body() data) {
    return this.billsService.createBill(data);
  }
}
