import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { adminAuth } from "@/lib/firebase-admin"
import { AdminShell } from "./_components/admin-shell"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const pathname = h.get("x-pathname") ?? ""

  // Login page — skip verification, render bare
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
        <Toaster richColors position="top-right" />
      </>
    )
  }

  // Protected routes — verify Firebase session server-side
  const cookieStore = await cookies()
  const session = cookieStore.get("__session")

  if (!session?.value) {
    redirect("/admin/login")
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session.value, true)
    if (!decoded.admin) {
      redirect("/admin/login")
    }
  } catch {
    redirect("/admin/login")
  }

  return (
    <>
      <AdminShell>{children}</AdminShell>
      <Toaster richColors position="top-right" />
    </>
  )
}
