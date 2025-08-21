import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { BillsService } from './bills.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBillDto } from './dtos/create-bill.dto';
import { UpdateBillDto } from './dtos/update-bill.dto';

@Controller('bills')
@UseGuards(JwtAuthGuard)
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

 @Post()
  async create(@Req() req, @Body() createBillDto: CreateBillDto) {
    return this.billsService.create(req.user.sub, createBillDto);
  }

   @Get()
  async findAll(@Req() req) {
    return this.billsService.findAll(req.user.sub);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    return this.billsService.findOne(req.user.sub, id);
  }

  @Put(':id')
  async update(@Req() req, @Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(req.user.sub, id, updateBillDto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    return this.billsService.remove(req.user.sub, id);
  }
}
