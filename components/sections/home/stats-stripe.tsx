import { STATS } from "@/lib/data"

export function StatsStripe() {
  return (
    <div
      style={{
        background: "oklch(0.97 0.008 258)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-2"
              style={i > 0 ? { borderLeft: "1px solid var(--border)", paddingLeft: "2rem" } : {}}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--fw-navy)",
                  lineHeight: 1,
                }}
              >
                {s.val}
              </span>
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--muted-foreground)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
