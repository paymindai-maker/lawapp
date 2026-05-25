import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, Clock, MessageSquare, DollarSign, CheckCircle2,
  FileText, Shield, Building2, Scale, Landmark, Briefcase,
  Globe, Users, BookOpen, ReceiptText, ShieldCheck, FileCheck,
  Rocket, Banknote, TrendingUp, Award, Gavel, FilePlus, ChevronRight,
  type LucideIcon,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactSection } from "@/components/sections/home/contact-section"
import { SectionLabel } from "@/components/common/section-label"
import { getAdminDb } from "@/lib/firebase-admin"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"
import { FaqAccordion } from "./_components/faq-accordion"

export const revalidate = 60

// ─── Icon map ───────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, FileText, Shield, Rocket, Scale, Landmark, Briefcase,
  Globe, Users, BookOpen, ReceiptText, ShieldCheck, FileCheck,
  Banknote, TrendingUp, Award, Gavel, FilePlus, CheckCircle2,
}

function ServiceIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Icon = ICON_MAP[name] ?? Briefcase
  return <Icon className={className} style={style} />
}

// ─── Data fetchers ───────────────────────────────────────────────────────────

async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  try {
    const db = getAdminDb()
    const snap = await db
      .collection("services")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get()
    if (snap.empty) return null
    const d = snap.docs[0]
    return { id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) }
  } catch {
    return null
  }
}

async function getCategoryBySlug(slug: string): Promise<ServiceCategoryDoc | null> {
  try {
    const db = getAdminDb()
    const snap = await db
      .collection("service_categories")
      .where("slug", "==", slug)
      .limit(1)
      .get()
    if (snap.empty) return null
    const d = snap.docs[0]
    return { id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) }
  } catch {
    return null
  }
}

async function getCategoryById(id: string): Promise<ServiceCategoryDoc | null> {
  try {
    const db = getAdminDb()
    const d = await db.collection("service_categories").doc(id).get()
    if (!d.exists) return null
    return { id: d.id, ...(d.data() as Omit<ServiceCategoryDoc, "id">) }
  } catch {
    return null
  }
}

async function getRelatedServices(ids: string[]): Promise<ServiceDoc[]> {
  if (!ids?.length) return []
  try {
    const db = getAdminDb()
    const docs = await Promise.all(ids.slice(0, 4).map((id) => db.collection("services").doc(id).get()))
    return docs
      .filter((d) => d.exists && (d.data() as ServiceDoc)?.status === "published")
      .map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) }))
  } catch {
    return []
  }
}

async function getServicesByCategory(categoryId: string): Promise<ServiceDoc[]> {
  try {
    const db = getAdminDb()
    const snap = await db
      .collection("services")
      .where("categoryId", "==", categoryId)
      .where("status", "==", "published")
      .get()
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) }))
  } catch {
    return []
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const [service, category] = await Promise.all([
    getServiceBySlug(slug),
    getCategoryBySlug(slug),
  ])
  if (service) {
    return {
      title: service.seo?.title || `${service.title} | NEXGEN`,
      description: service.seo?.description || service.shortDescription,
    }
  }
  if (category) {
    return { title: `${category.name} | NEXGEN`, description: category.description }
  }
  return {}
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ServicePage({ params }: Props) {
  const { slug } = await params

  const [service, category] = await Promise.all([
    getServiceBySlug(slug),
    getCategoryBySlug(slug),
  ])

  if (service) {
    const [relatedServices, serviceCategory] = await Promise.all([
      getRelatedServices(service.relatedServices ?? []),
      getCategoryById(service.categoryId),
    ])
    return (
      <IndividualServicePage
        service={service}
        category={serviceCategory}
        relatedServices={relatedServices}
      />
    )
  }

  if (category) {
    const categoryServices = await getServicesByCategory(category.id)
    return <CategoryPage category={category} services={categoryServices} />
  }

  notFound()
}

// ─── Individual service page ──────────────────────────────────────────────────

function IndividualServicePage({
  service,
  category,
  relatedServices,
}: {
  service: ServiceDoc
  category: ServiceCategoryDoc | null
  relatedServices: ServiceDoc[]
}) {
  const hasDocuments = (service.requiredDocuments?.length ?? 0) > 0
  const hasFaqs = (service.faqs?.length ?? 0) > 0
  const hasWhyUs = (service.whyChooseUs?.length ?? 0) > 0
  const hasRelated = relatedServices.length > 0

  // Z-indices for clip-path stacking
  let z = 1

  return (
    <>
      <Navbar />
      <main style={{ overflow: "hidden" }}>
        {/* ── Hero ── */}
        <HeroSection service={service} category={category} zIndex={z++} />

        {/* ── Benefits + Eligibility ── */}
        {((service.benefits?.length ?? 0) > 0 || (service.eligibility?.length ?? 0) > 0) && (
          <BenefitsSection service={service} zIndex={z++} />
        )}

        {/* ── Process ── */}
        {(service.processSteps?.length ?? 0) > 0 && (
          <ProcessSection service={service} zIndex={z++} />
        )}

        {/* ── Documents ── */}
        {hasDocuments && <DocumentsSection service={service} zIndex={z++} />}

        {/* ── FAQs ── */}
        {hasFaqs && <FaqSection service={service} zIndex={z++} />}

        {/* ── Why Choose Us ── */}
        {hasWhyUs && <WhyUsSection service={service} zIndex={z++} />}

        {/* ── Related services ── */}
        {hasRelated && <RelatedSection services={relatedServices} zIndex={z++} />}

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({
  service,
  category,
  zIndex,
}: {
  service: ServiceDoc
  category: ServiceCategoryDoc | null
  zIndex: number
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-navy)",
        paddingTop: "6rem",
        paddingBottom: "8rem",
        position: "relative",
        zIndex,
      }}
    >
      {/* Background grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Floating geometric shapes */}
      <div
        aria-hidden
        className="animate-shape-float pointer-events-none absolute right-[8%] top-[12%] h-40 w-40 opacity-[0.06]"
        style={{
          background: "conic-gradient(from 45deg, var(--fw-gold), transparent 50%)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        aria-hidden
        className="animate-shape-float-slow pointer-events-none absolute left-[5%] bottom-[20%] h-24 w-24 opacity-[0.05]"
        style={{
          background: "var(--fw-blue)",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      />
      <div
        aria-hidden
        className="animate-shape-float-mid pointer-events-none absolute right-[20%] bottom-[15%] h-16 w-16 rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, var(--fw-gold), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Left: text */}
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-medium" aria-label="Breadcrumb">
              <Link
                href="/services"
                className="transition-colors"
                style={{ color: "oklch(0.50 0.10 255)" }}
              >
                Services
              </Link>
              {category && (
                <>
                  <ChevronRight className="h-3 w-3" style={{ color: "oklch(0.38 0.07 255)" }} />
                  <Link
                    href={`/services/${category.slug}`}
                    className="transition-colors"
                    style={{ color: "oklch(0.50 0.10 255)" }}
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="h-3 w-3" style={{ color: "oklch(0.38 0.07 255)" }} />
              <span style={{ color: "oklch(0.65 0.08 255)" }}>{service.title}</span>
            </nav>

            {/* Icon + title */}
            <div className="mb-4 flex items-start gap-4">
              <div
                className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <ServiceIcon
                  name={service.icon}
                  className="h-6 w-6"
                  style={{ color: "var(--fw-gold)" }}
                />
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  color: "white",
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                {service.hero?.heading || service.title}
              </h1>
            </div>

            {/* Subheading */}
            {service.hero?.subheading && (
              <p
                className="mb-8 max-w-[58ch] text-base leading-relaxed"
                style={{ color: "oklch(0.62 0.05 255)" }}
              >
                {service.hero.subheading}
              </p>
            )}

            {/* Quick info chips */}
            {service.quickInfo && (
              <div className="mb-8 flex flex-wrap gap-3">
                {service.quickInfo.timeline && (
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "oklch(0.72 0.05 255)",
                    }}
                  >
                    <Clock className="h-3.5 w-3.5" style={{ color: "var(--fw-gold)" }} />
                    {service.quickInfo.timeline}
                  </div>
                )}
                {service.quickInfo.consultation && (
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "oklch(0.72 0.05 255)",
                    }}
                  >
                    <MessageSquare className="h-3.5 w-3.5" style={{ color: "var(--fw-gold)" }} />
                    {service.quickInfo.consultation}
                  </div>
                )}
                {service.quickInfo.startingPrice && (
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "oklch(0.72 0.05 255)",
                    }}
                  >
                    <DollarSign className="h-3.5 w-3.5" style={{ color: "var(--fw-gold)" }} />
                    Starting {service.quickInfo.startingPrice}
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all"
              style={{
                background: "var(--fw-gold)",
                color: "var(--fw-navy)",
              }}
            >
              {service.hero?.ctaText || "Get Started"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: featured image */}
          {service.featuredImage && (
            <div
              className="hidden lg:block"
              style={{
                width: "360px",
                flexShrink: 0,
              }}
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src={service.featuredImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="360px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(10,20,60,0.3) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Benefits + Eligibility ───────────────────────────────────────────────────

function BenefitsSection({ service, zIndex }: { service: ServiceDoc; zIndex: number }) {
  const benefits = service.benefits ?? []
  const eligibility = service.eligibility ?? []

  return (
    <section
      style={{
        background: "var(--fw-surface)",
        clipPath: "polygon(0 72px, 100% 0, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex,
      }}
    >
      {/* Subtle dot grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="var(--fw-navy)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionLabel>What to Expect</SectionLabel>
        <h2
          className="mb-12"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fw-navy)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.15,
          }}
        >
          Benefits &amp; Eligibility
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Benefits */}
          {benefits.length > 0 && (
            <div
              className="rounded-2xl p-8"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--fw-blue)" }}
              >
                Key Benefits
              </p>
              <ul className="flex flex-col gap-4">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: "var(--fw-blue)" }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility */}
          {eligibility.length > 0 && (
            <div
              className="rounded-2xl p-8"
              style={{
                background: "oklch(0.13 0.055 264 / 0.03)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--fw-gold)" }}
              >
                Who Qualifies
              </p>
              <ul className="flex flex-col gap-4">
                {eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: "var(--fw-gold)",
                        color: "white",
                        marginTop: "1px",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                      {e}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────

function ProcessSection({ service, zIndex }: { service: ServiceDoc; zIndex: number }) {
  const steps = service.processSteps ?? []

  return (
    <section
      style={{
        background: "var(--fw-navy-mid)",
        clipPath: "polygon(0 0, 100% 72px, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel light>Our Approach</SectionLabel>
        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            color: "white",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.15,
          }}
        >
          How We Work
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-6 transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Large step number */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.07)",
                  display: "block",
                  marginBottom: "0.75rem",
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.70 0.05 255)" }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Documents ────────────────────────────────────────────────────────────────

function DocumentsSection({ service, zIndex }: { service: ServiceDoc; zIndex: number }) {
  const docs = service.requiredDocuments ?? []

  return (
    <section
      style={{
        background: "var(--fw-surface)",
        clipPath: "polygon(0 72px, 100% 0, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>What to Prepare</SectionLabel>
        <h2
          className="mb-12"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fw-navy)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.15,
          }}
        >
          Required Documents
        </h2>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {docs.map((doc, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <FileText className="h-4 w-4 shrink-0" style={{ color: "var(--fw-blue)" }} />
              <span className="text-sm" style={{ color: "var(--foreground)" }}>
                {doc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

function FaqSection({ service, zIndex }: { service: ServiceDoc; zIndex: number }) {
  const faqs = service.faqs ?? []

  return (
    <section
      style={{
        background: "var(--fw-navy)",
        clipPath: "polygon(0 0, 100% 72px, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Left: label + heading */}
          <div>
            <SectionLabel light>Common Questions</SectionLabel>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.15,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "oklch(0.55 0.05 255)" }}>
              Have more questions? We&apos;re here to help.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--fw-gold)" }}
            >
              Contact us
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Right: accordion */}
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyUsSection({ service, zIndex }: { service: ServiceDoc; zIndex: number }) {
  const reasons = service.whyChooseUs ?? []

  return (
    <section
      style={{
        background: "var(--fw-surface)",
        clipPath: "polygon(0 72px, 100% 0, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Our Advantage</SectionLabel>
        <h2
          className="mb-12"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fw-navy)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.15,
          }}
        >
          Why Choose Us
        </h2>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
        >
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group rounded-2xl p-6 transition-all"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: "var(--fw-blue-light)", color: "var(--fw-blue)" }}
                >
                  {i + 1}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Related Services ─────────────────────────────────────────────────────────

function RelatedSection({ services, zIndex }: { services: ServiceDoc[]; zIndex: number }) {
  return (
    <section
      style={{
        background: "var(--fw-navy-mid)",
        clipPath: "polygon(0 0, 100% 72px, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <SectionLabel light>Explore More</SectionLabel>
            <h2
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                lineHeight: 1.2,
              }}
            >
              Related Services
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden items-center gap-1.5 text-sm font-medium sm:flex"
            style={{ color: "var(--fw-gold)" }}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {services.map((svc) => (
            <Link
              key={svc.id}
              href={`/services/${svc.slug}`}
              className="group block rounded-2xl p-5 transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <ServiceIcon
                  name={svc.icon}
                  className="h-4 w-4"
                  style={{ color: "var(--fw-gold)" }}
                />
              </div>
              <p
                className="mb-2 text-sm font-semibold leading-snug"
                style={{ color: "white" }}
              >
                {svc.title}
              </p>
              <p
                className="line-clamp-2 text-xs leading-relaxed"
                style={{ color: "oklch(0.52 0.04 255)" }}
              >
                {svc.shortDescription}
              </p>
              <div
                className="mt-4 flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--fw-gold)" }}
              >
                Learn more
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Category page ────────────────────────────────────────────────────────────

function CategoryPage({
  category,
  services,
}: {
  category: ServiceCategoryDoc
  services: ServiceDoc[]
}) {
  return (
    <>
      <Navbar />
      <main style={{ overflow: "hidden" }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--fw-navy)", paddingTop: "6rem", paddingBottom: "8rem" }}
        >
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
          >
            <defs>
              <pattern id="cat-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cat-grid)" />
          </svg>

          <div
            aria-hidden
            className="animate-shape-float pointer-events-none absolute right-[8%] top-[12%] h-48 w-48 opacity-[0.06]"
            style={{
              background: "conic-gradient(from 45deg, var(--fw-gold), transparent 50%)",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6">
            <nav className="mb-6 flex items-center gap-2 text-xs font-medium">
              <Link href="/services" style={{ color: "oklch(0.50 0.10 255)" }}>Services</Link>
              <ChevronRight className="h-3 w-3" style={{ color: "oklch(0.38 0.07 255)" }} />
              <span style={{ color: "oklch(0.65 0.08 255)" }}>{category.name}</span>
            </nav>

            <h1
              className="mb-5 max-w-3xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              {category.name}
            </h1>
            <p
              className="max-w-[58ch] text-base leading-relaxed"
              style={{ color: "oklch(0.62 0.05 255)" }}
            >
              {category.description}
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section
          style={{
            background: "var(--fw-surface)",
            clipPath: "polygon(0 72px, 100% 0, 100% 100%, 0 100%)",
            marginTop: "-72px",
            paddingTop: "calc(72px + 5rem)",
            paddingBottom: "5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <SectionLabel>Practice Area</SectionLabel>
                <h2
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fw-navy)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  }}
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
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
              >
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    href={`/services/${svc.slug}`}
                    className="group block rounded-2xl p-6 transition-all"
                    style={{
                      background: "white",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div
                      className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "var(--fw-blue-pale)", border: "1px solid var(--fw-blue-light)" }}
                    >
                      <ServiceIcon
                        name={svc.icon}
                        className="h-5 w-5"
                        style={{ color: "var(--fw-blue)" }}
                      />
                    </div>
                    <h3
                      className="mb-2 text-sm font-semibold leading-snug"
                      style={{ color: "var(--foreground)" }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="line-clamp-2 text-xs leading-relaxed"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {svc.shortDescription}
                    </p>
                    <div
                      className="mt-5 flex items-center gap-1 text-xs font-semibold"
                      style={{ color: "var(--fw-blue)" }}
                    >
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

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
