
const BlogCard = ({ blog }: { blog: { title: string, content: string, authorId: string } }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{blog?.title}</h2>
      <p>{blog?.content}</p>
    </div>
  )
}
export default BlogCard