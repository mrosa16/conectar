export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status?: "active" | "inactive";
  password?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
