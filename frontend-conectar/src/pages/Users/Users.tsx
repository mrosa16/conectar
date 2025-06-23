import { useState } from "react";
import UserTable from "../../components/Table/UserTable";
import type { User } from "../../types/user.type";

function Users() {
  const [filter, setFilter] = useState("all");
  const [orderBy, setOrderBy] = useState<"name" | "createdAt">("name");

  const usuarios: User[] = [
    {
      id: "1",
      name: "Michael",
      email: "michael@example.com",
      role: "user",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Admin",
      email: "admin@example.com",
      role: "admin",

      createdAt: new Date().toISOString(),
    },
    // ... mais usuários
  ];

  const filteredUsers = usuarios
    .filter((u) => filter === "all" || u.role === filter)
    .sort((a, b) => {
      if (orderBy === "name") return a.name.localeCompare(b.name);
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const handleDelete = (id: string) => {
    console.log("Excluir usuário:", id);
  };

  return (
    <UserTable
      users={filteredUsers}
      onDelete={handleDelete}
      filter={filter}
      setFilter={setFilter}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
    />
  );
}

export default Users;
