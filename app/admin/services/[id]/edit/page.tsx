"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { revalidateAfterSave } from "@/lib/revalidate"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"
import { ServiceForm, buildServiceData } from "../../_components/service-form"
import type { ServiceFormValues } from "../../_components/service-form"

export default function EditServicePage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [service, setService] = useState<ServiceDoc | null>(null)
  const [categories, setCategories] = useState<ServiceCategoryDoc[]>([])
  const [allServices, setAllServices] = useState<ServiceDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [svcDoc, catSnap, svcSnap] = await Promise.all([
          getDoc(doc(db, "services", id)),
          getDocs(query(collection(db, "service_categories"), orderBy("name"))),
          getDocs(query(collection(db, "services"), orderBy("title"))),
        ])

        if (!svcDoc.exists()) {
          toast.error("Service not found")
          router.push("/admin/services")
          return
        }

        setService({ id: svcDoc.id, ...(svcDoc.data() as Omit<ServiceDoc, "id">) })
        setCategories(catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) })))
        setAllServices(svcSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) })))
      } catch {
        toast.error("Failed to load data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, router])

  async function handleSave(values: ServiceFormValues) {
    if (!service) return
    setSaving(true)
    try {
      const slug = values.slug.trim()
      const slugUsed =
        allServices.some((s) => s.slug === slug && s.id !== service.id) ||
        categories.some((c) => c.slug === slug)
      if (slugUsed) {
        toast.error("That URL slug is already in use.")
        return
      }

      const data = buildServiceData(values)
      await updateDoc(doc(db, "services", service.id), { ...data, updatedAt: serverTimestamp() })
      toast.success("Service updated")
      await revalidateAfterSave(["/", "/services", `/services/${slug}`, "/about"])
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

  if (!service) return null

  return (
    <ServiceForm
      initialData={service}
      categories={categories}
      allServices={allServices}
      onSave={handleSave}
      saving={saving}
    />
  )
}
