import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { RequestWithUser } from 'src/infra/auth/interfaces/jwtPayload.interface';
import { JwtAuthGuard } from 'src/infra/auth/jwt.guard';
import { UpdateUserRequestDto } from '../dtos/updateUser.dto';
import { UpdateUserInput } from 'src/domain/useCases/dto/updateUser.useCase.input';
import { UpdateUserUseCase } from 'src/domain/useCases/updateUser.useCase';
import { FindAllUsersUseCase } from 'src/domain/useCases/findAllUsers.useCase';
import { RolesGuard } from 'src/infra/auth/roles.guard';

@Controller('user')
export class UserContoller {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('me')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.sub;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(
    @Query('role') role?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    const users = await this.findAllUsersUseCase.execute({
      role,
      sortBy: sortBy === 'name' || sortBy === 'createdAt' ? sortBy : undefined,
      order,
    });
    //const users = await this.userRepository.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }

  @UseGuards(JwtAuthGuard) // Somente esse aqui
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() body: UpdateUserRequestDto,
  ) {
    const isOwner = req.user.sub === id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'Apenas administradores podem alterar dados de outros usuários.',
      );
    }

    if (!isAdmin) {
      if (body.role != null) {
        delete body.role;
        throw new ForbiddenException(
          'Apenas administradores podem alterar role',
        );
      }

      if (body.email != null) {
        delete body.email;
        throw new ForbiddenException(
          'Apenas administradores podem alterar email',
        );
      }
    }

    const input: UpdateUserInput = {
      requesterId: req.user.sub,
      requesterRole: req.user.role,
      targetUserId: id,
      name: body.name,
      password: body.password,
      email: body.email,
      role: body.role,
    };
    console.log(input);
    const updatedUser = await this.updateUserUseCase.execute(input);

    return {
      message: 'Usuário atualizado com sucesso',
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      updatedAt: updatedUser.updatedAt,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userRepository.delete(id);
    return { message: 'Usuário deletado com sucesso' };
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('inactives')
  async findInactives() {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const inactives = await this.userRepository.findInactives(since);

    return inactives.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }
}
