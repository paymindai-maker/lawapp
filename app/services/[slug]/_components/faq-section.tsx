import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"
import { SectionLabel } from "@/components/common/section-label"
import { FaqAccordion } from "./faq-accordion"
import type { ServiceDoc } from "@/types"

export function FaqSection({ service }: { service: ServiceDoc }) {
  const faqs = service.faqs ?? []

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
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <FadeIn direction="left">
            <div>
              <SectionLabel>Common Questions</SectionLabel>
              <h2
                className="mt-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fw-navy)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: 1.15,
                }}
              >
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Have more questions? We&apos;re here to help.
              </p>
              <Link
                href="/contact"
                className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--fw-blue)" }}
              >
                Contact us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <FaqAccordion faqs={faqs} />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
