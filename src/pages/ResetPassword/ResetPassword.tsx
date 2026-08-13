import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";

import { resetPassword } from "../../api/user.api";
import { resetPasswordSchema } from "../../schemas/reset-password-schema";
import type { ResetPasswordFormData } from "../../schemas/reset-password-schema";

import { Input } from "../../components/Input/Input";

import logo from "../../assets/icons/icon-ibuss.svg";

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onMutate: () => {
      setSubmitError(null);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      if (typeof error.message === "string") {
        setSubmitError(error.message);
        return;
      }
      setSubmitError("Não foi possível redefinir a senha. Tente novamente.");
    },
  });

  const hasValidLink = Boolean(id && token);

  function onSubmit(data: ResetPasswordFormData) {
    if (!hasValidLink) {
      setSubmitError("Link inválido. Verifique o link recebido no e-mail.");
      return;
    }
    resetPasswordMutation.mutate({ id: id!, token: token!, password: data.password });
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

          {submitError && <p className="w-full text-sm text-red-500 text-center">{submitError}</p>}

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending || !hasValidLink}
            className="w-35.5 h-8.5 bg-(--color-primary) text-white rounded-[10px] mt-2 cursor-pointer"
          >
            {resetPasswordMutation.isPending ? "Redefinindo..." : "Redefinir senha"}
          </button>

          <Link to="/" className="text-sm text-(--color-primary) underline mt-3">
            ← Voltar para o login
          </Link>
        </form>
      </div>
    </div>
  );
}
