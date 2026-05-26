"use client"

import { useMemo, useEffect, useRef } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { serverTimestamp } from "firebase/firestore"
import { ArrowLeft, GripVertical, Plus, X } from "lucide-react"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

const ICON_OPTIONS = [
  "Building2",
  "ReceiptText",
  "Shield",
  "Rocket",
  "FileText",
  "PenLine",
  "Scale",
  "Briefcase",
  "BookOpen",
  "Landmark",
  "Gavel",
] as const

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80)
}

const STATUS_OPTIONS = ["draft", "published", "archived"] as const

const listItemSchema = z.object({ value: z.string().min(1, "Required") })

const serviceSchema = z.object({
  title: z.string().min(2, "Required"),
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  categoryId: z.string().min(1, "Select a category"),
  icon: z.string().min(1, "Select an icon"),
  shortDescription: z.string().min(20, "Min 20 characters"),
  hero: z.object({
    heading: z.string().min(2, "Required"),
    subheading: z.string().min(20, "Min 20 characters"),
    ctaText: z.string().min(2, "Required"),
  }),
  quickInfo: z.object({
    timeline: z.string().min(1, "Required"),
    consultation: z.string().min(1, "Required"),
    startingPrice: z.string().min(1, "Required"),
  }),
  benefits: z.array(listItemSchema),
  eligibility: z.array(listItemSchema),
  requiredDocuments: z.array(listItemSchema),
  processSteps: z.array(listItemSchema),
  whyChooseUs: z.array(listItemSchema),
  faqs: z.array(z.object({ q: z.string().min(1, "Required"), a: z.string().min(1, "Required") })),
  relatedServices: z.array(listItemSchema),
  seo: z.object({
    title: z.string().min(2, "Required"),
    description: z.string().min(20, "Min 20 characters"),
    keywords: z.string().min(1, "Required"),
  }),
  content: z.string().min(50, "Min 50 characters"),
  featuredImage: z.string().url("Enter a valid image URL").or(z.literal("")),
  status: z.enum(STATUS_OPTIONS),
})

export type ServiceFormValues = z.infer<typeof serviceSchema>

type ListFieldName =
  | "benefits"
  | "eligibility"
  | "requiredDocuments"
  | "processSteps"
  | "whyChooseUs"
  | "relatedServices"

const DEFAULT_VALUES: ServiceFormValues = {
  title: "",
  slug: "",
  categoryId: "",
  icon: "",
  shortDescription: "",
  hero: { heading: "", subheading: "", ctaText: "Book a consultation" },
  quickInfo: { timeline: "", consultation: "", startingPrice: "" },
  benefits: [{ value: "" }],
  eligibility: [],
  requiredDocuments: [],
  processSteps: [{ value: "" }],
  whyChooseUs: [],
  faqs: [],
  relatedServices: [],
  seo: { title: "", description: "", keywords: "" },
  content: "",
  featuredImage: "",
  status: "draft",
}

function listToForm(values?: string[]) {
  return values?.length ? values.map((value) => ({ value })) : []
}

function toFormValues(service: ServiceDoc): ServiceFormValues {
  return {
    title: service.title ?? "",
    slug: service.slug ?? "",
    categoryId: service.categoryId ?? "",
    icon: service.icon ?? "",
    shortDescription: service.shortDescription ?? "",
    hero: service.hero ?? { heading: service.title ?? "", subheading: service.shortDescription ?? "", ctaText: "Book a consultation" },
    quickInfo: service.quickInfo ?? { timeline: "", consultation: "", startingPrice: "" },
    benefits: listToForm(service.benefits),
    eligibility: listToForm(service.eligibility),
    requiredDocuments: listToForm(service.requiredDocuments),
    processSteps: listToForm(service.processSteps),
    whyChooseUs: listToForm(service.whyChooseUs),
    faqs: service.faqs ?? [],
    relatedServices: listToForm(service.relatedServices),
    seo: service.seo ?? { title: service.title ?? "", description: service.shortDescription ?? "", keywords: "" },
    content: service.content ?? "",
    featuredImage: service.featuredImage ?? "",
    status: service.status ?? "draft",
  }
}

function compactList(values: { value: string }[]) {
  return values.map((item) => item.value.trim()).filter(Boolean)
}

function compactFaqs(values: { q: string; a: string }[]) {
  return values.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q && f.a)
}

export function buildServiceData(values: ServiceFormValues) {
  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    categoryId: values.categoryId,
    icon: values.icon,
    shortDescription: values.shortDescription.trim(),
    hero: {
      heading: values.hero.heading.trim(),
      subheading: values.hero.subheading.trim(),
      ctaText: values.hero.ctaText.trim(),
    },
    quickInfo: {
      timeline: values.quickInfo.timeline.trim(),
      consultation: values.quickInfo.consultation.trim(),
      startingPrice: values.quickInfo.startingPrice.trim(),
    },
    benefits: compactList(values.benefits),
    eligibility: compactList(values.eligibility),
    requiredDocuments: compactList(values.requiredDocuments),
    processSteps: compactList(values.processSteps),
    whyChooseUs: compactList(values.whyChooseUs),
    faqs: compactFaqs(values.faqs),
    relatedServices: compactList(values.relatedServices),
    seo: {
      title: values.seo.title.trim(),
      description: values.seo.description.trim(),
      keywords: values.seo.keywords.trim(),
    },
    content: values.content.trim(),
    featuredImage: values.featuredImage.trim(),
    status: values.status,
    updatedAt: serverTimestamp(),
  }
}

type ServiceFormControl = ReturnType<typeof useForm<ServiceFormValues>>["control"]
type ServiceFormRegister = ReturnType<typeof useForm<ServiceFormValues>>["register"]
type ServiceFormErrors = ReturnType<typeof useForm<ServiceFormValues>>["formState"]["errors"]

export function ServiceForm({
  initialData,
  categories,
  allServices,
  onSave,
  saving,
}: {
  initialData?: ServiceDoc
  categories: ServiceCategoryDoc[]
  allServices: ServiceDoc[]
  onSave: (values: ServiceFormValues) => Promise<void>
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
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData ? toFormValues(initialData) : DEFAULT_VALUES,
  })

  const featuredImage = watch("featuredImage")
  const titleValue = watch("title")
  const slugEdited = useRef(!!initialData)

  useEffect(() => {
    if (!slugEdited.current) {
      setValue("slug", toSlug(titleValue), { shouldValidate: false })
    }
  }, [titleValue, setValue])

  const relatedServiceOptions = useMemo(
    () => allServices.filter((s) => s.id !== initialData?.id),
    [initialData?.id, allServices]
  )

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
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => router.push("/admin/services")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
            >
              {initialData ? "Edit Service" : "Add Service"}
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {initialData ? `Editing "${initialData.title}"` : "Create a new service listing"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
            Cancel
          </Button>
          <SaveButton label={initialData ? "Save changes" : "Add service"} />
        </div>
      </div>

      <FormSection title="Basics">
        <Field label="Title" error={errors.title?.message}>
          <Input placeholder="Private Limited Company Registration" {...register("title")} />
        </Field>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Slug" error={errors.slug?.message}>
            <Input
              placeholder="auto-generated-from-title"
              {...register("slug")}
              onChange={(e) => { slugEdited.current = true; register("slug").onChange(e) }}
            />
          </Field>
          <Field label="Category" error={errors.categoryId?.message}>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Icon" error={errors.icon?.message}>
            <Controller
              control={control}
              name="icon"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ICON_OPTIONS.map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Status" error={errors.status?.message}>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
        <Field label="Short Description" error={errors.shortDescription?.message}>
          <Textarea rows={3} placeholder="Short listing and card summary..." {...register("shortDescription")} />
        </Field>
      </FormSection>

      <FormSection title="Hero">
        <Field label="Heading" error={errors.hero?.heading?.message}>
          <Input placeholder="Register your private limited company with confidence" {...register("hero.heading")} />
        </Field>
        <Field label="Subheading" error={errors.hero?.subheading?.message}>
          <Textarea rows={3} placeholder="Hero subheading..." {...register("hero.subheading")} />
        </Field>
        <Field label="CTA Text" error={errors.hero?.ctaText?.message}>
          <Input placeholder="Book a consultation" {...register("hero.ctaText")} />
        </Field>
      </FormSection>

      <FormSection title="Quick Info">
        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Timeline" error={errors.quickInfo?.timeline?.message}>
            <Input placeholder="7-15 business days" {...register("quickInfo.timeline")} />
          </Field>
          <Field label="Consultation" error={errors.quickInfo?.consultation?.message}>
            <Input placeholder="Free initial call" {...register("quickInfo.consultation")} />
          </Field>
          <Field label="Starting Price" error={errors.quickInfo?.startingPrice?.message}>
            <Input placeholder="Starting at ₹4,999" {...register("quickInfo.startingPrice")} />
          </Field>
        </div>
      </FormSection>

      <ListSection control={control} register={register} errors={errors} name="benefits" title="Benefits" />
      <ListSection control={control} register={register} errors={errors} name="eligibility" title="Eligibility" />
      <ListSection control={control} register={register} errors={errors} name="requiredDocuments" title="Required Documents" />
      <ListSection control={control} register={register} errors={errors} name="processSteps" title="Process Steps" />
      <ListSection control={control} register={register} errors={errors} name="whyChooseUs" title="Why Choose Us" />

      <FaqSection control={control} register={register} errors={errors} />

      <RelatedServicesSection
        control={control}
        register={register}
        errors={errors}
        services={relatedServiceOptions}
      />

      <FormSection title="SEO">
        <Field label="SEO Title" error={errors.seo?.title?.message}>
          <Input placeholder="Private Limited Company Registration | NEXGEN" {...register("seo.title")} />
        </Field>
        <Field label="SEO Description" error={errors.seo?.description?.message}>
          <Textarea rows={3} placeholder="Search result description..." {...register("seo.description")} />
        </Field>
        <Field label="SEO Keywords" error={errors.seo?.keywords?.message}>
          <Input placeholder="private limited company, company registration, startup registration" {...register("seo.keywords")} />
        </Field>
      </FormSection>

      <FormSection title="Content & Media">
        <Field label="Featured Image" error={errors.featuredImage?.message}>
          <ImageUpload
            value={featuredImage}
            onChange={(url) => setValue("featuredImage", url, { shouldValidate: true })}
          />
        </Field>
        <Field label="Full Content" error={errors.content?.message}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Full long-form service page content..."
              />
            )}
          />
        </Field>
      </FormSection>

      <div className="flex justify-end gap-2 pb-8">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
          Cancel
        </Button>
        <SaveButton label={initialData ? "Save changes" : "Add service"} />
      </div>
    </form>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
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

function ListSection({
  control,
  register,
  errors,
  name,
  title,
}: {
  control: ServiceFormControl
  register: ServiceFormRegister
  errors: ServiceFormErrors
  name: ListFieldName
  title: string
}) {
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <FormSection title={title}>
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => append({ value: "" })}>
          <Plus className="h-3 w-3" /> Add item
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {fields.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No items yet.</p>
        ) : (
          fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <GripVertical className="mt-2 h-4 w-4 shrink-0" style={{ color: "var(--muted-foreground)" }} />
              <div className="flex-1">
                <Input placeholder={`${title} ${index + 1}`} {...register(`${name}.${index}.value`)} />
                {errors[name]?.[index]?.value && (
                  <p className="mt-0.5 text-xs text-destructive">{errors[name]?.[index]?.value?.message}</p>
                )}
              </div>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 shrink-0 p-0 text-destructive hover:text-destructive" onClick={() => remove(index)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
    </FormSection>
  )
}

function FaqSection({
  control,
  register,
  errors,
}: {
  control: ServiceFormControl
  register: ServiceFormRegister
  errors: ServiceFormErrors
}) {
  const { fields, append, remove } = useFieldArray({ control, name: "faqs" })

  return (
    <FormSection title="FAQs">
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => append({ q: "", a: "" })}>
          <Plus className="h-3 w-3" /> Add FAQ
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {fields.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No FAQs yet.</p>
        ) : (
          fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border bg-muted p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>FAQ {index + 1}</span>
                <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive hover:text-destructive" onClick={() => remove(index)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <Field label="Question" error={errors.faqs?.[index]?.q?.message}>
                  <Input placeholder="Question..." {...register(`faqs.${index}.q`)} />
                </Field>
                <Field label="Answer" error={errors.faqs?.[index]?.a?.message}>
                  <Textarea rows={2} placeholder="Answer..." {...register(`faqs.${index}.a`)} />
                </Field>
              </div>
            </div>
          ))
        )}
      </div>
    </FormSection>
  )
}

function RelatedServicesSection({
  control,
  register,
  errors,
  services,
}: {
  control: ServiceFormControl
  register: ServiceFormRegister
  errors: ServiceFormErrors
  services: ServiceDoc[]
}) {
  const { fields, append, remove } = useFieldArray({ control, name: "relatedServices" })

  return (
    <FormSection title="Related Services">
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => append({ value: "" })}>
          <Plus className="h-3 w-3" /> Add related service
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {fields.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No related services yet.</p>
        ) : (
          fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <GripVertical className="mt-2 h-4 w-4 shrink-0" style={{ color: "var(--muted-foreground)" }} />
              <div className="flex-1">
                {services.length > 0 ? (
                  <Controller
                    control={control}
                    name={`relatedServices.${index}.value`}
                    render={({ field: rf }) => (
                      <Select onValueChange={rf.onChange} value={rf.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {services.map((s) => (
                              <SelectItem key={s.id} value={s.slug}>{s.title}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                ) : (
                  <Input placeholder="related-service-slug" {...register(`relatedServices.${index}.value`)} />
                )}
                {errors.relatedServices?.[index]?.value && (
                  <p className="mt-0.5 text-xs text-destructive">{errors.relatedServices?.[index]?.value?.message}</p>
                )}
              </div>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 shrink-0 p-0 text-destructive hover:text-destructive" onClick={() => remove(index)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
    </FormSection>
  )
}
