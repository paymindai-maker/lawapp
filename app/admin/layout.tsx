"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { signOut } from "firebase/auth"
import {
  Scale,
  LayoutDashboard,
  FolderTree,
  Briefcase,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { auth } from "@/lib/firebase"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toaster } from "@/components/ui/sonner"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
]

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login")
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--fw-navy)" }}
      >
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    )
  }

  if (!user) return null

  if (!isAdmin) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--fw-navy)" }}
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-white">Access Denied</p>
          <p className="mt-1 text-sm" style={{ color: "oklch(0.55 0.05 255)" }}>
            Your account does not have admin privileges.
          </p>
          <button
            onClick={async () => {
              await signOut(auth)
              await fetch("/api/auth/logout", { method: "POST" })
              router.replace("/admin/login")
            }}
            className="mt-4 text-sm underline"
            style={{ color: "var(--fw-blue-mid)" }}
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ background: "var(--fw-blue)" }}
          >
            <Scale className="h-4 w-4 text-white" />
          </div>
          <span
            className="text-base font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden"
            style={{ fontFamily: "var(--font-display)" }}
          >
            For<span style={{ color: "oklch(0.72 0.16 255)" }}>Law</span>
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {active && (
                        <ChevronRight className="ml-auto h-3 w-3 opacity-60" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              tooltip="Back to site"
            >
              <LogOut className="h-4 w-4" />
              <span>Exit to Site</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function AdminHeader() {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const crumb = NAV_ITEMS.find((i) =>
    i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href)
  )

  async function handleSignOut() {
    await signOut(auth)
    await fetch("/api/auth/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  const initials = user?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header
      className="flex items-center justify-between px-6 py-3.5 shrink-0"
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-1.5 text-sm">
          <span style={{ color: "var(--muted-foreground)" }}>Admin</span>
          {crumb && crumb.href !== "/admin" && (
            <>
              <span style={{ color: "var(--border)" }}>/</span>
              <span className="font-medium" style={{ color: "var(--foreground)" }}>
                {crumb.label}
              </span>
            </>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
          render={<button />}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: "var(--fw-blue)" }}
          >
            {initials || "A"}
          </div>
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            {user?.displayName?.split(" ")[0] || "Admin"}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5">
            <p className="text-xs font-medium">{user?.displayName}</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {user?.email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Login page: no guard, no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <AdminGuard>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <main
            className="flex-1 overflow-auto p-6"
            style={{ background: "var(--background)", minHeight: "calc(100vh - 57px)" }}
          >
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AdminGuard>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  )
}
