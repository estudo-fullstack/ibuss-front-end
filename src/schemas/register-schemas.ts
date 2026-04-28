import * as z from "zod";
import { validateCPF } from "../utils/validateCPF";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "Mínimo 3 caracteres")
      .max(100, "Máximo 100 caracteres")
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),

    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .refine((value) => validateCPF(value), {
        message: "CPF inválido",
      }),

    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(/^\d{11}$/, "Telefone deve conter 11 números"),

    email: z
      .string()
      .min(1, "Email é obrigatório")
      .email("Formato de email inválido")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Mínimo 6 caracteres")
      .max(12, "Máximo 12 caracteres")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número")
      .regex(/^\S+$/, "Senha não deve conter espaços"),

    confirmPassword: z.string().min(1, "Confirmação é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterPayload = Omit<RegisterFormData, "confirmPassword">;
