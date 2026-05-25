"use client"

import { useEffect, useState } from "react"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import Link from "next/link"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import type { BlogPostDoc } from "@/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TAG_COLORS: Record<string, string> = {
  Corporate: "var(--fw-blue)",
  Advisory: "oklch(0.55 0.16 155)",
  Startups: "oklch(0.60 0.18 285)",
  Taxation: "var(--fw-gold)",
  "IP Law": "oklch(0.55 0.18 310)",
  Litigation: "oklch(0.55 0.15 20)",
  Compliance: "oklch(0.45 0.10 200)",
  General: "oklch(0.50 0.05 255)",
}

function TagBadge({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] ?? "oklch(0.50 0.05 255)"
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
      style={{
        background: `color-mix(in oklch, ${color} 15%, transparent)`,
        color,
        border: `1px solid color-mix(in oklch, ${color} 25%, transparent)`,
      }}
    >
      {tag}
    </span>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<BlogPostDoc | null>(null)

  async function fetchPosts() {
    try {
      const snap = await getDocs(query(collection(db, "blog_posts"), orderBy("createdAt", "desc")))
      setPosts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPostDoc, "id">) })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteDoc(doc(db, "blog_posts", deleteTarget.id))
      toast.success("Post deleted")
      setDeleteTarget(null)
      fetchPosts()
    } catch {
      toast.error("Delete failed.")
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Blog Posts
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className={cn(buttonVariants(), "gap-1.5")}
          style={{ background: "var(--fw-blue)", color: "white" }}
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Title</th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wide sm:table-cell" style={{ color: "var(--muted-foreground)" }}>Tag</th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wide md:table-cell" style={{ color: "var(--muted-foreground)" }}>Date</th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wide lg:table-cell" style={{ color: "var(--muted-foreground)" }}>Excerpt</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  className="transition-colors hover:bg-muted/40"
                  style={{ borderBottom: i < posts.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <td className="max-w-xs px-5 py-3.5">
                    <p className="line-clamp-1 font-medium leading-snug" style={{ color: "var(--foreground)" }}>
                      {post.title}
                    </p>
                    <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      /{post.slug}
                    </p>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <TagBadge tag={post.tag} />
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <span style={{ color: "var(--muted-foreground)" }}>{post.date}</span>
                  </td>
                  <td className="hidden px-5 py-3.5 lg:table-cell">
                    <p className="line-clamp-2 max-w-xs text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {post.excerpt}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 w-8 p-0")}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(post)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{deleteTarget?.title}&rdquo; will be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function LoadingSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 h-10 w-10" style={{ color: "var(--muted-foreground)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      </div>
      <p className="font-medium" style={{ color: "var(--foreground)" }}>No posts yet</p>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Publish your first article to get started.
      </p>
      <Link
        href="/admin/blog/new"
        className={cn(buttonVariants(), "mt-4 gap-1.5")}
        style={{ background: "var(--fw-blue)", color: "white" }}
      >
        <Plus className="h-4 w-4" /> New Post
      </Link>
    </div>
  )
}
