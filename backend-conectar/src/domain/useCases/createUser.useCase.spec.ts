// src/domain/useCases/createUser.useCase.spec.ts
import { CreateUserUseCase } from './createUser.useCase';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
      findInactives: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockRepo);
  });

  it('deve criar um usuário com sucesso', async () => {
    const fixedDate = new Date();
    const userInput = new User(
      '',
      'Michael',
      'michael@example.com',
      'senha123',
      'user',
      fixedDate,
      fixedDate,
      fixedDate,
    );

    const createdUser = new User(
      'generated-id',
      'Michael',
      'michael@example.com',
      'senha123',
      'user',
      fixedDate,
      fixedDate,
      fixedDate,
    );

    mockRepo.create.mockResolvedValue(createdUser);

    const result = await createUserUseCase.execute(userInput);

    expect(result).toEqual(createdUser);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Michael',
        email: 'michael@example.com',
        password: 'senha123',
        role: 'user',
      }),
    );
  });
});
