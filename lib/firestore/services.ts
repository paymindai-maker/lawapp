/**
 * Cached public Firestore fetchers for services and categories.
 * Wrapped in React cache() — deduplicates identical calls within the same render.
 * Used by server components and generateStaticParams — no admin credentials needed.
 */
import { cache } from "react"
import {
  getPublicDb,
  getDocs,
  getDoc,
  query,
  collection,
  doc,
  where,
  limit,
  orderBy,
  toPlain,
} from "@/lib/firestore-public"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"

// ─── Categories ───────────────────────────────────────────────────────────────

export const getAllCategories = cache(async (): Promise<ServiceCategoryDoc[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(query(collection(db, "service_categories"), orderBy("name")))
    return snap.docs.map((d) => toPlain<ServiceCategoryDoc>(d.id, d.data()))
  } catch {
    return []
  }
})

export const getCategoryBySlug = cache(async (slug: string): Promise<ServiceCategoryDoc | null> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(collection(db, "service_categories"), where("slug", "==", slug), limit(1))
    )
    if (snap.empty) return null
    const d = snap.docs[0]
    return toPlain<ServiceCategoryDoc>(d.id, d.data())
  } catch {
    return null
  }
})

export const getCategoryById = cache(async (id: string): Promise<ServiceCategoryDoc | null> => {
  try {
    const db = getPublicDb()
    const d = await getDoc(doc(db, "service_categories", id))
    if (!d.exists()) return null
    return toPlain<ServiceCategoryDoc>(d.id, d.data()!)
  } catch {
    return null
  }
})

// ─── Services ─────────────────────────────────────────────────────────────────

export const getAllPublishedServices = cache(async (): Promise<ServiceDoc[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(collection(db, "services"), where("status", "==", "published"))
    )
    return snap.docs
      .map((d) => toPlain<ServiceDoc>(d.id, d.data()))
      .sort((a, b) => a.title.localeCompare(b.title))
  } catch {
    return []
  }
})

export const getFeaturedServices = cache(async (n = 4): Promise<ServiceDoc[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(collection(db, "services"), where("status", "==", "published"), limit(n))
    )
    return snap.docs.map((d) => toPlain<ServiceDoc>(d.id, d.data()))
  } catch {
    return []
  }
})

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceDoc | null> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(
        collection(db, "services"),
        where("slug", "==", slug),
        where("status", "==", "published"),
        limit(1)
      )
    )
    if (snap.empty) return null
    const d = snap.docs[0]
    return toPlain<ServiceDoc>(d.id, d.data())
  } catch {
    return null
  }
})

export const getServicesByCategory = cache(async (categoryId: string): Promise<ServiceDoc[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(
        collection(db, "services"),
        where("categoryId", "==", categoryId),
        where("status", "==", "published")
      )
    )
    return snap.docs.map((d) => toPlain<ServiceDoc>(d.id, d.data()))
  } catch {
    return []
  }
})

export const getRelatedServices = cache(async (ids: string[]): Promise<ServiceDoc[]> => {
  if (!ids?.length) return []
  try {
    const db = getPublicDb()
    const snaps = await Promise.all(ids.slice(0, 4).map((id) => getDoc(doc(db, "services", id))))
    return snaps
      .filter((d) => d.exists() && (d.data() as ServiceDoc)?.status === "published")
      .map((d) => toPlain<ServiceDoc>(d.id, d.data()!))
  } catch {
    return []
  }
})

// ─── Used by generateStaticParams ─────────────────────────────────────────────

export const getAllServiceSlugs = cache(async (): Promise<string[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(collection(db, "services"), where("status", "==", "published"))
    )
    return snap.docs.map((d) => d.data().slug as string)
  } catch {
    return []
  }
})
