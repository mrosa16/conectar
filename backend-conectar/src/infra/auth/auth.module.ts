import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';

import { CreateUserUseCase } from 'src/domain/useCases/createUser.useCase';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { LoginUseCase } from 'src/domain/useCases/loginUser.useCase';

import { UserModule } from '../http/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/interfaces/http/controllers/auth/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UserModule,
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    JwtStrategy,
    {
      provide: CreateUserUseCase,
      useFactory: (repo: UserRepository) => new CreateUserUseCase(repo),
      inject: [UserRepository],
    },
    {
      provide: LoginUseCase,
      useFactory: (repo: UserRepository) => new LoginUseCase(repo),
      inject: [UserRepository],
    },
  ],

  exports: [AuthService],
})
export class AuthModule {}
