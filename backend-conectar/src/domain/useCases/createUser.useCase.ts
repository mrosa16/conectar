import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserInput } from './dto/createUser.useCase.input';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const exits = await this.userRepository.findByEmail(input.email);

    if (exits) throw new Error('Usuário já existe');

    const user = new User(
      randomUUID(),
      input.name,
      input.email,
      input.password,
      input.role || 'user',
      new Date(),
      new Date(),
    );

    return this.userRepository.create(user);
  }
}
