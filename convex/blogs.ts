import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";


// Create a new task with the given text
export const createBlog = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx); // Ensure the user is authenticated
    if (!user) {
      throw new ConvexError("User must be logged in to create a blog");
    }
    const newBlogId = await ctx.db.insert("blogs",
      {
        title: args.title,
        content: args.content,
        authorId: user?._id
      }
    );
    return newBlogId;
  },
});

export const getAlBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();
    return blogs;
  },
})