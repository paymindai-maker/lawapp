import { v2 as cloudinary } from "cloudinary"
import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
})

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function POST(req: NextRequest) {
  // ── Auth ───────────────────────────────────────────────────────────────────
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

  // ── Validation ─────────────────────────────────────────────────────────────
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}` },
      { status: 400 }
    )
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large. Max 5 MB." }, { status: 400 })
  }

  // ── Upload ─────────────────────────────────────────────────────────────────
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "nexgen", resource_type: "image" },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload failed"))
            else resolve(result as { secure_url: string })
          }
        )
        .end(buffer)
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (err) {
    console.error("Cloudinary upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
