import { Card, CardContent, CardTitle } from "@/components/ui/card"
import CreateBlogForm from "./_components/form"

const page = () => {
  return (
    <Card className="max-w-4xl mx-auto w-full">
      <CardTitle>Create Blog</CardTitle>
      <CardContent>
        <CreateBlogForm />
      </CardContent>
    </Card>
  )
}
export default page