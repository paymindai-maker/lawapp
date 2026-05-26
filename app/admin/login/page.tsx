"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithPopup } from "firebase/auth"
import { Scale, AlertCircle } from "lucide-react"
import { auth, googleProvider } from "@/lib/firebase"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGoogleSignIn() {
    setLoading(true)
    setError(null)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Sign in failed.")
      }

      router.push("/admin")
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign in failed."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{ background: "var(--fw-navy)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: "var(--fw-navy-surface)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: "var(--fw-blue)" }}
          >
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NEX<span style={{ color: "oklch(0.72 0.16 255)" }}>GEN</span> Admin
            </h1>
            <p className="mt-1 text-sm" style={{ color: "oklch(0.55 0.05 255)" }}>
              Admin access only
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-5 flex items-start gap-2.5 rounded-lg px-4 py-3 text-sm"
            style={{ background: "oklch(0.20 0.05 20)", color: "oklch(0.75 0.15 20)" }}
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Sign in button */}
        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full gap-2.5"
          style={{
            background: loading ? "oklch(0.30 0.05 255)" : "white",
            color: "oklch(0.13 0.055 264)",
            fontWeight: 500,
          }}
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <GoogleIcon />
          )}
          {loading ? "Signing in…" : "Continue with Google"}
        </Button>

        <p className="mt-6 text-center text-xs" style={{ color: "oklch(0.40 0.04 255)" }}>
          Only users with admin privileges can access this panel.
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
