"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImageIcon, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      onChange(data.url)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative h-48 w-full overflow-hidden rounded-lg" style={{ border: "1px solid var(--border)" }}>
          <Image
            src={value}
            alt="Featured cover"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute right-2 top-2 h-7 w-7 p-0"
            onClick={() => onChange("")}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
          <p className="mt-1.5 truncate text-xs" style={{ color: "var(--muted-foreground)" }}>
            {value}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ borderColor: "var(--border)" }}
        >
          {uploading ? (
            <>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary" />
              <span className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                Uploading…
              </span>
            </>
          ) : (
            <>
              <ImageIcon className="h-8 w-8" style={{ color: "var(--muted-foreground)" }} />
              <span className="mt-2 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                Click to upload image
              </span>
              <span className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                JPG, PNG, WEBP · max 10 MB
              </span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        aria-label="Upload image file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ""
        }}
      />
    </div>
  )
}
