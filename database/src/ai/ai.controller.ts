import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chatWithAI(@Body() body: { message: string }) {
    const reply = await this.aiService.generateResponse(body.message);
    return { reply };
  }
}
