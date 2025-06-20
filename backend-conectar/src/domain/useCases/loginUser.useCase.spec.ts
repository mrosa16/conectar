import { LoginUseCase } from './loginUser.useCase';
import { UserRepository } from '../repositories/user.repository';
import { LoginUserInput } from './dto/loginUser.useCase.input';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      findByEmail: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new LoginUseCase(mockRepo);
  });

  it('deve realizar login com sucesso', async () => {
    const input: LoginUserInput = {
      email: 'michael@example.com',
      password: 'senha123',
    };

    const user = new User(
      '123',
      'Michael',
      'michael@example.com',
      await bcrypt.hash('senha123', 10),
      'user',
      new Date(),
      new Date(),
      new Date(),
    );

    mockRepo.findByEmail.mockResolvedValueOnce(user);
    mockRepo.update.mockResolvedValueOnce(user);

    const result = await useCase.execute(input);

    expect(mockRepo.findByEmail).toHaveBeenCalledWith('michael@example.com');
    expect(mockRepo.update).toHaveBeenCalled();
    expect(result).toEqual({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  });

  it('deve lançar erro se o e-mail não for encontrado', async () => {
    mockRepo.findByEmail.mockResolvedValueOnce(null);

    await expect(
      useCase.execute({ email: 'inexistente@example.com', password: '123' }),
    ).rejects.toThrow('Usuário não encontrado');
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const user = new User(
      '123',
      'Michael',
      'michael@example.com',
      await bcrypt.hash('senha_correta', 10),
      'user',
      new Date(),
      new Date(),
      new Date(),
    );

    mockRepo.findByEmail.mockResolvedValueOnce(user);

    await expect(
      useCase.execute({ email: 'michael@example.com', password: 'errada' }),
    ).rejects.toThrow('Credenciais inválidas');
  });
});
