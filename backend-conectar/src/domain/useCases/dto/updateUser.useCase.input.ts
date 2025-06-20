export interface UpdateUserInput {
  // Quem está tentando editar
  requesterId: string;
  requesterRole: 'admin' | 'user';
  email?: string;
  role?: 'admin' | 'user';
  // Quem será editado
  targetUserId: string;

  name?: string;
  password?: string;
}
