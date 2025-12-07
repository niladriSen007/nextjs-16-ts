"use client"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SignUpSchema, signUpSchema } from "../_schema"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"

const SignupForm = () => {


  const navigateTo = useRouter()
  const [isSignUpPending, startSignUpTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(signUpSchema), defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit: SubmitHandler<SignUpSchema> = (data: SignUpSchema) => {
    console.log(data)
    startSignUpTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed up successfully")
            navigateTo.push("/sign-in")
          },
          onError: (error) => {
            toast.error(`Sign up failed: ${error.error.message}`)
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
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id="name" type="text" {...field} className="w-full" />
              {
                fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              }
            </Field>
          )}
        />
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
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id="confirmPassword" type="password" {...field} className="w-full" />
              {
                fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              }
            </Field>
          )}
        />
        <Button disabled={isSignUpPending} type="submit" className="w-full mt-4 bg-amber-500 hover:bg-amber-700 cursor-pointer">{
          isSignUpPending ? "Signing up..." : "Sign Up"
        }</Button>
      </FieldGroup>
    </form>
  )
}
export default SignupForm