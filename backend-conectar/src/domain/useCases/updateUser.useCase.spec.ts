import { UpdateUserUseCase } from './updateUser.useCase';
import { UserRepository } from '../repositories/user.repository';
import { BcryptService } from 'src/infra/auth/bcrypt.service';
import { User } from '../entities/user.entity';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let mockRepo: jest.Mocked<UserRepository>;
  let mockBcrypt: jest.Mocked<BcryptService>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    mockBcrypt = {
      hash: jest.fn(),
    } as any;

    useCase = new UpdateUserUseCase(mockRepo, mockBcrypt);
  });

  it('deve permitir que o próprio usuário atualize nome e senha', async () => {
    const user = new User(
      '123',
      'Antigo Nome',
      'user@email.com',
      'senha-antiga',
      'user',
      new Date(),
      new Date(),
      new Date(),
    );

    const input = {
      requesterId: '123',
      requesterRole: 'user' as const,
      targetUserId: '123',
      name: 'Nome Atualizado',
      password: 'novaSenha123',
    };

    mockRepo.findById.mockResolvedValueOnce(user);
    mockBcrypt.hash.mockResolvedValueOnce('novaSenhaCriptografada');
    mockRepo.update.mockResolvedValueOnce({
      ...user,
      name: input.name,
      password: 'novaSenhaCriptografada',
    });

    const result = await useCase.execute(input);

    expect(mockRepo.findById).toHaveBeenCalledWith('123');
    expect(mockBcrypt.hash).toHaveBeenCalledWith('novaSenha123');
    expect(mockRepo.update).toHaveBeenCalled();
    expect(result.name).toBe('Nome Atualizado');
    expect(result.password).toBe('novaSenhaCriptografada');
  });

  it('deve permitir que o admin atualize outro usuário', async () => {
    const user = new User(
      '999',
      'User Normal',
      'user@normal.com',
      'senha',
      'user',
      new Date(),
      new Date(),
      new Date(),
    );

    const input = {
      requesterId: 'admin-1',
      requesterRole: 'admin' as const,
      targetUserId: '999',
      name: 'Novo Nome',
      password: 'novaSenha123',
      email: 'novo@email.com',
      role: 'admin' as const,
    };

    mockRepo.findById.mockResolvedValueOnce(user);
    mockBcrypt.hash.mockResolvedValueOnce('senha-hash');
    mockRepo.update.mockResolvedValueOnce({
      ...user,
      name: input.name,
      password: 'senha-hash',
      email: input.email,
      role: input.role,
    });

    const result = await useCase.execute(input);

    expect(mockRepo.findById).toHaveBeenCalledWith('999');
    expect(mockBcrypt.hash).toHaveBeenCalledWith('novaSenha123');
    expect(mockRepo.update).toHaveBeenCalled();
    expect(result.name).toBe('Novo Nome');
    expect(result.email).toBe('novo@email.com');
    expect(result.role).toBe('admin');
  });

  it('deve lançar erro se usuário comum tentar atualizar outro usuário', async () => {
    const input = {
      requesterId: 'user-1',
      requesterRole: 'user' as const,
      targetUserId: 'user-2',
      name: 'Hackeando',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Access denied');
  });

  it('deve lançar erro se o usuário não for encontrado', async () => {
    mockRepo.findById.mockResolvedValueOnce(null);

    const input = {
      requesterId: 'admin-1',
      requesterRole: 'admin' as const,
      targetUserId: 'invalido',
    };

    await expect(useCase.execute(input)).rejects.toThrow('User not found');
  });
});
