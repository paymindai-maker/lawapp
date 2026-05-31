import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionLabel } from "@/components/common/section-label"
import { ServiceIcon } from "./service-icon"
import type { ServiceDoc } from "@/types"

export function RelatedSection({ services }: { services: ServiceDoc[] }) {
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
        <div className="mb-10 flex items-end justify-between">
          <div>
            <SectionLabel>Explore More</SectionLabel>
            <h2
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                lineHeight: 1.2,
              }}
            >
              Related Services
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden items-center gap-1.5 text-sm font-medium sm:flex"
            style={{ color: "var(--fw-blue)" }}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {services.map((svc) => (
            <Link
              key={svc.id}
              href={`/services/${svc.slug}`}
              className="group block p-5 transition-colors"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "3px" }}
            >
              <ServiceIcon name={svc.icon} className="mb-4 h-5 w-5" style={{ color: "var(--fw-blue)" }} />
              <p className="mb-2 text-sm font-semibold leading-snug" style={{ color: "var(--fw-navy)" }}>
                {svc.title}
              </p>
              <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {svc.shortDescription}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: "var(--fw-blue)" }}>
                Learn more
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
