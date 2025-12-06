import { BlogIdPageProps } from "./_types";
const BlogIdPage = async ({ params }: BlogIdPageProps) => {
  const { blogId } = await params;
  return (
    <div>{blogId.join(", ")}</div>
  )
}
export default BlogIdPage