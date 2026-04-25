import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Formato de email inválido").toLowerCase(),

  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Mínimo 6 caracteres")
    .max(12, "Máximo 12 caracteres")
    .regex(/^\S+$/, "Senha não deve conter espaços"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
