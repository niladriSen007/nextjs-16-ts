import { Suspense } from "react"
import BlogData from "./_components/blogData"

export const dynamic = 'force-static'
const Page = () => {
  return (
    <div>
      <h2>Blog List</h2>
      <Suspense fallback={<div className="text-white font-bold">Loading...</div>}>
        <BlogData />
      </Suspense>
    </div>
  )
}
export default Page