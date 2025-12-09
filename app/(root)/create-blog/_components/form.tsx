"use client"
import { createBlog } from "@/actions/blogs/actions"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { BlogSchema, blogSchema } from "../_schema"

const CreateBlogForm = () => {

  const [isBlogCreationPending, startBlogCreationTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(blogSchema), defaultValues: {
      title: "",
      content: ""
    }
  })

  const onSubmit: SubmitHandler<BlogSchema> = (data: BlogSchema) => {
    startBlogCreationTransition(async () => {
      console.log(data)
      await createBlog(data)
      toast.success("Blog created successfully!")
      /* startBlogCreationTransition(async () => {
        // Simulate blog creation API call
      }) */
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id="title" type="text" {...field} className="w-full" />
              {
                fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              }
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea aria-invalid={fieldState.invalid} id="content" {...field} className="w-full" />
              {
                fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              }
            </Field>
          )}
        />
        <Button disabled={isBlogCreationPending} type="submit" className="w-full mt-4 bg-amber-500 hover:bg-amber-700 cursor-pointer">
          {isBlogCreationPending ? "Creating blog..." : "Create Blog"}
        </Button>
      </FieldGroup>
    </form>
  )
}
export default CreateBlogForm