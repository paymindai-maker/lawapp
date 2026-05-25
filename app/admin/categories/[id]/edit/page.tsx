"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import type { ServiceCategoryDoc } from "@/types"
import { CategoryForm, buildCategoryData } from "../../_components/category-form"
import type { CategoryFormValues } from "../../_components/category-form"

export default function EditCategoryPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<ServiceCategoryDoc | null>(null)
  const [allCategories, setAllCategories] = useState<ServiceCategoryDoc[]>([])
  const [serviceSlugs, setServiceSlugs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
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
      setAllCategories(allCatSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) })))
      setServiceSlugs(svcSnap.docs.map((d) => String(d.data().slug ?? "")))
      setLoading(false)
    }
    fetchData()
  }, [id, router])

  async function handleSave(values: CategoryFormValues) {
    if (!category) return
    setSaving(true)
    try {
      const slug = values.slug.trim()
      const slugUsed =
        allCategories.some((c) => c.slug === slug && c.id !== category.id) ||
        serviceSlugs.includes(slug)
      if (slugUsed) {
        toast.error("That URL slug is already in use.")
        return
      }

      const data = buildCategoryData(values)
      await updateDoc(doc(db, "service_categories", category.id), data)
      toast.success("Category updated")
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
