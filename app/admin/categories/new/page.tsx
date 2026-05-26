"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { revalidateAfterSave } from "@/lib/revalidate"
import type { ServiceCategoryDoc } from "@/types"
import { CategoryForm, buildCategoryData } from "../_components/category-form"
import type { CategoryFormValues } from "../_components/category-form"

export default function NewCategoryPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<ServiceCategoryDoc[]>([])
  const [serviceSlugs, setServiceSlugs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catSnap, svcSnap] = await Promise.all([
          getDocs(collection(db, "service_categories")),
          getDocs(collection(db, "services")),
        ])
        setCategories(catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) })))
        setServiceSlugs(svcSnap.docs.map((d) => String(d.data().slug ?? "")))
      } catch {
        toast.error("Failed to load data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  async function handleSave(values: CategoryFormValues) {
    setSaving(true)
    try {
      const slug = values.slug.trim()
      const slugUsed =
        categories.some((c) => c.slug === slug) || serviceSlugs.includes(slug)
      if (slugUsed) {
        toast.error("That URL slug is already in use.")
        return
      }

      const data = buildCategoryData(values)
      await addDoc(collection(db, "service_categories"), { ...data, createdAt: serverTimestamp() })
      toast.success("Category added")
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

  return <CategoryForm onSave={handleSave} saving={saving} />
}
