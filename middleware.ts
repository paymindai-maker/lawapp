import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set("x-pathname", request.nextUrl.pathname)

  const isLoginPage = request.nextUrl.pathname === "/admin/login"

  if (!isLoginPage) {
    const session = request.cookies.get("__session")
    if (!session?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ["/admin/:path*"],
}
