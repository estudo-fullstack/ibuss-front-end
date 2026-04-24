import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

import { resetPasswordSchema } from "../../schemas/reset-password-schema";
import type { ResetPasswordFormData } from "../../schemas/reset-password-schema";

import { Input } from "../../components/Input/Input";

import logo from "../../assets/icons/icon-ibuss.svg";

export function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [success, setSuccess] = useState(false);

  function onSubmit(data: ResetPasswordFormData) {
    // eslint-disable-next-line no-console
    console.log(data);
    // TODO: integrar com API de redefinição de senha
    setSuccess(true);
    reset();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--color-background)">
      <img src={logo} alt="Logo iBuss" className="w-20 mb-2" />

      <div className="w-full max-w-[320px] bg-(--color-secondary) rounded-3xl shadow-lg flex flex-col items-center gap-5 py-12 px-6">
        <h1 className="text-center text-xl font-semibold text-(--color-primary)">
          Redefinir senha
        </h1>

        <p className="text-center text-sm text-(--color-primary)">
          Cadastre sua nova senha abaixo.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4 mt-2"
        >
          <Input
            name="password"
            register={register}
            type="password"
            placeholder="Nova senha"
            icon={Lock}
            error={errors.password?.message}
          />

          <Input
            name="confirmPassword"
            register={register}
            type="password"
            placeholder="Confirme a nova senha"
            icon={Lock}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="w-35.5 h-8.5 bg-(--color-primary) text-white rounded-[10px] mt-2 cursor-pointer"
          >
            Redefinir senha
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
            <p className="text-sm text-gray-600 text-center">Senha redefinida com sucesso!</p>
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
