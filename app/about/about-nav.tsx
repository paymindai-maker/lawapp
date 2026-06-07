"use client"

import { useEffect, useState } from "react"

const SECTIONS = [
  { id: "firm", label: "The Firm" },
  { id: "why", label: "Why NEXGEN" },
  { id: "process", label: "How We Work" },
  { id: "leadership", label: "Leadership" },
] as const

export function AboutNav() {
  const [active, setActive] = useState<string>("firm")

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .reduce<IntersectionObserverEntry | undefined>(
            (best, e) => (!best || e.intersectionRatio > best.intersectionRatio ? e : best),
            undefined
          )
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="About sections"
      className="sticky z-40"
      style={{
        top: "64px",
        background:
          "color-mix(in oklch, var(--fw-surface) 90%, transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <ol className="flex gap-1 overflow-x-auto md:gap-6">
          {SECTIONS.map((s, i) => {
            const isActive = active === s.id
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="relative flex items-baseline gap-2.5 py-4 text-sm transition-colors"
                  style={{
                    color: isActive ? "var(--fw-navy)" : "var(--muted-foreground)",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span
                    className="text-[10px] tabular-nums"
                    style={{
                      color: isActive ? "var(--fw-accent)" : "var(--muted-foreground)",
                      letterSpacing: "0.12em",
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-[2px] origin-left transition-transform"
                    style={{
                      background: "var(--fw-accent)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
