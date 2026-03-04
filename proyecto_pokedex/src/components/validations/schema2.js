import { z } from "zod";

export const userSchema1 = z.object({
  comentario: z
    .string()
    .min(1, { message: "Obligatorio" })
    .max(300, { message: "Máximo 300 caracteres" }),
});