import Link from "next/link"
import {
  ArrowRight, MessageCircle, Briefcase,
  Building2, ReceiptText, Shield, Gavel, TrendingUp, BookOpen,
  type LucideIcon,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { TestimonialCard } from "@/components/common/testimonial-card"
import { TESTIMONIALS, FIRM_INFO, CONTACT_INFO } from "@/lib/data"
import { getAdminDb } from "@/lib/firebase-admin"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"

export const revalidate = 60

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, ReceiptText, Shield, Gavel, TrendingUp, BookOpen, Briefcase,
}

const SERVICES_PER_CATEGORY = 5

// ─── Firestore data ───────────────────────────────────────────────────────────

async function getServicesData(): Promise<{ categories: ServiceCategoryDoc[]; services: ServiceDoc[] }> {
  try {
    const db = getAdminDb()
    const [catSnap, svcSnap] = await Promise.all([
      db.collection("service_categories").orderBy("name").get(),
      db.collection("services").where("status", "==", "published").get(),
    ])
    const categories = catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) }))
    const services = svcSnap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) }))
      .sort((a, b) => a.title.localeCompare(b.title))
    return { categories, services }
  } catch {
    return { categories: [], services: [] }
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata = {
  title: "About Us | NEXGEN",
  description: "NEXGEN — trusted legal, tax and compliance firm in Mumbai. Serving Indian businesses for 18+ years.",
}

// ─── Static content ───────────────────────────────────────────────────────────

const WHY_US = [
  {
    title: "Trusted Expertise",
    body: "18+ years of practice across corporate law, taxation, and compliance — backed by deep domain knowledge.",
  },
  {
    title: "Timely Delivery",
    body: "Clear timelines, proactive updates, no unnecessary delays. We respect your business calendar.",
  },
  {
    title: "End-to-End Compliance",
    body: "From incorporation to annual filings, we manage the complete compliance lifecycle so nothing falls through.",
  },
  {
    title: "Dedicated Assistance",
    body: "A dedicated point of contact for every client. Accessible, responsive, and invested in your outcomes.",
  },
]

const PROCESS = [
  { num: "01", title: "Consultation", body: "Free initial call to understand your requirements." },
  { num: "02", title: "Analysis", body: "We map your needs to the exact process and timeline." },
  { num: "03", title: "Documentation", body: "Preparation and collection of all required documents." },
  { num: "04", title: "Filing", body: "End-to-end submission with relevant authorities." },
  { num: "05", title: "Ongoing Support", body: "Post-filing assistance and compliance reminders." },
]

const METRICS = [
  { val: "500+", label: "Cases Resolved" },
  { val: "18+", label: "Years of Practice" },
  { val: "6", label: "Practice Areas" },
  { val: "98%", label: "Client Satisfaction" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const { categories, services } = await getServicesData()

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          style={{
            background: "var(--fw-navy)",
            paddingTop: "5.5rem",
            paddingBottom: "5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-[680px]">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--fw-gold)" }}
              >
                {FIRM_INFO.city} · Est. {FIRM_INFO.established}
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  color: "white",
                  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                  lineHeight: 1.07,
                }}
              >
                Trusted Legal, Tax &amp; Compliance Solutions for Modern Businesses
              </h1>
              <p
                className="mt-5 max-w-[52ch] text-base leading-relaxed"
                style={{ color: "oklch(0.60 0.05 255)" }}
              >
                We help startups, businesses, and professionals navigate legal, taxation,
                registration, and compliance requirements with clarity and confidence.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "var(--fw-blue)", color: "white" }}
                >
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="rounded-lg px-6 py-3 text-sm font-semibold"
                  style={{ border: "1px solid oklch(0.34 0.07 255)", color: "oklch(0.72 0.05 255)" }}
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content zone (light) ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "var(--fw-surface)",
            clipPath: "polygon(0 56px, 100% 0, 100% 100%, 0 100%)",
            marginTop: "-56px",
            paddingTop: "calc(56px + 5rem)",
            paddingBottom: "0",
            zIndex: 2,
          }}
        >

          {/* Firm overview + metrics */}
          <div className="mx-auto max-w-7xl px-6 pb-20">
            <div className="grid gap-12 md:grid-cols-2 md:gap-20">
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--foreground)",
                    fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
                    lineHeight: 1.1,
                    marginBottom: "1.25rem",
                  }}
                >
                  Comprehensive Legal Services Since {FIRM_INFO.established}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "55ch" }}>
                  NEXGEN is a full-service legal and compliance firm based in {FIRM_INFO.city}.
                  We provide integrated support across company law, taxation, regulatory
                  compliance, and business advisory — serving founders, SMEs, and growing
                  enterprises across India.
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "55ch" }}>
                  Our practice spans business registration, GST and income tax compliance,
                  trademark filings, corporate documentation, and commercial litigation.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-8">
                  {METRICS.map((m) => (
                    <div key={m.label}>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "2.8rem",
                          color: "var(--foreground)",
                          lineHeight: 1,
                        }}
                      >
                        {m.val}
                      </p>
                      <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mission / Vision */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div className="mx-auto max-w-7xl px-6 py-16">
              <div className="grid gap-10 md:grid-cols-2 md:gap-20">
                <div>
                  <p
                    className="mb-3 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Mission
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "var(--foreground)", maxWidth: "52ch" }}>
                    To simplify legal, tax, and compliance processes for businesses through
                    professional guidance and transparent support — making reliable legal counsel
                    accessible at every stage of growth.
                  </p>
                </div>
                <div>
                  <p
                    className="mb-3 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Vision
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "var(--foreground)", maxWidth: "52ch" }}>
                    To become the most trusted legal and compliance partner for modern
                    businesses and entrepreneurs across India — known for integrity, expertise,
                    and dependable guidance at every stage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div className="mx-auto max-w-7xl px-6 py-16">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: 1.1,
                  marginBottom: "2.5rem",
                }}
              >
                Why businesses choose NEXGEN
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {WHY_US.map(({ title, body }) => (
                  <div key={title}>
                    <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div className="mx-auto max-w-7xl px-6 py-16">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: 1.1,
                  marginBottom: "3rem",
                }}
              >
                How we work
              </h2>

              {/* Desktop: horizontal connected steps */}
              <div className="hidden md:flex md:items-start">
                {PROCESS.map((step, i) => (
                  <div key={step.num} className="flex flex-1 flex-col">
                    <div className="flex items-center">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{
                          background: "var(--fw-navy)",
                          color: "white",
                          fontFamily: "var(--font-display)",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {step.num}
                      </div>
                      {i < PROCESS.length - 1 && (
                        <div className="flex-1" style={{ height: "1px", background: "var(--border)" }} />
                      )}
                    </div>
                    <div className="pr-5 pt-4">
                      <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: vertical list */}
              <div className="flex flex-col gap-7 md:hidden">
                {PROCESS.map((step, i) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{ background: "var(--fw-navy)", color: "white", fontFamily: "var(--font-display)" }}
                      >
                        {step.num}
                      </div>
                      {i < PROCESS.length - 1 && (
                        <div
                          className="mt-2 flex-1"
                          style={{ width: "1px", background: "var(--border)", minHeight: "20px" }}
                        />
                      )}
                    </div>
                    <div className="pb-2 pt-1">
                      <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services Overview */}
          {categories.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border)" }}>
              <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-8 flex items-end justify-between gap-4">
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--foreground)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    Our services
                  </h2>
                  <Link
                    href="/services"
                    className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5 md:flex"
                    style={{ color: "var(--fw-blue)" }}
                  >
                    View all
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="flex flex-col gap-10">
                  {categories.map((cat) => {
                    const catServices = services.filter((s) => s.categoryId === cat.id)
                    const slots = Array.from({ length: SERVICES_PER_CATEGORY }, (_, i) => catServices[i] ?? null)

                    return (
                      <div key={cat.id}>
                        <Link
                          href={`/services/${cat.slug}`}
                          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-all hover:gap-2.5"
                          style={{ color: "var(--fw-blue)" }}
                        >
                          {cat.name}
                          <ArrowRight className="h-3 w-3" />
                        </Link>

                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                          {slots.map((svc, i) =>
                            svc ? (
                              <Link
                                key={svc.id}
                                href={`/services/${svc.slug}`}
                                className="group flex flex-col gap-2.5 rounded-lg p-4 transition-colors hover:shadow-sm"
                                style={{
                                  background: "var(--card)",
                                  border: "1px solid var(--border)",
                                  textDecoration: "none",
                                }}
                              >
                                <div
                                  className="flex h-8 w-8 items-center justify-center rounded-md"
                                  style={{ background: "color-mix(in oklch, var(--fw-blue) 10%, var(--card))" }}
                                >
                                  {(() => {
                                    const Icon = ICON_MAP[svc.icon] ?? Briefcase
                                    return <Icon className="h-4 w-4" style={{ color: "var(--fw-blue)" }} />
                                  })()}
                                </div>
                                <p
                                  className="text-xs font-semibold leading-snug"
                                  style={{ color: "var(--foreground)" }}
                                >
                                  {svc.title}
                                </p>
                                {svc.quickInfo?.startingPrice && (
                                  <p
                                    className="mt-auto text-[10px] font-medium"
                                    style={{ color: "var(--muted-foreground)" }}
                                  >
                                    From {svc.quickInfo.startingPrice}
                                  </p>
                                )}
                              </Link>
                            ) : (
                              <div
                                key={`placeholder-${i}`}
                                className="flex items-center justify-center rounded-lg p-4"
                                style={{ border: "1.5px dashed var(--border)", minHeight: "96px" }}
                              >
                                <p
                                  className="text-[10px] font-semibold"
                                  style={{ color: "var(--muted-foreground)" }}
                                >
                                  Coming soon
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5 md:hidden"
                  style={{ color: "var(--fw-blue)" }}
                >
                  View all services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Testimonials */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div className="mx-auto max-w-7xl px-6 py-16">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: 1.1,
                  marginBottom: "2.5rem",
                }}
              >
                What clients say
              </h2>
              <div className="flex flex-col">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.name}
                    className="py-8"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <TestimonialCard testimonial={t} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* ── Final CTA ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "var(--fw-navy)",
            clipPath: "polygon(0 0, 100% 56px, 100% 100%, 0 100%)",
            marginTop: "-56px",
            paddingTop: "calc(56px + 5rem)",
            paddingBottom: "6rem",
            zIndex: 3,
          }}
        >
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Ready to speak with a legal expert?
            </h2>
            <p
              className="mx-auto mb-8 max-w-[48ch] text-sm leading-relaxed"
              style={{ color: "oklch(0.58 0.055 255)" }}
            >
              Book a free consultation to discuss your legal, tax, or compliance requirements.
              Our team responds within one business day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--fw-blue)", color: "white" }}
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
                style={{ border: "1px solid oklch(0.34 0.07 255)", color: "oklch(0.72 0.05 255)" }}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
            <p className="mt-5 text-xs" style={{ color: "oklch(0.40 0.06 255)" }}>
              {CONTACT_INFO.email} · {CONTACT_INFO.phone}
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
