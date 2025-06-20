export class UpdateUserRequestDto {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
}
