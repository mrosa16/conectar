import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/infra/auth/auth.service';
import { RegisterRequestDto } from '../dtos/registerRequest.dto';
import { LoginRequestDto } from '../dtos/loginRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }
}
