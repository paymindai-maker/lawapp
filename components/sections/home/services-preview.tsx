import { ArrowRight } from "lucide-react"
import { SectionLabel } from "@/components/common/section-label"
import { DotGridBg } from "@/components/common/orb-bg"
import { DiagonalDivider } from "@/components/common/shape-divider"
import { SERVICES } from "@/lib/data"

export function ServicesPreview() {
  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: "var(--fw-navy)", paddingBottom: "6rem" }}
    >
      <DotGridBg opacity={0.04} size={32} />

      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel light>What We Do</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Legal expertise
              <br />
              you can count on.
            </h2>
          </div>
          <p
            className="max-w-[38ch] text-sm leading-relaxed md:text-right"
            style={{ color: "oklch(0.44 0.055 255)" }}
          >
            Six practice areas. One firm. Serving companies across India since 2006.
          </p>
        </div>

        {/* Editorial numbered rows */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid oklch(0.20 0.065 255)" }}
        >
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <a
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="svc-row group flex items-center gap-6 px-6 py-6 md:px-8 md:py-7"
                style={{
                  background: "transparent",
                  borderBottom: i < SERVICES.length - 1 ? "1px solid oklch(0.19 0.065 255)" : undefined,
                  textDecoration: "none",
                }}
              >
                {/* Number */}
                <span
                  className="shrink-0 w-12 text-right"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    color: "oklch(0.22 0.065 255)",
                    lineHeight: 1,
                  }}
                >
                  {svc.num}
                </span>

                {/* Icon */}
                <div
                  className="hidden shrink-0 items-center justify-center rounded-lg sm:flex"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "oklch(0.16 0.07 255)",
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--fw-blue-mid)" }} />
                </div>

                {/* Title + description */}
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <p
                    className="text-base font-semibold leading-snug"
                    style={{ color: "oklch(0.94 0.015 255)" }}
                  >
                    {svc.title}
                  </p>
                  <p
                    className="hidden text-sm leading-relaxed md:block"
                    style={{ color: "oklch(0.42 0.05 255)" }}
                  >
                    {svc.description.length > 90 ? svc.description.slice(0, 90) + "…" : svc.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="svc-row-arrow h-5 w-5 shrink-0"
                  style={{ color: "oklch(0.32 0.055 255)" }}
                />
              </a>
            )
          })}
        </div>

        <div className="mt-10 flex items-center justify-end gap-2">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--fw-blue-mid)" }}
          >
            View all practice areas
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Diagonal transition to light Why Choose Us */}
      <DiagonalDivider fill="var(--fw-surface)" direction="left" height={72} />
    </section>
  )
}
