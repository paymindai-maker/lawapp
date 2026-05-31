import { FadeIn } from "@/components/common/fade-in"
import { SectionLabel } from "@/components/common/section-label"
import type { ServiceDoc } from "@/types"

export function ProcessSection({ service }: { service: ServiceDoc }) {
  const steps = service.processSteps ?? []

  return (
    <section
      id="process"
      style={{
        background: "oklch(0.97 0.008 258)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionLabel>Our Approach</SectionLabel>
          <h2
            className="mb-16"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fw-navy)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
            }}
          >
            How We Work
          </h2>
        </FadeIn>

        {/* Horizontal timeline */}
        <div className="overflow-x-auto pb-2">
          <div className="relative" style={{ minWidth: `${Math.max(steps.length * 180, 600)}px` }}>

            {/* Connecting line */}
            <div
              className="absolute left-0 right-0"
              style={{ top: "23px", height: "1px", background: "var(--border)", zIndex: 0 }}
            />

            {/* Steps */}
            <div
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)`, zIndex: 1 }}
            >
              {steps.map((step, i) => (
                <FadeIn key={i} delay={i * 90} direction="up">
                  <div className="process-step flex flex-col items-center px-4 text-center">
                    {/* Circle */}
                    <div
                      className="process-circle mb-7 flex h-12 w-12 shrink-0 items-center justify-center"
                      style={{
                        background: i === 0 ? "var(--fw-navy)" : "oklch(0.97 0.008 258)",
                        border: `1px solid ${i === 0 ? "var(--fw-navy)" : "var(--border)"}`,
                        borderRadius: "50%",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <span
                        className="process-num"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          lineHeight: 1,
                          color: i === 0 ? "white" : "var(--fw-navy)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* Label */}
                    <p
                      className="process-label text-sm leading-relaxed"
                      style={{ color: "var(--muted-foreground)", maxWidth: "22ch" }}
                    >
                      {step}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
