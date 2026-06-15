import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getAllCategories, getAllPublishedServices } from "@/lib/firestore/services"
import { ServicesGrid } from "./_components/services-grid"
import { CrossPageLinks } from "@/components/common/cross-page-links"

export const revalidate = 3600

export const metadata = {
  title: "CA & Legal Services | GST, ITR, Audit, Company Registration",
  description:
    "NexGen offers GST filing, income tax, audit & assurance, company registration, legal advisory, and contract drafting. Integrated CA + legal services serving Indian businesses since 2010.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "CA & Legal Services — GST, ITR, Audit, Company Registration | NexGen",
    description:
      "GST, income tax, audit, company registration, legal advisory, and contract drafting. Integrated CA + legal services for Indian businesses since 2010.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CA & Legal Services | NexGen Associates LLP",
    description:
      "GST, ITR, audit, company registration, and corporate legal services from NexGen's chartered accountants and legal advisors.",
  },
}

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([getAllCategories(), getAllPublishedServices()])

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
          <ServicesGrid categories={categories} services={services} />
        </section>
        <CrossPageLinks exclude="services" />
      </main>
      <Footer />
    </>
  )
}
