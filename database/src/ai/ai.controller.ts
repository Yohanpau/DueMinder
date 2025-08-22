import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { AiService } from "./ai.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("chat")
  @UseGuards(JwtAuthGuard) // ensures req.user.sub is available
  async chat(@Body() body: { query: string }, @Req() req) {
    const userId = req.user.sub;
    const reply = await this.aiService.answerQuery(userId, body.query);
    return { reply };
  }
}
