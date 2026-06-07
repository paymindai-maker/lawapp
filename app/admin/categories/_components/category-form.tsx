"use client"

import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { serverTimestamp } from "firebase/firestore"
import { ArrowLeft } from "lucide-react"
import type { ServiceCategoryDoc } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80)
}

const categorySchema = z.object({
  name: z.string().min(2, "Required"),
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  description: z.string().min(20, "Min 20 characters"),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

const CATEGORY_DEFAULT_VALUES: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
}

function toCategoryFormValues(cat: ServiceCategoryDoc): CategoryFormValues {
  return { name: cat.name, slug: cat.slug, description: cat.description }
}

function buildCategoryData(values: CategoryFormValues) {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    description: values.description.trim(),
    updatedAt: serverTimestamp(),
  }
}

function SaveButton({ label, saving }: { label: string; saving: boolean }) {
  return (
    <Button type="submit" disabled={saving} style={{ background: "var(--fw-blue)", color: "white" }}>
      {saving ? (
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Saving…
        </span>
      ) : label}
    </Button>
  )
}

export function CategoryForm({
  initialData,
  onSave,
  saving,
}: {
  initialData?: ServiceCategoryDoc
  onSave: (values: CategoryFormValues) => Promise<void>
  saving: boolean
}) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ? toCategoryFormValues(initialData) : CATEGORY_DEFAULT_VALUES,
  })

  const slugEdited = useRef(!!initialData)


  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => router.push("/admin/categories")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
            >
              {initialData ? "Edit Category" : "Add Category"}
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {initialData ? `Editing "${initialData.name}"` : "Create a new service category"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
            Cancel
          </Button>
          <SaveButton label={initialData ? "Save changes" : "Add category"} saving={saving} />
        </div>
      </div>

      <div className="max-w-2xl rounded-lg border bg-card p-6 space-y-5">
        <Field label="Name" error={errors.name?.message}>
          <Input
            placeholder="Business Registration"
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e)
              if (!slugEdited.current) {
                setValue("slug", toSlug(e.target.value), { shouldValidate: false })
              }
            }}
          />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <Input
            placeholder="auto-generated-from-name"
            {...register("slug")}
            onChange={(e) => { slugEdited.current = true; register("slug").onChange(e) }}
          />
        </Field>
        <Field label="Description" error={errors.description?.message}>
          <Textarea rows={5} placeholder="Short category landing page description..." {...register("description")} />
        </Field>
      </div>

      <div className="flex max-w-2xl justify-end gap-2 pb-8">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
          Cancel
        </Button>
        <SaveButton label={initialData ? "Save changes" : "Add category"} saving={saving} />
      </div>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
