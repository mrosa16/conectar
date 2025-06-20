import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';

import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('[JWT] Usuário validado:', user.email);

    return {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
