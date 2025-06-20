import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      console.log('[JWT Guard] Erro:', err);
      console.log('[JWT Guard] Info:', info);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
