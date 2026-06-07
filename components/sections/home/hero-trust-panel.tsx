"use client"

import { useState, useEffect } from "react"
import { TESTIMONIALS, STATS } from "@/lib/data"

export function HeroTrustPanel() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive((prev) => (prev + 1) % TESTIMONIALS.length)
        setFading(false)
      }, 260)
    }, 5200)
    return () => clearInterval(timer)
  }, [])

  function goTo(i: number) {
    if (i === active) return
    setFading(true)
    setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 200)
  }

  const t = TESTIMONIALS[active]

  return (
    <div
      className="flex h-full flex-col"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "3px",
      }}
    >
      {/* Testimonial body */}
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-8">
        {/* Decorative large quote — behind content */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-5 select-none leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "7rem",
            color: "var(--fw-navy)",
            opacity: 0.05,
            lineHeight: 1,
          }}
        >
          &ldquo;
        </span>

        {/* Quote */}
        <blockquote
          className="relative z-10"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 260ms ease",
          }}
        >
          <p
            className="text-[15px] leading-relaxed"
            style={{
              color: "var(--foreground)",
              fontStyle: "normal",
              letterSpacing: "-0.005em",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>

          <footer className="mt-6 flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold text-white"
              style={{ background: "var(--fw-navy)", borderRadius: "2px", fontFamily: "var(--font-display)" }}
            >
              {t.initials}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--fw-navy)" }}>{t.name}</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{t.title}</p>
            </div>
          </footer>
        </blockquote>

        {/* Dots */}
        <div className="mt-6 flex items-center gap-1.5">
          {TESTIMONIALS.map((t, i) => (
            <button
              type="button"
              key={t.name}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              style={{
                width: "1.5rem",
                height: "4px",
                borderRadius: "2px",
                transformOrigin: "left center",
                transform: i === active ? "scaleX(1)" : "scaleX(0.33)",
                background: i === active ? "var(--fw-navy)" : "var(--border)",
                transition: "transform 300ms ease, background 300ms ease",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="grid grid-cols-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="px-6 py-5"
            style={{
              borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
              borderTop: i >= 2 ? "1px solid var(--border)" : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                lineHeight: 1,
                color: "var(--fw-navy)",
                letterSpacing: "-0.02em",
              }}
            >
              {s.val}
            </p>
            <p className="mt-1 text-[11px] font-medium" style={{ color: "var(--muted-foreground)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
