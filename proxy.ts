export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"

export async function proxy(request: NextRequest) {
  const session = request.cookies.get("__session")

  if (!session?.value) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Verify the session cookie cryptographically (no revocation check = fast, local JWT verify)
    const decoded = await adminAuth.verifySessionCookie(session.value, false)
    if (!decoded.admin) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  } catch {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/((?!login$).*)"],
}
