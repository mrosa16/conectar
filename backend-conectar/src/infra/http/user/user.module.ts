// src/infra/http/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from 'src/domain/useCases/createUser.useCase';
import { DeleteUserUseCase } from 'src/domain/useCases/deleteUser.useCase';
import { FindAllUsersUseCase } from 'src/domain/useCases/findAllUsers.useCase';
import { FindaInactiveUseCase } from 'src/domain/useCases/findInactiveUsers.useCase';
import { UpdateUserUseCase } from 'src/domain/useCases/updateUser.useCase';

import { UserEntity } from 'src/infra/database/entities/user.entity';
import { TypeOrmUserRepository } from 'src/infra/database/repositories/typeOrmUser.repository';

import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserContoller } from 'src/interfaces/http/controllers/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserContoller],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    CreateUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindaInactiveUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
