import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import BlogCard from "./blogCard"


const BlogData = async () => {
  const blogs = await fetchQuery(api.blogs.getAlBlogs)
  return (
    <div>
      {
        blogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      }
    </div>
  )
}
export default BlogData