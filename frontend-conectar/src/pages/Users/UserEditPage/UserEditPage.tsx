import { useForm, FormProvider } from "react-hook-form";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type { User } from "../../../types/user.type";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

export default function UserEditPage() {
  const { id } = useParams();
  const methods = useForm<User>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    const fetchUser = async () => {
      const user = {
        name: "João Admin",
        email: "joao@admin.com",
        role: "admin",
        status: "active",
      };
      reset(user);
    };
    fetchUser();
  }, [reset]);

  const onSubmit = (data: User) => {
    console.log("Dados atualizados:", data);
    // Aqui você pode fazer a requisição para atualizar o usuário
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-blue)] p-4">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-slate)] text-center">
          Editar Usuário
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome"
              {...register("name", { required: "Nome obrigatório" })}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "Email obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label="Senha"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Papel</label>
              <select
                {...register("role")}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                {...register("status")}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <Button type="submit" loading={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
