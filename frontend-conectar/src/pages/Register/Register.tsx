import { useForm, FormProvider } from "react-hook-form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import type { RegisterFormInputs } from "../../types/register.types";

export default function Register() {
  const methods = useForm<RegisterFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Dados de registro:", data);
    // Aqui você pode fazer a requisição para o backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-blue)] px-4">
      <div className="bg-white shadow-lg p-6 sm:p-8 rounded-md w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-[var(--color-slate)]">
          Criar Conta
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome"
              placeholder="Digite seu nome"
              error={errors.name?.message}
              {...register("name", {
                required: "Nome obrigatório",
              })}
            />

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

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Registrar
            </Button>
          </form>
        </FormProvider>

        <p className="mt-4 text-center text-sm text-gray-500">
          Já tem uma conta?{" "}
          <a href="/login" className="text-[var(--color-orange)] font-semibold">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
