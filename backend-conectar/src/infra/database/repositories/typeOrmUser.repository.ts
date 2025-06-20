import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';

import { UserRepository } from 'src/domain/repositories/user.repository';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

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
      userEntity.createdAt,
      userEntity.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.repo.find();
    console.log('[DEBUG] Users encontrados no banco:', userEntities);

    return userEntities.map(
      (userEntity) =>
        new User(
          userEntity.id,
          userEntity.name,
          userEntity.email,
          userEntity.password,
          userEntity.role,
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
      .where('user.updatedAt < :since', { since })
      .getMany();

    return userEntities.map(
      (userEntity) =>
        new User(
          userEntity.id,
          userEntity.name,
          userEntity.email,
          userEntity.password,
          userEntity.role,
          userEntity.createdAt,
          userEntity.updatedAt,
        ),
    );
  }
}
