// ─── Inner-page section divider ──────────────────────────────────────────────

export function RuleDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center ${className ?? ""}`}
      style={{ padding: "0 1.5rem" }}
    >
      <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      <div
        className="mx-3 rotate-45"
        style={{
          width: "5px",
          height: "5px",
          background: "var(--fw-blue)",
          opacity: 0.45,
          flexShrink: 0,
        }}
      />
      <div className="h-px flex-1" style={{ background: "var(--border)" }} />
    </div>
  )
}

// ─── Homepage shape dividers ──────────────────────────────────────────────────

interface ShapeDividerProps {
  fill: string
  direction?: "right" | "left"
  height?: number
}

export function DiagonalDivider({ fill, direction = "right", height = 80 }: ShapeDividerProps) {
  const points =
    direction === "right"
      ? `0,${height} 0,${Math.round(height * 0.45)} 1440,0 1440,${height}`
      : `0,0 1440,${Math.round(height * 0.45)} 1440,${height} 0,${height}`

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 right-0"
      style={{ height, lineHeight: 0 }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <polygon points={points} fill={fill} />
      </svg>
    </div>
  )
}

export function WaveDivider({ fill, height = 72 }: Omit<ShapeDividerProps, "direction">) {
  const mid = Math.round(height * 0.55)
  const low = height
  const high = Math.round(height * 0.15)

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 right-0"
      style={{ height, lineHeight: 0 }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path
          d={`M0,${mid} C300,${low} 600,${high} 900,${mid} C1100,${low} 1280,${high} 1440,${mid} L1440,${low} L0,${low} Z`}
          fill={fill}
        />
      </svg>
    </div>
  )
}
