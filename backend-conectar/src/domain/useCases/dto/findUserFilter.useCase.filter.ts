export interface FindUsersFilter {
  role?: string;
  sortBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}
