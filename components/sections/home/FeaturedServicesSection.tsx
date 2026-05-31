import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/common/fade-in"
import { SectionLabel } from "@/components/common/section-label"
import { ServiceCard } from "@/components/common/service-card"
import { getFeaturedServices } from "@/lib/firestore/services"
import type { ServiceDoc } from "@/types"

export async function FeaturedServicesSection() {
  const services = await getFeaturedServices()

  if (services.length === 0) return null

  return (
    <section
      style={{ background: "oklch(0.97 0.008 258)", borderTop: "1px solid var(--border)", paddingBottom: "6rem", paddingTop: "5rem" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeIn>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Our Services</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "var(--fw-navy)",
                lineHeight: 1.1,
              }}
            >
              Built for your
              <br />
              legal needs.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold self-end"
            style={{ color: "var(--fw-blue)" }}
          >
            Browse all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </FadeIn>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {services.map((svc, i) => (
            <FadeIn key={svc.id} delay={i * 75}>
              <ServiceCard service={svc} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
