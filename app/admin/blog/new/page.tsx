"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import type { BlogPostDoc } from "@/types"
import { BlogForm, buildBlogData } from "../_components/blog-form"
import type { BlogFormValues } from "../_components/blog-form"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPostDoc[]>([])
  const [reservedSlugs, setReservedSlugs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const [postsSnap, svcSnap, catSnap] = await Promise.all([
        getDocs(collection(db, "blog_posts")),
        getDocs(collection(db, "services")),
        getDocs(collection(db, "service_categories")),
      ])
      setPosts(postsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPostDoc, "id">) })))
      setReservedSlugs([
        ...svcSnap.docs.map((d) => String(d.data().slug ?? "")),
        ...catSnap.docs.map((d) => String(d.data().slug ?? "")),
      ])
      setLoading(false)
    }
    fetchData()
  }, [])

  async function handleSave(values: BlogFormValues) {
    setSaving(true)
    try {
      const slug = values.slug.trim()
      if (posts.some((p) => p.slug === slug)) {
        toast.error("That blog slug is already in use.")
        return
      }
      if (reservedSlugs.includes(slug)) {
        toast.error("That slug is already used by a service URL.")
        return
      }

      const data = buildBlogData(values)
      await addDoc(collection(db, "blog_posts"), { ...data, createdAt: serverTimestamp() })
      toast.success("Post published")
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
