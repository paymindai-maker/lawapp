"use client"

import * as React from "react"

// Dark mode removed — light only. This is a passthrough kept for import compatibility.
function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export { ThemeProvider }
