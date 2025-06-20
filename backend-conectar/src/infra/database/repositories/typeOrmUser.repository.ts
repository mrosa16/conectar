import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';

import { UserRepository } from 'src/domain/repositories/user.repository';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindUsersFilter } from 'src/domain/useCases/dto/findUserFilter.useCase.filter';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    await this.repo.insert(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repo.findOne({ where: { email } });
    if (!userEntity) {
      return null;
    }
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
      userEntity.role,
      userEntity.lastLogin,
      userEntity.createdAt,
      userEntity.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repo.findOne({ where: { id } });
    if (!userEntity) {
      return null;
    }
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
      userEntity.role,
      userEntity.lastLogin,
      userEntity.createdAt,
      userEntity.updatedAt,
    );
  }

  async findAll(filter?: FindUsersFilter): Promise<User[]> {
    const whereClause: any = {};
    if (filter?.role) {
      whereClause.role = filter.role;
    }

    const orderClause: any = {};
    if (filter?.sortBy) {
      orderClause[filter.sortBy] = filter.order ?? 'asc';
    }

    const userEntities = await this.repo.find({
      where: whereClause,
      order: orderClause,
    });

    return userEntities.map(
      (userEntity) =>
        new User(
          userEntity.id,
          userEntity.name,
          userEntity.email,
          userEntity.password,
          userEntity.role,
          userEntity.lastLogin,
          userEntity.createdAt,
          userEntity.updatedAt,
        ),
    );
  }

  async update(user: User): Promise<User> {
    await this.repo.save(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findInactives(since: Date): Promise<User[]> {
    const userEntities = await this.repo
      .createQueryBuilder('user')
      .where('user.lastLogin < :since', { since })
      .getMany();

    return userEntities.map(
      (userEntity) =>
        new User(
          userEntity.id,
          userEntity.name,
          userEntity.email,
          userEntity.password,
          userEntity.role,
          userEntity.lastLogin,
          userEntity.createdAt,
          userEntity.updatedAt,
        ),
    );
  }
}
