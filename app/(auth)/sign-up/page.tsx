import { Card, CardContent, CardTitle } from "@/components/ui/card"
import SignupForm from "./_components/form"

const page = () => {
  return (
    <Card>
      <CardTitle>Sign Up</CardTitle>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  )
}
export default page