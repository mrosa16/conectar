import { BcryptService } from 'src/infra/auth/bcrypt.service';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserInput } from './dto/updateUser.useCase.input';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(input: UpdateUserInput) {
    const {
      requesterId,
      requesterRole,
      targetUserId,
      name,
      password,
      role,
      email,
    } = input;

    const isAdmin = requesterRole === 'admin';
    const isSelf = requesterId === targetUserId;

    if (!isAdmin && !isSelf) {
      throw new Error('Access denied');
    }

    const user = await this.userRepo.findById(targetUserId);
    if (!user) throw new Error('User not found');

    if (name) user.name = name;
    if (password) user.password = await this.bcryptService.hash(password);
    if (isAdmin) {
      if (email) user.email = email;
      if (role) user.role = role;
    }
    user.updatedAt = new Date();

    return this.userRepo.update(user);
  }
}
