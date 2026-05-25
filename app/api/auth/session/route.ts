import { adminAuth } from "@/lib/firebase-admin"
import { type NextRequest, NextResponse } from "next/server"

const SESSION_DURATION_MS = 60 * 60 * 24 * 5 * 1000 // 5 days

export async function POST(req: NextRequest) {
  const { idToken } = await req.json()

  if (!idToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken)

    if (!decoded.admin) {
      return NextResponse.json({ error: "Not authorized. Admin access required." }, { status: 403 })
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    })

    const response = NextResponse.json({ success: true })
    response.cookies.set("__session", sessionCookie, {
      maxAge: SESSION_DURATION_MS / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 })
  }
}
