import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ServiceCard } from "@/components/common/service-card"
import { getAllCategories, getAllPublishedServices } from "@/lib/firestore/services"

export const revalidate = 3600

export const metadata = {
  title: "Legal & Tax Services | Business Registration, GST, Litigation | NEXGEN",
  description:
    "NEXGEN offers business registration, business licensing, income tax & GST compliance, litigation, and mutual fund advisory. Expert Advocates and CAs. Mumbai-based, serving India since 2006.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

async function getData() {
  const [categories, services] = await Promise.all([
    getAllCategories(),
    getAllPublishedServices(),
  ])
  return { categories, services }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ServicesPage() {
  const { categories, services } = await getData()

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                Expert Legal &amp; Financial Services
              </p>
            </div>
            <h1
              className="max-w-[20ch]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Legal, Tax &amp; Compliance Services for Indian Businesses
            </h1>
            <p className="mt-5 max-w-[55ch] text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Business registration, licensing, GST compliance, income tax filing, litigation representation, and mutual fund advisory — a complete practice for every stage of your business journey.
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
      className="flex flex-col items-center justify-center p-8 text-center"
      style={{
        border: "1px dashed var(--border)",
        background: "var(--muted)",
        minHeight: "200px",
        borderRadius: "3px",
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
