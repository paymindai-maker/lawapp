"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, doc, getDocs, orderBy, query, runTransaction, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { revalidateAfterSave } from "@/lib/revalidate"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"
import { ServiceForm } from "../_components/service-form"
import type { ServiceFormValues } from "../_components/service-form"
import { buildServiceData } from "../_components/service-utils"

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

      const serviceRef = doc(db, "services", slug)
      const data = buildServiceData(values)
      await runTransaction(db, async (transaction) => {
        if ((await transaction.get(serviceRef)).exists()) {
          throw new Error("A service with that document ID already exists.")
        }
        transaction.set(serviceRef, { ...data, createdAt: serverTimestamp() })
      })
      toast.success("Service added")
      await revalidateAfterSave(["/", "/services", `/services/${slug}`, "/about"])
      router.push("/admin/services")
    } catch (err) {
      console.error("Save failed:", err)
      const msg = err instanceof Error ? err.message : String(err)
      toast.error(`Failed to save: ${msg}`)
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
