"use client"

import { useEffect, useState } from "react"

// ─── Slide definitions ───────────────────────────────────────────────────────

const SLIDES = [
  { key: "legal", label: "Legal & Litigation", caption: "Advocates on record for civil, criminal & corporate disputes." },
  { key: "tax", label: "Tax & Compliance", caption: "GST, income tax, TDS — filed accurately, on time, every cycle." },
  { key: "setup", label: "Business Setup", caption: "Private Ltd, LLP, OPC & licence registration end-to-end." },
  { key: "advisory", label: "Advisory & Growth", caption: "Mutual fund advisory and ongoing compliance partnership." },
] as const

type SlideKey = (typeof SLIDES)[number]["key"]

const ROTATE_MS = 4500

// ─── Component ───────────────────────────────────────────────────────────────

export function AboutIllustrationSlider() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), ROTATE_MS)
    return () => clearInterval(t)
  }, [paused])

  const current = SLIDES[idx]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "var(--fw-surface)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--fw-gold)" }}
        >
          What we practice
        </p>
        <h3
          className="mb-6 text-xl font-semibold"
          style={{ color: "var(--fw-navy)", fontFamily: "var(--font-display)" }}
        >
          {current.label}
        </h3>

        {/* Stage */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.key}
              aria-hidden={i !== idx}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 600ms ease, transform 600ms ease",
              }}
            >
              <Illustration kind={s.key} />
            </div>
          ))}
        </div>

        {/* Caption */}
        <p
          className="mt-5 text-sm leading-relaxed"
          style={{ color: "var(--muted-foreground)", minHeight: "2.8em" }}
        >
          {current.caption}
        </p>

        {/* Indicators */}
        <div className="mt-5 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setIdx(i)}
              aria-label={`Show ${s.label}`}
              style={{
                height: "4px",
                width: i === idx ? "36px" : "16px",
                background: i === idx ? "var(--fw-blue)" : "var(--border)",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "width 300ms ease, background 300ms ease",
                padding: 0,
              }}
            />
          ))}
          <span
            className="ml-auto text-[11px] uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)" }}
          >
            {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Illustrations (pure SVG, brand-token colors) ────────────────────────────

function Illustration({ kind }: { kind: SlideKey }) {
  const navy = "var(--fw-navy)"
  const blue = "var(--fw-blue)"
  const gold = "var(--fw-gold)"
  const surface = "var(--fw-surface)"

  const common = { width: "82%", height: "82%" } as const

  if (kind === "legal") {
    return (
      <svg viewBox="0 0 400 300" {...common} role="img" aria-label="Scales of justice with documents">
        {/* Backdrop circle */}
        <circle cx="200" cy="150" r="115" fill={surface} stroke={navy} strokeOpacity="0.08" />
        {/* Column */}
        <rect x="195" y="80" width="10" height="160" fill={navy} rx="2" />
        <rect x="170" y="232" width="60" height="10" fill={navy} rx="2" />
        <rect x="160" y="242" width="80" height="6" fill={navy} opacity="0.6" rx="2" />
        {/* Beam */}
        <rect x="90" y="85" width="220" height="6" fill={navy} rx="3" />
        {/* Chains */}
        <line x1="120" y1="91" x2="120" y2="130" stroke={navy} strokeWidth="2" />
        <line x1="280" y1="91" x2="280" y2="130" stroke={navy} strokeWidth="2" />
        {/* Left pan */}
        <path d="M85 130 L155 130 L140 165 L100 165 Z" fill={blue} />
        <ellipse cx="120" cy="130" rx="35" ry="6" fill={navy} />
        {/* Right pan */}
        <path d="M245 130 L315 130 L300 165 L260 165 Z" fill={gold} />
        <ellipse cx="280" cy="130" rx="35" ry="6" fill={navy} />
        {/* Top finial */}
        <circle cx="200" cy="80" r="8" fill={gold} />
        {/* Documents floating */}
        <rect x="50" y="200" width="50" height="60" fill="white" stroke={navy} strokeOpacity="0.25" />
        <line x1="58" y1="215" x2="92" y2="215" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
        <line x1="58" y1="225" x2="92" y2="225" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
        <line x1="58" y1="235" x2="80" y2="235" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
        <rect x="300" y="200" width="50" height="60" fill="white" stroke={navy} strokeOpacity="0.25" />
        <line x1="308" y1="215" x2="342" y2="215" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
        <line x1="308" y1="225" x2="342" y2="225" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
        <line x1="308" y1="235" x2="330" y2="235" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
      </svg>
    )
  }

  if (kind === "tax") {
    return (
      <svg viewBox="0 0 400 300" {...common} role="img" aria-label="Calculator with rising tax compliance chart">
        <circle cx="200" cy="150" r="115" fill={surface} stroke={navy} strokeOpacity="0.08" />
        {/* Calculator body */}
        <rect x="80" y="70" width="140" height="180" fill={navy} rx="6" />
        {/* Screen */}
        <rect x="92" y="82" width="116" height="36" fill={surface} rx="2" />
        <text x="200" y="108" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="20" fill={navy}>
          ₹12,450
        </text>
        {/* Buttons */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={96 + c * 36}
              y={128 + r * 28}
              width="28"
              height="20"
              rx="2"
              fill={r === 3 && c === 2 ? gold : "white"}
              opacity={r === 3 && c === 2 ? 1 : 0.85}
            />
          ))
        )}
        {/* Chart panel */}
        <rect x="240" y="100" width="130" height="140" fill="white" stroke={navy} strokeOpacity="0.2" rx="4" />
        {/* Bars */}
        <rect x="252" y="190" width="16" height="38" fill={blue} opacity="0.45" />
        <rect x="276" y="170" width="16" height="58" fill={blue} opacity="0.65" />
        <rect x="300" y="148" width="16" height="80" fill={blue} opacity="0.82" />
        <rect x="324" y="124" width="16" height="104" fill={blue} />
        {/* Trend line */}
        <polyline
          points="260,180 284,160 308,138 332,116"
          fill="none"
          stroke={gold}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="332" cy="116" r="4" fill={gold} />
      </svg>
    )
  }

  if (kind === "setup") {
    return (
      <svg viewBox="0 0 400 300" {...common} role="img" aria-label="Building blocks forming a business structure">
        <circle cx="200" cy="150" r="115" fill={surface} stroke={navy} strokeOpacity="0.08" />
        {/* Ground */}
        <line x1="60" y1="240" x2="340" y2="240" stroke={navy} strokeOpacity="0.4" strokeWidth="2" />
        {/* Tower of blocks */}
        <rect x="140" y="200" width="120" height="40" fill={navy} rx="2" />
        <rect x="155" y="160" width="90" height="40" fill={blue} rx="2" />
        <rect x="170" y="120" width="60" height="40" fill={gold} rx="2" />
        {/* Windows */}
        <rect x="160" y="212" width="14" height="16" fill={surface} />
        <rect x="184" y="212" width="14" height="16" fill={surface} />
        <rect x="208" y="212" width="14" height="16" fill={surface} />
        <rect x="232" y="212" width="14" height="16" fill={surface} />
        <rect x="172" y="172" width="14" height="16" fill={surface} />
        <rect x="196" y="172" width="14" height="16" fill={surface} />
        <rect x="220" y="172" width="14" height="16" fill={surface} />
        <rect x="185" y="132" width="14" height="16" fill={navy} />
        <rect x="205" y="132" width="14" height="16" fill={navy} />
        {/* Flag */}
        <line x1="200" y1="120" x2="200" y2="90" stroke={navy} strokeWidth="2" />
        <path d="M200 92 L228 100 L200 108 Z" fill={gold} />
        {/* Floating doc icons */}
        <g opacity="0.85">
          <rect x="70" y="130" width="36" height="46" fill="white" stroke={navy} strokeOpacity="0.3" />
          <line x1="76" y1="142" x2="100" y2="142" stroke={navy} strokeOpacity="0.45" strokeWidth="2" />
          <line x1="76" y1="150" x2="100" y2="150" stroke={navy} strokeOpacity="0.45" strokeWidth="2" />
          <line x1="76" y1="158" x2="92" y2="158" stroke={navy} strokeOpacity="0.45" strokeWidth="2" />
        </g>
        <g opacity="0.85">
          <circle cx="316" cy="148" r="22" fill="white" stroke={navy} strokeOpacity="0.3" />
          <path d="M306 148 L314 156 L326 142" stroke={blue} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    )
  }

  // advisory
  return (
    <svg viewBox="0 0 400 300" {...common} role="img" aria-label="Shield with upward growth arrow">
      <circle cx="200" cy="150" r="115" fill={surface} stroke={navy} strokeOpacity="0.08" />
      {/* Shield */}
      <path
        d="M200 60 L290 90 L290 160 Q290 220 200 250 Q110 220 110 160 L110 90 Z"
        fill={navy}
      />
      <path
        d="M200 78 L274 102 L274 158 Q274 208 200 232 Q126 208 126 158 L126 102 Z"
        fill={blue}
        opacity="0.18"
      />
      {/* Upward arrow inside */}
      <polyline
        points="150,200 180,170 200,185 245,135"
        fill="none"
        stroke={gold}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points="245,135 230,138 244,150" fill={gold} />
      {/* Check */}
      <circle cx="200" cy="110" r="14" fill={gold} />
      <path d="M193 110 L199 116 L210 104" stroke={navy} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Surrounding nodes */}
      <circle cx="80" cy="120" r="6" fill={blue} />
      <circle cx="60" cy="180" r="4" fill={gold} />
      <circle cx="320" cy="120" r="6" fill={blue} />
      <circle cx="340" cy="180" r="4" fill={gold} />
      <line x1="86" y1="120" x2="118" y2="130" stroke={navy} strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="314" y1="120" x2="282" y2="130" stroke={navy} strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  )
}
