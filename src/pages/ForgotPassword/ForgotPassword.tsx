import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import { forgotPasswordSchema } from "../../schemas/forgot-password-schema";
import type { ForgotPasswordFormData } from "../../schemas/forgot-password-schema";

import { Input } from "../../components/Input/Input";

import logo from "../../assets/icons/icon-ibuss.svg";

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [success, setSuccess] = useState(false);

  function onSubmit(data: ForgotPasswordFormData) {
    // eslint-disable-next-line no-console
    console.log(data);
    // TODO: integrar com API de recuperação de senha
    setSuccess(true);
    reset();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--color-background)">
      <img src={logo} alt="Logo iBuss" className="w-20 mb-2" />

      <div className="w-full max-w-[320px] bg-(--color-secondary) rounded-3xl shadow-lg flex flex-col items-center gap-5 py-12 px-6">
        <h1 className="text-center text-xl font-semibold text-(--color-primary)">
          Esqueceu sua senha?
        </h1>

        <p className="text-center text-sm text-(--color-primary)">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>

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

          <button
            type="submit"
            className="w-35.5 h-8.5 bg-(--color-primary) text-white rounded-[10px] mt-2 cursor-pointer"
          >
            Enviar Link
          </button>

          <Link to="/" className="text-sm text-(--color-primary) underline mt-3">
            ← Voltar para o login
          </Link>
        </form>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-70 flex flex-col items-center gap-4 shadow-lg">
            <h2 className="text-lg font-semibold text-(--color-primary)">Sucesso!</h2>
            <p className="text-sm text-gray-600 text-center">Link enviado para o seu e-mail!</p>
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
