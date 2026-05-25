import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("__session")

  if (!session?.value) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/((?!login$).*)"],
}
