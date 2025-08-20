import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { BillsModule } from "../bills/bills.module";

@Module({
  imports: [BillsModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
