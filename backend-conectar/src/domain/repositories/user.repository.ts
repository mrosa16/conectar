import { User } from '../entities/user.entity';
import { FindUsersFilter } from '../useCases/dto/findUserFilter.useCase.filter';
import { BaseRepository } from './base.repository';

export abstract class UserRepository extends BaseRepository<
  User,
  FindUsersFilter
> {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findInactives(since: Date): Promise<User[]>;
}
