"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { revalidateAfterSave } from "@/lib/revalidate"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"
import { ServiceForm, buildServiceData } from "../_components/service-form"
import type { ServiceFormValues } from "../_components/service-form"

export default function NewServicePage() {
  const router = useRouter()
  const [categories, setCategories] = useState<ServiceCategoryDoc[]>([])
  const [allServices, setAllServices] = useState<ServiceDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catSnap, svcSnap] = await Promise.all([
          getDocs(query(collection(db, "service_categories"), orderBy("name"))),
          getDocs(query(collection(db, "services"), orderBy("title"))),
        ])
        setCategories(catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) })))
        setAllServices(svcSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) })))
      } catch {
        toast.error("Failed to load data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  async function handleSave(values: ServiceFormValues) {
    setSaving(true)
    try {
      const slug = values.slug.trim()
      const slugUsed =
        allServices.some((s) => s.slug === slug) ||
        categories.some((c) => c.slug === slug)
      if (slugUsed) {
        toast.error("That URL slug is already in use.")
        return
      }

      const data = buildServiceData(values)
      await addDoc(collection(db, "services"), { ...data, createdAt: serverTimestamp() })
      toast.success("Service added")
      await revalidateAfterSave(["/services", `/services/${slug}`, "/about"])
      router.push("/admin/services")
    } catch {
      toast.error("Failed to save. Try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 p-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <ServiceForm
      categories={categories}
      allServices={allServices}
      onSave={handleSave}
      saving={saving}
    />
  )
}
