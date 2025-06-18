export interface UpdateUserInput {
  // Quem está tentando editar
  requesterId: string;
  requesterRole: 'admin' | 'user';

  // Quem será editado
  targetUserId: string;

  name?: string;
  password?: string;
}
