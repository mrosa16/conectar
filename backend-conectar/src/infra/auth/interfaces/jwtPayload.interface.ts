import { Request } from 'express';

export interface JwtPayload {
  sub: string; // <- necessário para req.user.id funcionar
  email: string;
  role: 'admin' | 'user';
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
