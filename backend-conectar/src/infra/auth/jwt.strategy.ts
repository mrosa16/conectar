import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    console.log('[DEBUG] JWT payload recebido no validate:', payload);
    console.log('[DEBUG] JWT_SECRET no strategy:', process.env.JWT_SECRET);

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      console.log('[JWT] Usuário não encontrado com ID:', payload.sub);
      throw new UnauthorizedException();
    }

    console.log('[JWT] Usuário validado:', user.email);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
