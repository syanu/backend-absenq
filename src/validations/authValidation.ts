import { z } from "zod";

export const LoginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const RegisterValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role must be either 'admin' or 'user'" }),
  }),
});