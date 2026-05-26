import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SectionLabel } from "@/components/common/section-label"
import { DotGridBg } from "@/components/common/orb-bg"
import { ServiceCard } from "@/components/common/service-card"
import { getFeaturedServices } from "@/lib/firestore/services"
import type { ServiceDoc } from "@/types"

export async function FeaturedServicesSection() {
  const services = await getFeaturedServices()

  if (services.length === 0) return null

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--fw-navy)", paddingBottom: "6rem", paddingTop: "5rem" }}
    >
      <DotGridBg opacity={0.08} size={32} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel light>Our Services</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "white",
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
            style={{ color: "var(--fw-blue-mid)" }}
          >
            Browse all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </div>
    </section>
  )
}
