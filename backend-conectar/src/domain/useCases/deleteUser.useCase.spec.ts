import { DeleteUserUseCase } from './deleteUser.useCase';
import { UserRepository } from '../repositories/user.repository';

import { User } from '../entities/user.entity';
import { DeleteUserInput } from './dto/delteUser.useCase.input';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      delete: jest.fn(),
      findById: jest.fn(),
    } as any;

    deleteUserUseCase = new DeleteUserUseCase(mockRepo);
  });

  it('deve permitir que o admin exclua um usuário', async () => {
    const input: DeleteUserInput = {
      requesterId: 'admin-id',
      requesterRole: 'admin',
      targetUserId: 'user-id',
    };

    mockRepo.findById.mockResolvedValueOnce(
      new User(
        'user-id',
        'Michael',
        'michael@example.com',
        '123',
        'user',
        new Date(),
        new Date(),
        new Date(),
      ),
    );

    await deleteUserUseCase.execute(input);
    expect(mockRepo.delete).toHaveBeenCalledWith('user-id');
  });

  it('deve lançar erro se usuário comum tentar deletar outro usuário', async () => {
    const input: DeleteUserInput = {
      requesterId: 'user1-id',
      requesterRole: 'user',
      targetUserId: 'user2-id',
    };

    await expect(deleteUserUseCase.execute(input)).rejects.toThrow(
      'Apenas administradores podem excluir usuários',
    );
  });

  it('deve lançar erro se o usuário não existir', async () => {
    const input: DeleteUserInput = {
      requesterId: 'admin-id',
      requesterRole: 'admin',
      targetUserId: 'nao-existe',
    };

    mockRepo.findById.mockResolvedValueOnce(null);

    await expect(deleteUserUseCase.execute(input)).rejects.toThrow(
      'Usuário não encontrado',
    );
  });
});
