import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"

export async function POST(req: NextRequest) {
  const session = req.cookies.get("__session")
  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const decoded = await adminAuth.verifySessionCookie(session.value, false)
    if (!decoded.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { paths } = await req.json() as { paths: string[] }
  for (const path of paths) {
    revalidatePath(path)
  }
  return NextResponse.json({ success: true, revalidated: paths })
}
