// src/components/Table/UserTable.tsx
import type { UserTableProps } from "./UserTableProps";
import { Link } from "react-router-dom";

function UserTable({
  users,
  onDelete,
  filter,
  setFilter,
  orderBy,
  setOrderBy,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <select
          className="border rounded p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="admin">Admins</option>
          <option value="user">Usuários</option>
        </select>

        <select
          className="border rounded p-2"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as "name" | "createdAt")}
        >
          <option value="name">Ordenar por Nome</option>
          <option value="createdAt">Ordenar por Data</option>
        </select>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Papel</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">
                {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </td>
              <td className="p-3 text-center space-x-2">
                <Link
                  to={`/users/edit/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
