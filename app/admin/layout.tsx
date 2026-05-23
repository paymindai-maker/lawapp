"use client"

import { useState } from "react"
import { Scale, LayoutDashboard, Briefcase, FileText, Star, Settings, Menu, X, LogOut } from "lucide-react"

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "#", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen" style={{ background: "var(--fw-blue-pale)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300"
        style={{
          width: sidebarOpen ? "240px" : "64px",
          background: "var(--fw-navy)",
          minHeight: "100vh",
          flexShrink: 0,
        }}
      >
        {/* Logo + toggle */}
        <div
          className="flex items-center justify-between px-4 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "var(--fw-blue)" }}
              >
                <Scale className="h-4 w-4 text-white" />
              </div>
              <span
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-heading)", color: "white" }}
              >
                For<span style={{ color: "oklch(0.72 0.16 255)" }}>Law</span>
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
            style={{ color: "oklch(0.65 0.05 255)" }}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
                style={{ color: "oklch(0.72 0.08 255)" }}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            )
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-2 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <a
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            style={{ color: "oklch(0.55 0.05 255)" }}
            title={!sidebarOpen ? "Exit Admin" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Exit Admin</span>}
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-8 py-4"
          style={{
            background: "white",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Admin Panel
          </p>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "var(--fw-blue)" }}
            >
              A
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Admin
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}
