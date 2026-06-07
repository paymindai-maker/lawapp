import { X, Check } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"
import { SectionLabel } from "@/components/common/section-label"
import type { ServiceDoc } from "@/types"

export function WhyUsSection({ service }: { service: ServiceDoc }) {
  const reasons = service.whyChooseUs ?? []

  return (
    <section
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionLabel>Our Advantage</SectionLabel>
          <h2
            className="mb-12"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fw-navy)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
            }}
          >
            Why Choose NEXGEN
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ border: "1px solid var(--border)", borderRadius: "3px", overflow: "hidden" }}>

            {/* Column headers */}
            <div className="grid grid-cols-2">
              <div
                className="px-6 py-4"
                style={{ borderBottom: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}
              >
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Others
                </span>
              </div>
              <div
                className="px-6 py-4"
                style={{ borderBottom: "1px solid var(--border)", background: "oklch(0.97 0.008 258)" }}
              >
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--fw-navy)" }}
                >
                  NEXGEN
                </span>
              </div>
            </div>

            {/* Rows */}
            {reasons.map((reason, i) => (
              <div
                key={reason}
                className="why-row grid grid-cols-2"
                style={{ borderBottom: i < reasons.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                {/* Others */}
                <div
                  className="flex items-start gap-3 px-6 py-5"
                  style={{ borderRight: "1px solid var(--border)" }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                    style={{
                      background: "oklch(0.96 0.015 25)",
                      border: "1px solid oklch(0.88 0.04 25)",
                      borderRadius: "50%",
                    }}
                  >
                    <X className="h-2.5 w-2.5" style={{ color: "oklch(0.55 0.16 25)" }} />
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    Not standard at most firms
                  </span>
                </div>

                {/* NEXGEN */}
                <div
                  className="flex items-start gap-3 px-6 py-5"
                  style={{ background: "oklch(0.97 0.008 258)" }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                    style={{
                      background: "oklch(0.94 0.025 255)",
                      border: "1px solid oklch(0.86 0.04 255)",
                      borderRadius: "50%",
                    }}
                  >
                    <Check className="h-2.5 w-2.5" style={{ color: "var(--fw-navy)" }} />
                  </span>
                  <span className="text-sm font-medium leading-relaxed" style={{ color: "var(--fw-navy)" }}>
                    {reason}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </FadeIn>
      </div>
    </section>
  )
}
