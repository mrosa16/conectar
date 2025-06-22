import { FormProvider, useForm } from "react-hook-form";
import type { LoginFormValues } from "../../types/form.types";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export function Login() {
  const methods = useForm<LoginFormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // Aqui você pode fazer o login com a API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-blue)] px-4">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-md space-y-6"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-center text-[var(--color-slate)]">
            Entrar na plataforma
          </h1>

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Senha obrigatória",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
          />

          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            Entrar
          </Button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Ainda não tem uma conta?{" "}
            <a
              href="/register"
              className="text-[var(--color-orange)] font-semibold"
            >
              Registre-se
            </a>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
