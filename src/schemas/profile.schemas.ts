import * as z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Mínimo 3 caracteres")
    .max(100, "Máximo 100 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),

  phoneNumber: z
    .string()
    .min(1, "Celular é obrigatório")
    .regex(/^\d{11}$/, "Celular deve conter 11 números"),

  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Formato de email inválido")
    .toLowerCase(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;