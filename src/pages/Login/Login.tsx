import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import { loginSchema } from "../../schemas/login.schema";
import type { LoginFormData } from "../../schemas/login.schema";

import { Input } from "../../components/Input/Input";

import logo from "../../assets/icons/icon-ibuss.svg";

export function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [success, setSuccess] = useState(false);

  function onSubmit(data: LoginFormData) {
    console.log(data);
    setSuccess(true);
    reset();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--color-background)">
      <img src={logo} alt="Logo iBuss" className="w-20 mb-2" />

      <div className="w-full max-w-[320px] bg-(--color-secondary) rounded-3xl shadow-lg flex flex-col items-center gap-5 py-12 px-6">
        <h1 className="text-center text-xl font-semibold text-(--color-primary)">
          Já possui conta?
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4 mt-2"
        >
          <Input
            name="email"
            register={register}
            type="email"
            placeholder="e-mail"
            icon={Mail}
            error={errors.email?.message}
          />

          <Input
            name="password"
            register={register}
            type="password"
            placeholder="senha"
            icon={Lock}
            error={errors.password?.message}
          />

          <span className="w-full text-sm text-(--color-primary) -mt-2">
            <a href="#" className="underline font-medium">
              Esqueci minha senha
            </a>
          </span>

          <button
            type="submit"
            className="w-35.5 h-8.5 bg-(--color-primary) text-white rounded-[10px] mt-2 cursor-pointer"
          >
            Entrar
          </button>

          <span className="text-sm text-(--color-primary) mt-3">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="underline font-medium">
              Cadastre-se
            </Link>
          </span>
        </form>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-70 flex flex-col items-center gap-4 shadow-lg">
            <h2 className="text-lg font-semibold text-(--color-primary)">Sucesso!</h2>
            <p className="text-sm text-gray-600 text-center">Login realizado com sucesso!</p>
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
