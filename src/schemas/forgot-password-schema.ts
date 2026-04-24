import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Formato de email inválido").toLowerCase(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
