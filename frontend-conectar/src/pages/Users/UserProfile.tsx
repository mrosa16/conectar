import { useEffect } from "react";
import type { LoginFormValues } from "../../types/form.types";

import Input from "../../components/Input/Input";

import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import LogoutButton from "../../components/Button/LogoutButton";
const mockUser = {
  id: "asda",
  name: "Michael",
  email: "michael@example.com",
  role: "user",
  isActive: true,
  lastLogin: new Date(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function UserProfile() {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      name: "",

      password: "",
    },
    mode: "onTouched",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  useEffect(() => {
    reset(mockUser);
  }, [reset]);

  const onSubmit = async (data: LoginFormValues) => {
    console.log("working", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-light-blue)]">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-slate)]">
          Meu Perfil
        </h2>

        <FormProvider {...methods}>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email"
              error={errors.email?.message}
              readOnly
              className="cursor-not-allowed border-none focus:outline-none bg-gray-100 text-gray-600"
              {...register("email")}
            />

            <Input
              label="Senha"
              error={errors.password?.message}
              type="password"
              {...register("password")}
            />

            <Input
              label="Data de criação"
              value={mockUser.createdAt}
              readOnly
              className="cursor-not-allowed border-none focus:outline-none bg-gray-100 text-gray-600"
            />

            <div className="flex gap-4">
              <Button loading={isSubmitting} type="submit">
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
              <LogoutButton />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default UserProfile;
