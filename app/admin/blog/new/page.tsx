"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { revalidateAfterSave } from "@/lib/revalidate"
import type { BlogPostDoc } from "@/types"
import { BlogForm } from "../_components/blog-form"
import type { BlogFormValues } from "../_components/blog-form"
import { buildBlogData } from "../_components/blog-utils"

export default function NewBlogPostPage() {
  const router = useRouter()
  const posts = useRef<BlogPostDoc[]>([])
  const reservedSlugs = useRef<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsSnap, svcSnap, catSnap] = await Promise.all([
          getDocs(collection(db, "blog_posts")),
          getDocs(collection(db, "services")),
          getDocs(collection(db, "service_categories")),
        ])
        posts.current = postsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPostDoc, "id">) }))
        reservedSlugs.current = [
          ...svcSnap.docs.map((d) => String(d.data().slug ?? "")),
          ...catSnap.docs.map((d) => String(d.data().slug ?? "")),
        ]
      } catch {
        toast.error("Failed to load data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  async function handleSave(values: BlogFormValues) {
    setSaving(true)
    try {
      const slug = values.slug.trim()
      if (posts.current.some((p) => p.slug === slug)) {
        toast.error("That blog slug is already in use.")
        return
      }
      if (reservedSlugs.current.includes(slug)) {
        toast.error("That slug is already used by a service URL.")
        return
      }

      const data = buildBlogData(values)
      await addDoc(collection(db, "blog_posts"), { ...data, createdAt: serverTimestamp() })
      toast.success("Post published")
      await revalidateAfterSave(["/blog", `/blog/${slug}`])
      router.push("/admin/blog")
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

  return <BlogForm onSave={handleSave} saving={saving} />
}
