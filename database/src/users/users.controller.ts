import { Controller, Get, Put, Body, Req, UseGuards, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("budget")
  async getBudget(@Req() req) {
  return this.usersService.getBudget(req.user.id); // ✅ use id
}

   @Put(':id/budget')
    async updateBudget(
    @Param('id') id: string,
    @Body('budget') budget: number,
  ) {
    return this.usersService.updateBudget(id, budget);
  }
  
  
}
