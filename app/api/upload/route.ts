import { v2 as cloudinary } from "cloudinary"
import { NextRequest, NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "forlawapp",
            resource_type: "image",
          },
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
