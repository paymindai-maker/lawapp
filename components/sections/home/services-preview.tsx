import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SectionLabel } from "@/components/common/section-label"
import { DotGridBg } from "@/components/common/orb-bg"
import { DiagonalDivider } from "@/components/common/shape-divider"
import { getAdminDb } from "@/lib/firebase-admin"
import type { ServiceCategoryDoc } from "@/types"

async function getCategories(): Promise<ServiceCategoryDoc[]> {
  try {
    const db = getAdminDb()
    const snap = await db.collection("service_categories").orderBy("name").get()
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) }))
  } catch {
    return []
  }
}

export async function ServicesPreview() {
  const categories = await getCategories()

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

        {categories.length > 0 ? (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(0.20 0.065 255)" }}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/services/${cat.slug}`}
                className="svc-row group flex items-center gap-6 px-6 py-6 md:px-8 md:py-7"
                style={{
                  display: "flex",
                  background: "transparent",
                  borderBottom: i < categories.length - 1 ? "1px solid oklch(0.19 0.065 255)" : undefined,
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
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name + description */}
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <p
                    className="text-base font-semibold leading-snug"
                    style={{ color: "oklch(0.94 0.015 255)" }}
                  >
                    {cat.name}
                  </p>
                  <p
                    className="hidden text-sm leading-relaxed md:block"
                    style={{ color: "oklch(0.42 0.05 255)" }}
                  >
                    {cat.description.length > 100 ? cat.description.slice(0, 100) + "…" : cat.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="svc-row-arrow h-5 w-5 shrink-0"
                  style={{ color: "oklch(0.32 0.055 255)" }}
                />
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
