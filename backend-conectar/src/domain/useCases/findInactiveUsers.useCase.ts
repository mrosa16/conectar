import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class FindaInactiveUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const thirdtyDaysAgo = new Date();
    thirdtyDaysAgo.setDate(thirdtyDaysAgo.getDate() - 30);
    return this.userRepository.findInactives(thirdtyDaysAgo);
  }
}
