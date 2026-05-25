"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"
import { Briefcase, FileText, ArrowRight, TrendingUp, FolderTree } from "lucide-react"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stats {
  categories: number
  services: number
  blogs: number
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats>({ categories: 0, services: 0, blogs: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [categoriesSnap, servicesSnap, blogsSnap] = await Promise.all([
          getDocs(collection(db, "service_categories")),
          getDocs(collection(db, "services")),
          getDocs(collection(db, "blog_posts")),
        ])
        setStats({
          categories: categoriesSnap.size,
          services: servicesSnap.size,
          blogs: blogsSnap.size,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const firstName = user?.displayName?.split(" ")[0] || "Admin"

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Manage your site content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Categories"
          value={stats.categories}
          loading={loading}
          icon={<FolderTree className="h-5 w-5" />}
          href="/admin/categories"
          color="oklch(0.52 0.14 285)"
        />
        <StatCard
          title="Services"
          value={stats.services}
          loading={loading}
          icon={<Briefcase className="h-5 w-5" />}
          href="/admin/services"
          color="var(--fw-blue)"
        />
        <StatCard
          title="Blog Posts"
          value={stats.blogs}
          loading={loading}
          icon={<FileText className="h-5 w-5" />}
          href="/admin/blog"
          color="var(--fw-gold)"
        />
        <StatCard
          title="Total Content"
          value={stats.categories + stats.services + stats.blogs}
          loading={loading}
          icon={<TrendingUp className="h-5 w-5" />}
          color="oklch(0.55 0.16 155)"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <QuickAction
          title="Manage Categories"
          description="Create service hubs for grouping and SEO pages."
          href="/admin/categories"
          icon={<FolderTree className="h-5 w-5" />}
        />
        <QuickAction
          title="Manage Services"
          description="Add, edit, or remove legal service offerings."
          href="/admin/services"
          icon={<Briefcase className="h-5 w-5" />}
        />
        <QuickAction
          title="Manage Blog"
          description="Publish articles, legal insights, and updates."
          href="/admin/blog"
          icon={<FileText className="h-5 w-5" />}
        />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  loading,
  icon,
  href,
  color,
}: {
  title: string
  value: number
  loading: boolean
  icon: React.ReactNode
  href?: string
  color: string
}) {
  return (
    <Card className="relative overflow-hidden border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
          {title}
        </CardTitle>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-md text-white"
          style={{ background: color }}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-16 animate-pulse rounded-md bg-muted" />
        ) : (
          <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>
            {value}
          </p>
        )}
        {href && (
          <Link
            href={href}
            className="mt-2 flex items-center gap-1 text-xs font-medium"
            style={{ color: color }}
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

function QuickAction({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href}>
      <Card className="group cursor-pointer border shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="flex items-start gap-4 pt-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
            style={{ background: "var(--fw-navy)" }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold" style={{ color: "var(--foreground)" }}>
              {title}
            </p>
            <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
              {description}
            </p>
          </div>
          <ArrowRight
            className="h-4 w-4 shrink-0 self-center opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
            style={{ color: "var(--fw-blue)" }}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
