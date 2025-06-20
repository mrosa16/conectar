import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsString()
  id?: string;
  @ApiProperty()
  @IsString()
  name?: string;
  @ApiProperty()
  @IsEmail()
  email?: string;
  @ApiProperty()
  @IsString()
  password?: string;
  @ApiProperty()
  @IsString()
  role?: 'admin' | 'user';
}
