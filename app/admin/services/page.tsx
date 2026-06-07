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
import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"
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

function categoryName(categories: ServiceCategoryDoc[], categoryId: string) {
  return categories.find((c) => c.id === categoryId)?.name ?? "Uncategorized"
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceDoc[]>([])
  const [categories, setCategories] = useState<ServiceCategoryDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ServiceDoc | null>(null)

  async function fetchServices() {
    try {
      const [servicesSnap, categoriesSnap] = await Promise.all([
        getDocs(query(collection(db, "services"), orderBy("title"))),
        getDocs(query(collection(db, "service_categories"), orderBy("name"))),
      ])
      setServices(servicesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) })))
      setCategories(categoriesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteDoc(doc(db, "services", deleteTarget.id))
      toast.success("Service deleted")
      setDeleteTarget(null)
      fetchServices()
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
            Services
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {services.length} service{services.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className={cn(buttonVariants(), "gap-1.5")}
          style={{ background: "var(--fw-blue)", color: "white" }}
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : services.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                {["Title", "Category", "Slug", "Status", "FAQs", ""].map((heading, index) => (
                  <th
                    key={heading || "actions"}
                    className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wide ${
                      index === 1 || index === 2
                        ? "hidden md:table-cell"
                        : index === 4
                        ? "hidden lg:table-cell"
                        : index === 5
                        ? "text-right"
                        : ""
                    }`}
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.id}
                  className="transition-colors hover:bg-muted/40"
                  style={{
                    borderBottom: index < services.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium" style={{ color: "var(--foreground)" }}>
                      {service.title}
                    </p>
                    <p
                      className="mt-0.5 line-clamp-1 max-w-xs text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {service.shortDescription}
                    </p>
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <Badge variant="secondary">{categoryName(categories, service.categoryId)}</Badge>
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {service.slug}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={service.status === "published" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                  </td>
                  <td className="hidden px-5 py-3.5 lg:table-cell">
                    <span style={{ color: "var(--muted-foreground)" }}>{service.faqs?.length ?? 0}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 w-8 p-0")}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(service)}
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

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete service?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{deleteTarget?.title}&rdquo; will be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
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
      <Briefcase className="mb-3 h-10 w-10" style={{ color: "var(--muted-foreground)" }} />
      <p className="font-medium" style={{ color: "var(--foreground)" }}>
        No services yet
      </p>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Add your first service to get started.
      </p>
      <Link
        href="/admin/services/new"
        className={cn(buttonVariants(), "mt-4 gap-1.5")}
        style={{ background: "var(--fw-blue)", color: "white" }}
      >
        <Plus className="h-4 w-4" /> Add Service
      </Link>
    </div>
  )
}
