import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { FindUsersFilter } from './dto/findUserFilter.useCase.filter';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(filter?: FindUsersFilter): Promise<User[]> {
    return await this.userRepository.findAll(filter);
  }
}
