import z from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  content: z.string().min(5, "Content must be at least 5 characters long"),
});

export type BlogSchema = z.infer<typeof blogSchema>;