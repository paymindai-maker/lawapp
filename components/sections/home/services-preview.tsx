import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SectionLabel } from "@/components/common/section-label"
import { FadeIn } from "@/components/common/fade-in"
import { getAllCategories } from "@/lib/firestore/services"

export async function ServicesPreview() {
  const categories = await getAllCategories()

  return (
    <section
      id="services"
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>What We Do</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "var(--fw-navy)",
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
            style={{ color: "var(--muted-foreground)" }}
          >
            Integrated CA + legal services. One firm. Serving Indian businesses since 2010.
          </p>
        </div>

        {categories.length > 0 ? (
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/services/${cat.slug}`}
                className="svc-row group flex items-center gap-6 py-6 md:py-8"
                style={{
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="shrink-0 w-14 text-right"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    color: "var(--fw-gold)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex flex-1 flex-col gap-1.5">
                  <p
                    className="svc-row-title text-lg font-semibold leading-tight"
                    style={{ color: "var(--fw-navy)", letterSpacing: "-0.02em" }}
                  >
                    {cat.name}
                  </p>
                  <p
                    className="svc-row-description hidden max-w-[70ch] text-sm leading-relaxed md:block"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {cat.description.length > 110
                      ? cat.description.slice(0, 110) + "…"
                      : cat.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center justify-center">
                  <ArrowRight
                    className="svc-row-arrow h-5 w-5 transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--fw-blue)" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex items-center justify-end gap-2">
          <Link
            href="/services"
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--fw-blue)" }}
          >
            View all practice areas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </FadeIn>
      </div>
    </section>
  )
}
