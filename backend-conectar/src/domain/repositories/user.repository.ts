import { User } from '../entities/user.entity';
import { BaseRepository } from './base.repository';

export abstract class UserRepository extends BaseRepository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findInactives(since: Date): Promise<User[]>;
}
