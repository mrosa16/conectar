import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import { CreateUserUseCase } from 'src/domain/useCases/createUser.useCase';
import { LoginUseCase } from 'src/domain/useCases/loginUser.useCase';
import { RegisterRequestDto } from 'src/interfaces/http/controllers/dtos/registerRequest.dto';
import { LoginRequestDto } from 'src/interfaces/http/controllers/dtos/loginRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly createUser: CreateUserUseCase,
    private readonly loginUser: LoginUseCase,
  ) {}

  async register(data: RegisterRequestDto) {
    const hashedPassword = await this.bcryptService.hash(data.password);
    const user = await this.createUser.execute({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'user',
    });

    return { message: 'Usuário registrado com sucesso', user };
  }

  async login(data: LoginRequestDto) {
    const user = await this.loginUser.execute({
      email: data.email,
      password: data.password,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token: string = this.jwtService.sign(payload) as string;

    console.log('[DEBUG] Token gerado:', token);
    console.log('[DEBUG] JWT_SECRET usado no sign:', process.env.JWT_SECRET);

    return {
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
