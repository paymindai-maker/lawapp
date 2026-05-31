import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ServiceCard } from "@/components/common/service-card"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"

function ComingSoonCard() {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center"
      style={{ border: "1px dashed var(--border)", background: "var(--muted)", minHeight: "200px", borderRadius: "3px" }}
    >
      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Coming Soon</p>
      <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
        Services in this category are being added.
      </p>
    </div>
  )
}

export function ServicesGrid({
  categories,
  services,
}: {
  categories: ServiceCategoryDoc[]
  services: ServiceDoc[]
}) {
  if (categories.length === 0) {
    return (
      <p className="py-16 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
        Services coming soon.
      </p>
    )
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6">
      {categories.map((cat, ci) => {
        const catServices = services.filter((s) => s.categoryId === cat.id)
        return (
          <div key={cat.id} className="scroll-mt-24">
            <div className="mb-8">
              <Link
                href={`/services/${cat.slug}`}
                className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-colors"
                style={{ color: "var(--fw-blue)" }}
              >
                {String(ci + 1).padStart(2, "0")} / {cat.name}
                <ArrowRight className="h-3 w-3" />
              </Link>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                  fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                  lineHeight: 1.15,
                }}
              >
                {cat.name}
              </h2>
            </div>
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
              {catServices.length > 0
                ? catServices.map((svc) => <ServiceCard key={svc.id} service={svc} />)
                : <ComingSoonCard />
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}
