import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(6)
  password: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: 'admin' | 'user';
}
