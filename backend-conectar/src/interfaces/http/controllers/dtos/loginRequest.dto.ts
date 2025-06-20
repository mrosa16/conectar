import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email inválido' })
  email: string;
  @ApiProperty()
  @IsString({ message: 'Senha inválida' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
