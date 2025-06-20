import { FindaInactiveUseCase } from './findInactiveUsers.useCase';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

describe('FindaInactiveUseCase', () => {
  let useCase: FindaInactiveUseCase;
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      findInactives: jest.fn(),
    } as any;

    useCase = new FindaInactiveUseCase(mockRepo);
  });

  it('deve retornar usuários inativos dos últimos 30 dias', async () => {
    const mockDate = new Date();
    jest.useFakeTimers().setSystemTime(mockDate);

    const inactiveUsers: User[] = [
      new User(
        '1',
        'User Inativo',
        'inativo@example.com',
        '123',
        'user',
        new Date('2024-01-01'),
        new Date('2024-01-02'),
        new Date('2024-01-03'),
      ),
    ];

    mockRepo.findInactives.mockResolvedValueOnce(inactiveUsers);

    const result = await useCase.execute();

    const expectedDate = new Date(mockDate);
    expectedDate.setDate(expectedDate.getDate() - 30);

    expect(mockRepo.findInactives).toHaveBeenCalledWith(expectedDate);
    expect(result).toEqual(inactiveUsers);

    jest.useRealTimers();
  });
});
