import { UserRepository } from '../repositories/user.repository';
import { LoginUserInput } from './dto/loginUser.useCase.input';
import { LoginUserOutput } from './dto/loginUser.useCase.output';
import { compare } from 'bcrypt';
export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new Error('Usuário não encontrado');
    user.lastLogin = new Date();
    await this.userRepository.update(user);
    const isMatch = await compare(input.password, user.password);

    if (!isMatch) throw new Error('Credenciais inválidas');

    return { id: user.id, email: user.email, role: user.role };
  }
}
