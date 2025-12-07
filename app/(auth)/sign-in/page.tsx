import { Card, CardContent, CardTitle } from "@/components/ui/card"
import SignInForm from "./_components/form"

const page = () => {
  return (
    <Card>
      <CardTitle>Sign In</CardTitle>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
export default page