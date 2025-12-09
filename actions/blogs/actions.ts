"use server"

import { blogSchema, BlogSchema } from "@/app/(root)/create-blog/_schema";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(blog: BlogSchema) {

  const parsedData = blogSchema.safeParse(blog);

  if (!parsedData.success) {
    throw new Error("Invalid blog data");
  }

  const token = await getToken();
  await fetchMutation(api.blogs.createBlog, parsedData.data, { token });
  revalidatePath('/blog')
  return redirect('/blog')
}