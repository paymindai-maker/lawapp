"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import type { BlogPostDoc } from "@/types"
import { BlogForm, buildBlogData } from "../../_components/blog-form"
import type { BlogFormValues } from "../../_components/blog-form"

export default function EditBlogPostPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPostDoc | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPostDoc[]>([])
  const [reservedSlugs, setReservedSlugs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const [postDoc, postsSnap, svcSnap, catSnap] = await Promise.all([
        getDoc(doc(db, "blog_posts", id)),
        getDocs(collection(db, "blog_posts")),
        getDocs(collection(db, "services")),
        getDocs(collection(db, "service_categories")),
      ])

      if (!postDoc.exists()) {
        toast.error("Post not found")
        router.push("/admin/blog")
        return
      }

      setPost({ id: postDoc.id, ...(postDoc.data() as Omit<BlogPostDoc, "id">) })
      setAllPosts(postsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPostDoc, "id">) })))
      setReservedSlugs([
        ...svcSnap.docs.map((d) => String(d.data().slug ?? "")),
        ...catSnap.docs.map((d) => String(d.data().slug ?? "")),
      ])
      setLoading(false)
    }
    fetchData()
  }, [id, router])

  async function handleSave(values: BlogFormValues) {
    if (!post) return
    setSaving(true)
    try {
      const slug = values.slug.trim()
      if (allPosts.some((p) => p.slug === slug && p.id !== post.id)) {
        toast.error("That blog slug is already in use.")
        return
      }
      if (reservedSlugs.includes(slug)) {
        toast.error("That slug is already used by a service URL.")
        return
      }

      const data = buildBlogData(values)
      await updateDoc(doc(db, "blog_posts", post.id), data)
      toast.success("Post updated")
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

  if (!post) return null

  return <BlogForm initialData={post} onSave={handleSave} saving={saving} />
}
