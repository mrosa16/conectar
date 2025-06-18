export type UserRole = 'admin' | 'user';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole = 'user',
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
