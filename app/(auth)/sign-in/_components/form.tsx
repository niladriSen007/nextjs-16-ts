"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SignInSchema, signInSchema } from "../_schema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"

const SignInForm = () => {

  const [isSignInPending, startSignInTransition] = useTransition();
  const navigateTo = useRouter()
  const form = useForm({
    resolver: zodResolver(signInSchema), defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<SignInSchema> = (data: SignInSchema) => {
    console.log(data)
    startSignInTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully")
            navigateTo.push("/")
          },
          onError: (error) => {
            toast.error(`Sign in failed: ${error.error.message}`)
          }
        }
      })
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id="email" type="email" {...field} className="w-full" />
              {
                fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              }
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id="password" type="password" {...field} className="w-full" />
              {
                fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              }
            </Field>
          )}
        />
        <Button disabled={isSignInPending} type="submit" className="w-full mt-4 bg-amber-500 hover:bg-amber-700 cursor-pointer">
          {isSignInPending ? "Signing in..." : "Sign In"}
        </Button>
      </FieldGroup>
    </form>
  )
}
export default SignInForm