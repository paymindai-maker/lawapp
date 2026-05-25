import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ServiceCard } from "@/components/common/service-card"
import { getAdminDb } from "@/lib/firebase-admin"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"

export const revalidate = 60

export const metadata = {
  title: "Services | NEXGEN",
  description: "Explore NEXGEN's full range of legal and CA services for businesses across India.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

async function getData() {
  try {
    const db = getAdminDb()

    const [catSnap, svcSnap] = await Promise.all([
      db.collection("service_categories").orderBy("name").get(),
      db.collection("services").where("status", "==", "published").get(),
    ])

    const categories = catSnap.docs.map((doc) => {
      const data = doc.data() as any

      return {
        id: doc.id,
        ...data,

        createdAt:
          typeof data.createdAt?.toDate === "function"
            ? data.createdAt.toDate().toISOString()
            : data.createdAt ?? null,

        updatedAt:
          typeof data.updatedAt?.toDate === "function"
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt ?? null,
      }
    })

    const services = svcSnap.docs
      .map((doc) => {
        const data = doc.data() as any

        return {
          id: doc.id,
          ...data,

          createdAt:
            typeof data.createdAt?.toDate === "function"
              ? data.createdAt.toDate().toISOString()
              : data.createdAt ?? null,

          updatedAt:
            typeof data.updatedAt?.toDate === "function"
              ? data.updatedAt.toDate().toISOString()
              : data.updatedAt ?? null,
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))

    return { categories, services }
  } catch (error) {
    console.error("Failed to fetch services page data:", error)

    return {
      categories: [],
      services: [],
    }
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ServicesPage() {
  const { categories, services } = await getData()

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-24"
          style={{ background: "var(--fw-navy)" }}
        >
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
          >
            <defs>
              <pattern id="svc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#svc-grid)" />
          </svg>
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--fw-gold)" }}
            >
              What We Offer
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Our Legal Services
            </h1>
            <p
              className="mx-auto mt-5 max-w-[55ch] text-base leading-relaxed"
              style={{ color: "oklch(0.62 0.05 255)" }}
            >
              From corporate structuring to trademark filing — a complete legal practice
              for every stage of your business journey.
            </p>
          </div>
        </section>

        {/* Category groups */}
        <section className="py-20" style={{ background: "var(--fw-surface)" }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6">
            {categories.map((cat, ci) => {
              const catServices = services.filter((s) => s.categoryId === cat.id)

              return (
                <div key={cat.id} className="scroll-mt-24">
                  {/* Category header */}
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

                  {/* Service cards */}
                  <div
                    className="grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
                  >
                    {catServices.length > 0 ? (
                      catServices.map((svc) => <ServiceCard key={svc.id} service={svc} />)
                    ) : (
                      <ComingSoonCard />
                    )}
                  </div>
                </div>
              )
            })}

            {categories.length === 0 && (
              <p className="py-16 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
                Services coming soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ComingSoonCard() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl p-8 text-center"
      style={{
        border: "1.5px dashed var(--border)",
        background: "var(--muted)",
        minHeight: "200px",
      }}
    >
      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
        Coming Soon
      </p>
      <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
        Services in this category are being added.
      </p>
    </div>
  )
}
