import { STATS } from "@/lib/data"

export function StatsStripe() {
  return (
    <div
      className="relative z-10"
      style={{ background: "var(--fw-navy)", marginTop: "-1px" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-2"
              style={i > 0 ? { borderLeft: "1px solid oklch(0.22 0.065 255)", paddingLeft: "2rem" } : {}}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {s.val}
              </span>
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "oklch(0.44 0.055 255)" }}
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
