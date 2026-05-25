"use client"

import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { serverTimestamp } from "firebase/firestore"
import { ArrowLeft } from "lucide-react"
import type { BlogPostDoc } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const BLOG_TAGS = [
  "Corporate", "Advisory", "Startups", "Taxation",
  "IP Law", "Litigation", "Compliance", "General",
] as const

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80)
}

export const blogSchema = z.object({
  slug: z.string().min(1, "Required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  tag: z.string().min(1, "Select a tag"),
  title: z.string().min(3, "Required"),
  date: z.string().min(1, "Required").regex(/^[A-Za-z]+ \d{4}$/, "Format: Month YYYY (e.g. May 2025)"),
  excerpt: z.string().min(20, "Min 20 characters"),
  featuredImage: z.string().optional(),
  content: z.string().optional(),
})

export type BlogFormValues = z.infer<typeof blogSchema>

export const BLOG_DEFAULT_VALUES: BlogFormValues = {
  slug: "", tag: "", title: "", date: "", excerpt: "", featuredImage: "", content: "",
}

export function toBlogFormValues(post: BlogPostDoc): BlogFormValues {
  return {
    slug: post.slug,
    tag: post.tag,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage ?? "",
    content: post.content ?? "",
  }
}

export function buildBlogData(values: BlogFormValues) {
  return {
    slug: values.slug.trim(),
    tag: values.tag,
    title: values.title.trim(),
    date: values.date.trim(),
    excerpt: values.excerpt.trim(),
    featuredImage: values.featuredImage?.trim() ?? "",
    content: values.content?.trim() ?? "",
    updatedAt: serverTimestamp(),
  }
}

export function BlogForm({
  initialData,
  onSave,
  saving,
}: {
  initialData?: BlogPostDoc
  onSave: (values: BlogFormValues) => Promise<void>
  saving: boolean
}) {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData ? toBlogFormValues(initialData) : BLOG_DEFAULT_VALUES,
  })

  const titleValue = watch("title")
  const slugEdited = useRef(!!initialData)

  useEffect(() => {
    if (!slugEdited.current) {
      setValue("slug", toSlug(titleValue), { shouldValidate: false })
    }
  }, [titleValue, setValue])

  const SaveButton = ({ label }: { label: string }) => (
    <Button type="submit" disabled={saving} style={{ background: "var(--fw-blue)", color: "white" }}>
      {saving ? (
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Saving…
        </span>
      ) : label}
    </Button>
  )

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => router.push("/admin/blog")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>
              {initialData ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {initialData ? `Editing "${initialData.title}"` : "Write a new blog article"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>Cancel</Button>
          <SaveButton label={initialData ? "Save changes" : "Publish post"} />
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Post details */}
        <div className="rounded-lg border bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Post Details</h2>

          <Field label="Title" error={errors.title?.message}>
            <Input placeholder="Post title…" {...register("title")} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug" error={errors.slug?.message}>
              <Input
                placeholder="auto-generated-from-title"
                {...register("slug")}
                onChange={(e) => { slugEdited.current = true; register("slug").onChange(e) }}
              />
            </Field>
            <Field label="Tag" error={errors.tag?.message}>
              <Controller
                control={control}
                name="tag"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="Select tag" /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {BLOG_TAGS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>

          <Field label="Date" error={errors.date?.message}>
            <Input placeholder="May 2025" {...register("date")} />
          </Field>

          <Field label="Excerpt" error={errors.excerpt?.message}>
            <Textarea rows={3} placeholder="Short summary shown on blog listing…" {...register("excerpt")} />
          </Field>
        </div>

        {/* Featured image */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Featured Image</h2>
          <Controller
            control={control}
            name="featuredImage"
            render={({ field }) => (
              <ImageUpload value={field.value ?? ""} onChange={field.onChange} />
            )}
          />
        </div>

        {/* Rich text content */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Content</h2>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <RichTextEditor
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Write your article… Use the toolbar for headings, bullet points, links and images."
              />
            )}
          />
          {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
        </div>

        <div className="flex justify-end gap-2 pb-8">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>Cancel</Button>
          <SaveButton label={initialData ? "Save changes" : "Publish post"} />
        </div>
      </div>
    </form>
  )
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Label className="text-sm font-medium">{label}</Label>
        {hint && <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>({hint})</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
