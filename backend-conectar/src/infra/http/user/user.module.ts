// src/infra/http/user/user.module.ts
import { forwardRef, Module } from '@nestjs/common';
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
import { BcryptService } from 'src/infra/auth/bcrypt.service';
import { AuthModule } from 'src/infra/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserContoller],
  providers: [
    BcryptService,
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo: UserRepository) => new CreateUserUseCase(repo),
      inject: [UserRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repo: UserRepository, bcrypt: BcryptService) =>
        new UpdateUserUseCase(repo, bcrypt),
      inject: [UserRepository, BcryptService],
    },

    {
      provide: DeleteUserUseCase,
      useFactory: (repo: UserRepository) => new DeleteUserUseCase(repo),
      inject: [UserRepository],
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (repo: UserRepository) => new FindAllUsersUseCase(repo),
      inject: [UserRepository],
    },
    {
      provide: FindaInactiveUseCase,
      useFactory: (repo: UserRepository) => new FindaInactiveUseCase(repo),
      inject: [UserRepository],
    },
  ],

  exports: [UserRepository, BcryptService],
})
export class UserModule {}
