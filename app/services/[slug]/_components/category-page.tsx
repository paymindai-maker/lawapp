import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactSection } from "@/components/sections/home/contact-section"
import { SectionLabel } from "@/components/common/section-label"
import { ServiceIcon } from "./service-icon"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"

export function CategoryPage({
  category,
  services,
}: {
  category: ServiceCategoryDoc
  services: ServiceDoc[]
}) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <nav className="mb-5 flex items-center gap-2 text-xs font-medium">
              <Link href="/services" style={{ color: "var(--fw-blue)" }}>Services</Link>
              <ChevronRight className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
              <span style={{ color: "var(--foreground)" }}>{category.name}</span>
            </nav>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                Practice Area
              </span>
            </div>
            <h1
              className="mb-4 max-w-3xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)", fontSize: "clamp(2.25rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
            >
              {category.name}
            </h1>
            <p className="max-w-[58ch] text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {category.description}
            </p>
          </div>
        </section>

        {/* Services grid */}
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
                <SectionLabel>Practice Area</SectionLabel>
                <h2
                  className="mt-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  Services in this area
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-1.5 text-sm font-medium sm:flex"
                style={{ color: "var(--fw-blue)" }}
              >
                All categories
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {services.length > 0 ? (
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    href={`/services/${svc.slug}`}
                    className="group block p-6 transition-colors"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "3px" }}
                  >
                    <ServiceIcon name={svc.icon} className="mb-5 h-5 w-5" style={{ color: "var(--fw-blue)" }} />
                    <h3 className="mb-2 text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                      {svc.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {svc.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--fw-blue)" }}>
                      View Details
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Services for this category will appear here soon.
              </p>
            )}
          </div>
        </section>

        <ContactSection variant="inner" />
      </main>
      <Footer />
    </>
  )
}
