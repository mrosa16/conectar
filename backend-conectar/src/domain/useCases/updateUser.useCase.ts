import { UserRepository } from '../repositories/user.repository';
import { UpdateUserInput } from './dto/updateUser.useCase.input';

export class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(input: UpdateUserInput) {
    const { requesterId, requesterRole, targetUserId, name, password } = input;

    // Regra de permissão
    const isAdmin = requesterRole === 'admin';
    const isSelf = requesterId === targetUserId;

    if (!isAdmin && !isSelf) {
      throw new Error('Access denied');
    }

    const user = await this.userRepo.findById(targetUserId);
    if (!user) throw new Error('User not found');

    if (name) user.name = name;
    if (password) user.password = password;
    user.updatedAt = new Date();

    return this.userRepo.update(user);
  }
}
