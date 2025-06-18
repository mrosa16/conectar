export interface DeleteUserInput {
  requesterId: string;
  requesterRole: 'admin' | 'user';
  targetUserId: string;
}
