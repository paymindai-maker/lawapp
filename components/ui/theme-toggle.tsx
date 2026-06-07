"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

function subscribe() {
  return () => {}
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  if (!mounted) return <div className="h-9 w-9" aria-hidden />

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" style={{ color: "var(--foreground)" }} />
      ) : (
        <Moon className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
      )}
    </button>
  )
}
