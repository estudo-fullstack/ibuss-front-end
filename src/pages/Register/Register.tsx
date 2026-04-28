import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { User, Mail, Lock, CreditCard, Phone } from "lucide-react";
import { PatternFormat } from "react-number-format";

import { createUser } from "../../api/user.api";
import { registerSchema } from "../../schemas/register.schemas";
import type { RegisterFormData, RegisterPayload } from "../../schemas/register.schemas";

import { Input } from "../../components/Input/Input";

import logo from "../../assets/icons/icon-ibuss.svg";

export function Register() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      cpf: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [success, setSuccess] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: createUser,
    onMutate: () => {
      setSubmitError(null);
    },
    onSuccess: () => {
      setSuccess(true);
      reset();
    },
    onError: (error) => {
      if (typeof error.message === "string") {
        setSubmitError(error.message);
        return;
      }
      setSubmitError("Nao foi possivel realizar o cadastro. Tente novamente.");
    },
  });

  function onSubmit(data: RegisterPayload) {
    registerMutation.mutate({
      name: data.name,
      cpf: data.cpf,
      phoneNumber: data.phone,
      email: data.email,
      password: data.password,
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--color-background)">
      <img src={logo} alt="Logo iBuss" className="w-20 mb-2" />
      <div className="w-full max-w-[320px] bg-(--color-secondary) rounded-3xl shadow-lg flex flex-col items-center gap-5 py-12 px-6">
        <h1 className="text-center text-xl font-semibold text-(--color-primary)">Crie sua conta</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4 mt-2"
        >
          <Input
            name="name"
            register={register}
            placeholder="Digite seu nome"
            icon={User}
            error={errors.name?.message}
          />

          {/* CPF com Máscara e salvando apenas os números limpos */}
          <Controller
            name="cpf"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <PatternFormat
                format="###.###.###-##"
                mask="_"
                customInput={Input}
                getInputRef={ref}
                name="cpf"
                value={value}
                onValueChange={(values) => onChange(values.value)}
                placeholder="Digite seu CPF"
                icon={CreditCard}
                error={errors.cpf?.message}
              />
            )}
          />

          {/* Telefone com Máscara e salvando apenas os números limpos */}
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <PatternFormat
                format="(##) #####-####"
                mask="_"
                customInput={Input}
                getInputRef={ref}
                name="phone"
                value={value}
                onValueChange={(values) => onChange(values.value)}
                placeholder="Digite seu telefone"
                icon={Phone}
                error={errors.phone?.message}
              />
            )}
          />

          <Input
            name="email"
            register={register}
            type="email"
            placeholder="Digite seu email"
            icon={Mail}
            error={errors.email?.message}
          />

          <Input
            name="password"
            register={register}
            type="password"
            placeholder="Digite sua senha"
            icon={Lock}
            error={errors.password?.message}
          />

          <Input
            name="confirmPassword"
            register={register}
            type="password"
            placeholder="Confirme sua senha"
            icon={Lock}
            error={errors.confirmPassword?.message}
          />

          {submitError && <p className="w-full text-sm text-red-500 text-center">{submitError}</p>}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-35.5 h-8.5 bg-(--color-primary) text-white rounded-[10px] mt-2 cursor-pointer"
          >
            {registerMutation.isPending ? "Cadastrando..." : "Cadastrar"}
          </button>

          <span className="text-sm text-(--color-primary) mt-3">
            Já tem uma conta?{" "}
            <Link to="/" className="underline font-medium">
              Faça o login
            </Link>
          </span>
        </form>
      </div>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-70 flex flex-col items-center gap-4 shadow-lg">
            <h2 className="text-lg font-semibold text-(--color-primary)">Sucesso!</h2>
            <p className="text-sm text-gray-600 text-center">Cadastro realizado com sucesso!</p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-2 w-full h-10 bg-(--color-primary) text-white rounded-lg cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
