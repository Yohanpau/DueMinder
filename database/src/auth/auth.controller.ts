import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto, LoginDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body.name, body.email, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() _: LoginDto, @Request() req) {
    return this.auth.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  me(@Request() req) {
    return { user: req.user };
  }
}
