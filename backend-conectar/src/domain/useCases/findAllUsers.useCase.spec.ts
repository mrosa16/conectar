import { FindAllUsersUseCase } from './findAllUsers.useCase';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { FindUsersFilter } from './dto/findUserFilter.useCase.filter';

describe('FindAllUsersUseCase', () => {
  let useCase: FindAllUsersUseCase;
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
    } as any;

    useCase = new FindAllUsersUseCase(mockRepo);
  });

  it('deve retornar todos os usuários sem filtro', async () => {
    const users: User[] = [
      new User(
        '1',
        'Michael',
        'michael@example.com',
        '123',
        'user',
        new Date(),
        new Date(),
        new Date(),
      ),
      new User(
        '2',
        'Admin',
        'admin@example.com',
        '123',
        'admin',
        new Date(),
        new Date(),
        new Date(),
      ),
    ];

    mockRepo.findAll.mockResolvedValueOnce(users);

    const result = await useCase.execute();

    expect(result).toEqual(users);
    expect(mockRepo.findAll).toHaveBeenCalledWith(undefined);
  });

  it('deve aplicar filtro de role e ordenação', async () => {
    const filter: FindUsersFilter = {
      role: 'admin',
      sortBy: 'name',
      order: 'asc',
    };
    const users: User[] = [
      new User(
        '2',
        'Admin',
        'admin@example.com',
        '123',
        'admin',
        new Date(),
        new Date(),
        new Date(),
      ),
    ];

    mockRepo.findAll.mockResolvedValueOnce(users);

    const result = await useCase.execute(filter);

    expect(result).toEqual(users);
    expect(mockRepo.findAll).toHaveBeenCalledWith(filter);
  });
});
