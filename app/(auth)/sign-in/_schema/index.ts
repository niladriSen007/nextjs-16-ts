import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 character long"),
});

export type SignInSchema = z.infer<typeof signInSchema>;