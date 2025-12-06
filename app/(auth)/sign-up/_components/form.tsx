"use client"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SignUpSchema, signUpSchema } from "../_schema"
import { Button } from "@/components/ui/button"

const SignupForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema), defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    console.log(data)
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
        <Button type="submit" className="w-full mt-4 bg-amber-500 hover:bg-amber-700 cursor-pointer">Sign Up</Button>
      </FieldGroup>
    </form>
  )
}
export default SignupForm