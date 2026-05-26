import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SectionLabel } from "@/components/common/section-label"
import { DotGridBg } from "@/components/common/orb-bg"
import { DiagonalDivider } from "@/components/common/shape-divider"
import { getAllCategories } from "@/lib/firestore/services"
import type { ServiceCategoryDoc } from "@/types"

export async function ServicesPreview() {
  const categories = await getAllCategories()

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: "var(--fw-navy)", paddingBottom: "6rem" }}
    >
      <DotGridBg opacity={0.09} size={32} />

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

    {/* Services List */}
{categories.length > 0 ? (
  <div
    className="overflow-hidden rounded-2xl"
    style={{
      border: "1px solid oklch(0.28 0.055 255)",
      background: "oklch(0.24 0.07 255 / 0.45)",
      backdropFilter: "blur(10px)",
    }}
  >
    {categories.map((cat, i) => (
      <Link
        key={cat.id}
        href={`/services/${cat.slug}`}
        className="svc-row group flex items-center gap-6 px-6 py-6 md:px-8 md:py-8"
        style={{
          display: "flex",
          borderBottom:
            i < categories.length - 1
              ? "1px solid oklch(0.30 0.05 255 / 0.5)"
              : undefined,
          textDecoration: "none",
        }}
      >
        {/* Number */}
        <span
          className="shrink-0 w-14 text-right"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 4vw, 3.25rem)",
            color: "oklch(0.95 0.01 255)",
            lineHeight: 1,
            opacity: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="min-w-0 flex flex-1 flex-col gap-1.5">
          <p
            className="text-lg font-semibold leading-tight"
            style={{
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {cat.name}
          </p>

          <p
            className="hidden max-w-[70ch] text-sm leading-relaxed md:block"
            style={{
              color: "oklch(0.78 0.02 255 / 0.72)",
            }}
          >
            {cat.description.length > 110
              ? cat.description.slice(0, 110) + "…"
              : cat.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex shrink-0 items-center justify-center">
          <ArrowRight
            className="svc-row-arrow h-5 w-5"
            style={{
              color: "oklch(0.88 0.015 255)",
              opacity: 0.75,
            }}
          />
        </div>
      </Link>
    ))}
  </div>
) : null}
        <div className="mt-10 flex items-center justify-end gap-2">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--fw-blue-mid)" }}
          >
            View all practice areas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <DiagonalDivider fill="var(--fw-surface)" direction="left" height={72} />
    </section>
  )
}
