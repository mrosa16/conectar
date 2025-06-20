import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ('admin' | 'user')[]) =>
  SetMetadata('roles', roles);
