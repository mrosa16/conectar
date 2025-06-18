import { UserRepository } from '../repositories/user.repository';
import { DeleteUserInput } from './dto/delteUser.useCase.input';

export class DeleteUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(input: DeleteUserInput) {
    const { requesterRole, targetUserId } = input;

    if (requesterRole !== 'admin') {
      throw new Error('Apenas administradores podem excluir usuários');
    }

    const user = await this.userRepo.findById(targetUserId);
    if (!user) throw new Error('Usuário não encontrado');

    return this.userRepo.delete(targetUserId);
  }
}
