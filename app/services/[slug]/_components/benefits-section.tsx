import { FadeIn } from "@/components/common/fade-in"
import { Parallax } from "@/components/common/parallax"
import { SectionLabel } from "@/components/common/section-label"
import type { ServiceDoc } from "@/types"

export function BenefitsSection({ service }: { service: ServiceDoc }) {
  const richBenefits = service.benefitItems ?? []
  const legacyBenefits = service.benefits ?? []
  const hasBenefits = richBenefits.length > 0 || legacyBenefits.length > 0

  const richEligibility = service.eligibilityItems ?? []
  const legacyEligibility = service.eligibility ?? []
  const hasEligibility = richEligibility.length > 0 || legacyEligibility.length > 0

  if (!hasBenefits && !hasEligibility) return null

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

        {/* Benefits */}
        {hasBenefits && (
          <div className={hasEligibility ? "mb-20" : ""}>
            <FadeIn>
              <div className="mb-10">
                <SectionLabel>What to Expect</SectionLabel>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fw-navy)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    lineHeight: 1.15,
                  }}
                >
                  Key Benefits
                </h2>
              </div>
            </FadeIn>

            {richBenefits.length > 0 ? (
              <div
                className="grid gap-5"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
              >
                {richBenefits.map((benefit, i) => (
                  <FadeIn key={i} delay={i * 80} direction="up">
                    {/* benefit-card class: no overflow:hidden so box-shadow works */}
                    <div
                      className="benefit-card"
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                      }}
                    >
                      {/* Header band */}
                      <div
                        style={{
                          background: "var(--fw-navy)",
                          padding: "1.25rem 1.5rem 1rem",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          gap: "1rem",
                          borderRadius: "4px 4px 0 0",
                          overflow: "hidden",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                            lineHeight: 1.2,
                            color: "white",
                            fontWeight: 600,
                            maxWidth: "28ch",
                          }}
                        >
                          {benefit.title}
                        </p>
                        <span
                          aria-hidden
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "2.5rem",
                            lineHeight: 1,
                            color: "oklch(1 0 0 / 0.12)",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            flexShrink: 0,
                            userSelect: "none",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Body */}
                      <div
                        style={{
                          padding: "1.25rem 1.5rem",
                          borderRadius: "0 0 4px 4px",
                          background: "var(--card)",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              /* Legacy fallback */
              <div className="grid gap-0" style={{ borderTop: "1px solid var(--border)" }}>
                {legacyBenefits.map((b, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div
                      className="grid items-start gap-6 py-6 md:grid-cols-[3rem_1fr]"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.5rem",
                          lineHeight: 1,
                          color: "var(--fw-gold)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="text-base font-semibold leading-snug"
                        style={{
                          color: "var(--fw-navy)",
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {b}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Eligibility */}
        {hasEligibility && (
          <div>
            <FadeIn>
              <div className="mb-10">
                <SectionLabel>Who This Is For</SectionLabel>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fw-navy)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    lineHeight: 1.15,
                  }}
                >
                  Who Qualifies
                </h2>
              </div>
            </FadeIn>

            {richEligibility.length > 0 ? (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
              >
                {richEligibility.map((item, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <div
                      className="eligibility-card flex items-start gap-4 py-5 px-5"
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        background: "var(--card)",
                      }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold"
                        style={{
                          background: "oklch(0.96 0.016 80)",
                          border: "1px solid oklch(0.88 0.04 80)",
                          color: "oklch(0.45 0.09 80)",
                          borderRadius: "2px",
                          marginTop: "2px",
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p
                          className="text-sm font-semibold leading-snug"
                          style={{ color: "var(--fw-navy)" }}
                        >
                          {item.audience}
                        </p>
                        {item.note && (
                          <p
                            className="mt-1 text-xs leading-relaxed"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              /* Legacy fallback */
              <div className="grid gap-0" style={{ borderTop: "1px solid var(--border)" }}>
                {legacyEligibility.map((e, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div
                      className="flex items-center gap-5 py-5"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold"
                        style={{
                          background: "oklch(0.96 0.016 80)",
                          border: "1px solid oklch(0.88 0.04 80)",
                          color: "oklch(0.45 0.09 80)",
                          borderRadius: "2px",
                        }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-base font-medium" style={{ color: "var(--foreground)" }}>
                        {e}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}
