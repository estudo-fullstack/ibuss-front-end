import { Input } from "../../components/Input/Input";
import logo from "../../assets/icons/icon-ibuss.svg";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, CreditCard, Phone } from "lucide-react";
import { PatternFormat } from "react-number-format";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório").min(3, "Mínimo 3 caracteres"),
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(/^\d{11}$/, "CPF deve conter 11 números"),
    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(/^\d{11}$/, "Telefone deve conter 11 números"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>;

export function Register() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
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

  function onSubmit(data: FormData) {
    console.log(data);
    reset();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--color-background)">
      <img src={logo} alt="Logo iBuss" className="w-20 mb-2" />
      <div className="w-full max-w-[320px] bg-(--color-secondary) rounded-3xl shadow-lg flex flex-col items-center gap-5 py-12 px-6">
        <h1 className="text-center text-xl font-semibold text-(--color-primary)">
          Crie sua conta
        </h1>

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

          <button
            type="submit"
            className="w-35.5 h-8.5 bg-(--color-primary) text-white rounded-[10px] mt-2 cursor-pointer"
          >
            Cadastrar
          </button>

          <span className="text-sm text-(--color-primary) mt-3">
            Já tem uma conta?{" "}
            <a href="#" className="underline font-medium">
              Faça o login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}
