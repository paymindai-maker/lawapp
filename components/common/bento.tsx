import type { ReactNode } from "react"

type Tone = "dark" | "light"

// ─── BentoStat ──────────────────────────────────────────────────────────────
// Editorial stat cell: kicker, big display numeral, descriptor.
// Outline-stroke echo of the value bleeds out of the bottom-right corner.

export function BentoStat({
  val,
  label,
  tone,
  kicker,
}: {
  val: string
  label: string
  tone: Tone
  kicker?: string
}) {
  const dark = tone === "dark"
  const eyebrow = kicker ?? (dark ? "Trusted by" : "Built over")
  return (
    <div
      className="flex h-full flex-col justify-between"
      style={{
        background: dark ? "var(--fw-navy)" : "var(--card)",
        color: dark ? "white" : "var(--fw-navy)",
        border: dark ? "1px solid var(--fw-navy)" : "1px solid var(--border)",
        borderRadius: "6px",
        padding: "1.5rem 1.75rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "-1rem",
          bottom: "-2rem",
          fontFamily: "var(--font-display)",
          fontSize: "9rem",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: dark
            ? "1.5px oklch(1 0 0 / 0.07)"
            : "1.5px oklch(0.22 0.045 258 / 0.06)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {val}
      </span>

      <p
        className="relative text-[10px] font-semibold uppercase"
        style={{
          color: dark ? "oklch(0.72 0.03 258)" : "var(--muted-foreground)",
          letterSpacing: "0.22em",
        }}
      >
        {eyebrow}
      </p>
      <div className="relative">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: dark ? "white" : "var(--fw-navy)",
          }}
        >
          {val}
        </p>
        <p
          className="mt-3 text-[13px] leading-relaxed"
          style={{
            color: dark ? "oklch(0.82 0.018 258)" : "var(--muted-foreground)",
            maxWidth: "20ch",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

// ─── BentoTextCell ──────────────────────────────────────────────────────────
// Compact text cell: kicker + body. Reuses across mission, compliance, etc.

export function BentoTextCell({
  kicker,
  body,
  tone = "light",
}: {
  kicker: string
  body: ReactNode
  tone?: Tone
}) {
  const dark = tone === "dark"
  return (
    <div
      className="flex h-full flex-col justify-between"
      style={{
        background: dark ? "var(--fw-navy)" : "var(--card)",
        color: dark ? "white" : "var(--fw-navy)",
        border: dark ? "1px solid var(--fw-navy)" : "1px solid var(--border)",
        borderRadius: "6px",
        padding: "1.5rem 1.75rem",
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase"
        style={{
          color: dark ? "oklch(0.72 0.03 258)" : "var(--muted-foreground)",
          letterSpacing: "0.22em",
        }}
      >
        {kicker}
      </p>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: dark ? "oklch(0.92 0.012 258)" : "var(--fw-navy)" }}
      >
        {body}
      </p>
    </div>
  )
}

// ─── BentoDevanagariCell ────────────────────────────────────────────────────
// Brand-voice quote cell — Devanagari display + romanized caption.

export function BentoDevanagariCell({
  text = "हर फाइलिंग, हर केस — एक छत के नीचे.",
  caption = "Every filing, every case — one roof.",
}: {
  text?: string
  caption?: string
}) {
  return (
    <div
      className="flex h-full flex-col justify-between"
      style={{
        background: "var(--fw-navy)",
        color: "white",
        borderRadius: "6px",
        padding: "1.5rem 1.75rem",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
          lineHeight: 1.25,
          color: "white",
          letterSpacing: "0.005em",
        }}
      >
        {text}
      </p>
      <p
        className="mt-4 text-[10px] font-semibold uppercase"
        style={{ color: "oklch(0.72 0.03 258)", letterSpacing: "0.22em" }}
      >
        {caption}
      </p>
    </div>
  )
}

// ─── ScalesIllustration ─────────────────────────────────────────────────────
// Scales of justice + pillars + ledger baseline. Tilts pans on parent hover
// (parent must have group + class `bento-illus-card`).

export function ScalesIllustration() {
  return (
    <>
      <svg
        viewBox="0 0 220 170"
        width="100%"
        style={{ maxWidth: "260px", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g stroke="oklch(0.22 0.045 258 / 0.18)" strokeWidth="1.2" fill="none">
          <rect x="22" y="40" width="10" height="100" rx="1.5" />
          <rect x="188" y="40" width="10" height="100" rx="1.5" />
          <rect x="18" y="34" width="18" height="6" rx="1" />
          <rect x="184" y="34" width="18" height="6" rx="1" />
          <rect x="16" y="140" width="22" height="6" rx="1" />
          <rect x="182" y="140" width="22" height="6" rx="1" />
        </g>
        <line x1="10" y1="152" x2="210" y2="152" stroke="var(--fw-navy)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="158" x2="180" y2="158" stroke="oklch(0.22 0.045 258 / 0.25)" strokeWidth="1" strokeLinecap="round" />
        <line x1="110" y1="32" x2="110" y2="118" stroke="var(--fw-navy)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="110" cy="28" r="4" fill="var(--fw-gold)" />
        <circle cx="110" cy="28" r="5.5" fill="none" stroke="var(--fw-navy)" strokeWidth="1" opacity="0.6" />
        <path d="M 96 120 L 124 120 L 120 130 L 100 130 Z" fill="var(--fw-navy)" />
        <line x1="48" y1="50" x2="172" y2="50" stroke="var(--fw-navy)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="50" x2="62" y2="72" stroke="var(--fw-navy)" strokeWidth="1.2" />
        <line x1="158" y1="50" x2="158" y2="72" stroke="var(--fw-navy)" strokeWidth="1.2" />
        <g className="bento-pan-left">
          <ellipse cx="62" cy="78" rx="22" ry="4" fill="var(--fw-navy)" />
          <path d="M 42 78 Q 62 96 82 78 Z" fill="none" stroke="var(--fw-navy)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="48" y1="82" x2="76" y2="82" stroke="var(--fw-gold)" strokeWidth="1" opacity="0.7" />
        </g>
        <g className="bento-pan-right">
          <ellipse cx="158" cy="78" rx="22" ry="4" fill="var(--fw-navy)" />
          <path d="M 138 78 Q 158 96 178 78 Z" fill="none" stroke="var(--fw-navy)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="144" y1="82" x2="172" y2="82" stroke="var(--fw-gold)" strokeWidth="1" opacity="0.7" />
        </g>
        <circle cx="110" cy="50" r="3" fill="var(--fw-gold)" />
      </svg>
      <style>{`
        .bento-pan-left { transform-origin: 62px 50px; transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1); }
        .bento-pan-right { transform-origin: 158px 50px; transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1); }
        .bento-illus-card:hover .bento-pan-left { transform: translateY(-3px); }
        .bento-illus-card:hover .bento-pan-right { transform: translateY(3px); }
      `}</style>
    </>
  )
}

// ─── LedgerGrowthIllustration ───────────────────────────────────────────────
// Ledger lines + ascending bar/curve = numbers + growth.

export function LedgerGrowthIllustration() {
  return (
    <>
      <svg
        viewBox="0 0 220 170"
        width="100%"
        style={{ maxWidth: "260px", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Ledger frame */}
        <rect x="18" y="22" width="184" height="126" rx="3" fill="none" stroke="oklch(0.22 0.045 258 / 0.2)" strokeWidth="1.2" />
        <line x1="18" y1="40" x2="202" y2="40" stroke="oklch(0.22 0.045 258 / 0.2)" strokeWidth="1" />
        {/* Ledger rows */}
        {[58, 76, 94, 112, 130].map((y) => (
          <line key={y} x1="28" y1={y} x2="118" y2={y} stroke="oklch(0.22 0.045 258 / 0.12)" strokeWidth="1" />
        ))}
        {/* Tiny "₹" mark in header */}
        <text x="28" y="34" fontFamily="var(--font-display)" fontSize="11" fill="var(--fw-navy)" letterSpacing="0.1em">LEDGER</text>
        {/* Ascending bars on the right */}
        <g className="bento-bars">
          <rect x="130" y="118" width="12" height="18" fill="var(--fw-navy)" />
          <rect x="148" y="100" width="12" height="36" fill="var(--fw-navy)" />
          <rect x="166" y="80" width="12" height="56" fill="var(--fw-navy)" opacity="0.85" />
          <rect x="184" y="56" width="12" height="80" fill="var(--fw-gold)" />
        </g>
        {/* Trend line */}
        <polyline
          points="136,118 154,100 172,80 190,56"
          fill="none"
          stroke="var(--fw-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle cx="190" cy="56" r="3" fill="var(--fw-accent)" />
        {/* Baseline */}
        <line x1="18" y1="148" x2="202" y2="148" stroke="var(--fw-navy)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <style>{`
        .bento-bars rect { transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1); transform-origin: bottom; }
        .bento-illus-card:hover .bento-bars rect:nth-child(1) { transform: scaleY(1.06); }
        .bento-illus-card:hover .bento-bars rect:nth-child(2) { transform: scaleY(1.08); }
        .bento-illus-card:hover .bento-bars rect:nth-child(3) { transform: scaleY(1.1); }
        .bento-illus-card:hover .bento-bars rect:nth-child(4) { transform: scaleY(1.12); }
      `}</style>
    </>
  )
}

// ─── BentoIllustrationCard ──────────────────────────────────────────────────
// Shell for centered custom SVG art with kicker + caption row.

export function BentoIllustrationCard({
  kicker,
  caption,
  captionAccent,
  children,
}: {
  kicker: string
  caption: string
  captionAccent?: string
  children: ReactNode
}) {
  return (
    <div
      className="bento-illus-card group relative flex h-full flex-col justify-between overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "1.5rem 1.75rem",
        minHeight: "100%",
      }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <pattern
            id={`bento-grid-${kicker.replace(/\W+/g, "-")}`}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 22 0 L 0 0 0 22"
              fill="none"
              stroke="oklch(0.22 0.045 258 / 0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#bento-grid-${kicker.replace(/\W+/g, "-")})`}
        />
      </svg>

      <p
        className="relative text-[10px] font-semibold uppercase"
        style={{
          color: "var(--muted-foreground)",
          letterSpacing: "0.22em",
        }}
      >
        {kicker}
      </p>

      <div className="relative flex flex-1 items-center justify-center py-3">
        {children}
      </div>

      <div className="relative flex items-end justify-between gap-3">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "var(--fw-navy)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {caption}
          <span style={{ color: "var(--fw-accent)" }}>.</span>
        </p>
        {captionAccent && (
          <p
            className="text-[10px] font-semibold uppercase"
            style={{
              color: "var(--muted-foreground)",
              letterSpacing: "0.18em",
            }}
          >
            {captionAccent}
          </p>
        )}
      </div>
    </div>
  )
}
