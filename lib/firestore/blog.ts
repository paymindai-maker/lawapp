/**
 * Cached public Firestore fetchers for blog posts.
 * Wrapped in React cache() — deduplicates identical calls within the same render.
 */
import { cache } from "react"
import {
  getPublicDb,
  getDocs,
  query,
  collection,
  where,
  limit,
  orderBy,
  toPlain,
} from "@/lib/firestore-public"
import type { BlogPostDoc } from "@/types"

export const getAllBlogPosts = cache(async (): Promise<BlogPostDoc[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(query(collection(db, "blog_posts"), orderBy("date", "desc")))
    return snap.docs.map((d) => toPlain<BlogPostDoc>(d.id, d.data()))
  } catch {
    return []
  }
})

export const getRecentBlogPosts = cache(async (n = 3): Promise<BlogPostDoc[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(collection(db, "blog_posts"), orderBy("createdAt", "desc"), limit(n))
    )
    return snap.docs.map((d) => {
      const post = toPlain<BlogPostDoc>(d.id, d.data())
      // Derive display date from createdAt if date field not explicitly set
      if (!post.date && post.createdAt) {
        post.date = new Date(post.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      }
      return post
    })
  } catch {
    return []
  }
})

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPostDoc | null> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(
      query(collection(db, "blog_posts"), where("slug", "==", slug), limit(1))
    )
    if (snap.empty) return null
    const d = snap.docs[0]
    return toPlain<BlogPostDoc>(d.id, d.data())
  } catch {
    return null
  }
})

export const getRelatedBlogPosts = cache(
  async (currentId: string, tag: string): Promise<BlogPostDoc[]> => {
    try {
      const db = getPublicDb()
      const snap = await getDocs(
        query(collection(db, "blog_posts"), where("tag", "==", tag), limit(4))
      )
      return snap.docs
        .map((d) => toPlain<BlogPostDoc>(d.id, d.data()))
        .filter((p) => p.id !== currentId)
        .slice(0, 3)
    } catch {
      return []
    }
  }
)

// ─── Used by generateStaticParams ─────────────────────────────────────────────

export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  try {
    const db = getPublicDb()
    const snap = await getDocs(collection(db, "blog_posts"))
    return snap.docs.map((d) => d.data().slug as string)
  } catch {
    return []
  }
})
