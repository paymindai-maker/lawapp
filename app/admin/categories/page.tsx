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
import { FolderTree, Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import type { ServiceCategoryDoc } from "@/types"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ServiceCategoryDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ServiceCategoryDoc | null>(null)

  async function fetchCategories() {
    try {
      const snap = await getDocs(query(collection(db, "service_categories"), orderBy("name")))
      setCategories(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteDoc(doc(db, "service_categories", deleteTarget.id))
      toast.success("Category deleted")
      setDeleteTarget(null)
      fetchCategories()
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
            Categories
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {categories.length} categor{categories.length === 1 ? "y" : "ies"} total
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className={cn(buttonVariants(), "gap-1.5")}
          style={{ background: "var(--fw-blue)", color: "white" }}
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : categories.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Category</th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wide md:table-cell" style={{ color: "var(--muted-foreground)" }}>Slug</th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wide lg:table-cell" style={{ color: "var(--muted-foreground)" }}>Description</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => (
                <tr
                  key={category.id}
                  className="transition-colors hover:bg-muted/40"
                  style={{ borderBottom: i < categories.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium" style={{ color: "var(--foreground)" }}>{category.name}</p>
                    <p className="mt-0.5 text-xs md:hidden" style={{ color: "var(--muted-foreground)" }}>
                      /services/{category.slug}
                    </p>
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <Badge variant="secondary" className="font-mono text-xs">{category.slug}</Badge>
                  </td>
                  <td className="hidden px-5 py-3.5 lg:table-cell">
                    <p className="line-clamp-2 max-w-md text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {category.description}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 w-8 p-0")}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(category)}
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
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{deleteTarget?.name}&rdquo; will be permanently removed. Existing services that reference it will need to be reassigned.
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
      <FolderTree className="mb-3 h-10 w-10" style={{ color: "var(--muted-foreground)" }} />
      <p className="font-medium" style={{ color: "var(--foreground)" }}>No categories yet</p>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Add your first service category to organize services.
      </p>
      <Link
        href="/admin/categories/new"
        className={cn(buttonVariants(), "mt-4 gap-1.5")}
        style={{ background: "var(--fw-blue)", color: "white" }}
      >
        <Plus className="h-4 w-4" /> Add Category
      </Link>
    </div>
  )
}
