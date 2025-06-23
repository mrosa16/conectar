import type { User } from "../../types/user.type";

export type UserTableProps = {
  users: User[];
  onDelete: (id: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  orderBy: "name" | "createdAt";
  setOrderBy: (value: "name" | "createdAt") => void;
};
