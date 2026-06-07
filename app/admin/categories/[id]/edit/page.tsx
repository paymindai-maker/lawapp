"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { revalidateAfterSave } from "@/lib/revalidate"
import type { ServiceCategoryDoc } from "@/types"
import { CategoryForm } from "../../_components/category-form"
import type { CategoryFormValues } from "../../_components/category-form"
import { buildCategoryData } from "../../_components/category-utils"

export default function EditCategoryPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<ServiceCategoryDoc | null>(null)
  const allCategories = useRef<ServiceCategoryDoc[]>([])
  const serviceSlugs = useRef<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catDoc, allCatSnap, svcSnap] = await Promise.all([
          getDoc(doc(db, "service_categories", id)),
          getDocs(collection(db, "service_categories")),
          getDocs(collection(db, "services")),
        ])

        if (!catDoc.exists()) {
          toast.error("Category not found")
          router.push("/admin/categories")
          return
        }

        setCategory({ id: catDoc.id, ...(catDoc.data() as Omit<ServiceCategoryDoc, "id">) })
        allCategories.current = allCatSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) }))
        serviceSlugs.current = svcSnap.docs.map((d) => String(d.data().slug ?? ""))
      } catch {
        toast.error("Failed to load data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, router])

  async function handleSave(values: CategoryFormValues) {
    if (!category) return
    setSaving(true)
    try {
      const slug = values.slug.trim()
      const slugUsed =
        allCategories.current.some((c) => c.slug === slug && c.id !== category.id) ||
        serviceSlugs.current.includes(slug)
      if (slugUsed) {
        toast.error("That URL slug is already in use.")
        return
      }

      const data = buildCategoryData(values)
      await updateDoc(doc(db, "service_categories", category.id), data)
      toast.success("Category updated")
      await revalidateAfterSave(["/services", "/about"])
      router.push("/admin/categories")
    } catch {
      toast.error("Failed to save. Try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 p-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  if (!category) return null

  return <CategoryForm initialData={category} onSave={handleSave} saving={saving} />
}
