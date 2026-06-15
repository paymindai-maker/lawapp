import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"
import { SectionLabel } from "@/components/common/section-label"
import { FIRM_INFO } from "@/lib/data"
import { AboutIllustrationSlider } from "./about-illustration-slider"

export function AboutUsSection() {
  return (
    <section
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left: heading + copy ── */}
          <FadeIn className="lg:col-span-6">
            <SectionLabel>About NEXGEN</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1.08,
                marginBottom: "1.5rem",
              }}
            >
              Welcome to {FIRM_INFO.name}
              <br />
            
            </h2>
            <p
              className="mb-5 text-base leading-relaxed"
              style={{ color: "var(--muted-foreground)", maxWidth: "52ch" }}
            >
              {FIRM_INFO.name} Associates LLP is a full-service chartered
              accountancy and legal advisory firm helping Indian businesses stay
              compliant, grow confidently, and resolve challenges — from
              incorporation to litigation support.
            </p>
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "var(--muted-foreground)", maxWidth: "52ch" }}
            >
              As trusted chartered accountants in India, we deliver integrated
              financial, taxation, compliance, and corporate legal solutions
              under one roof. Whether you&apos;re a startup finding your footing
              or an enterprise scaling operations, NexGen tailors the engagement
              to your stage and sector.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--fw-accent)",
                  color: "white",
                  borderRadius: "3px",
                  boxShadow: "0 10px 24px -8px oklch(0.55 0.22 258 / 0.4)",
                }}
              >
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                style={{ border: "1px solid var(--border)", color: "var(--fw-navy)", borderRadius: "3px" }}
              >
                Meet the team
              </Link>
            </div>
          </FadeIn>

          {/* ── Right: illustration slider ── */}
          <FadeIn className="lg:col-span-6" delay={120}>
            <AboutIllustrationSlider />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
