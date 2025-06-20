import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/infra/auth/auth.service';
import { RegisterRequestDto } from '../dtos/registerRequest.dto';
import { LoginRequestDto } from '../dtos/loginRequest.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Realiza Registro do usuário' })
  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }
  @ApiOperation({ summary: 'Realiza login do usuário' })
  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }
}
