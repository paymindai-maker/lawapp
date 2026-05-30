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
import {
  getServiceBySlug,
  getCategoryBySlug,
  getCategoryById,
  getRelatedServices,
  getServicesByCategory,
  getAllServiceSlugs,
} from "@/lib/firestore/services"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"
import { RuleDivider } from "@/components/common/shape-divider"
import { FaqAccordion } from "./_components/faq-accordion"

export const revalidate = 3600

// ─── Static params (ISR) ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

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

  const hasBenefits = (service.benefits?.length ?? 0) > 0 || (service.eligibility?.length ?? 0) > 0
  const hasProcess = (service.processSteps?.length ?? 0) > 0

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <HeroSection service={service} category={category} />

        {/* ── Benefits + Eligibility ── */}
        {hasBenefits && (
          <>
            <RuleDivider />
            <BenefitsSection service={service} />
          </>
        )}

        {/* ── Process ── */}
        {hasProcess && (
          <>
            <RuleDivider />
            <ProcessSection service={service} />
          </>
        )}

        {/* ── Documents ── */}
        {hasDocuments && (
          <>
            <RuleDivider />
            <DocumentsSection service={service} />
          </>
        )}

        {/* ── FAQs ── */}
        {hasFaqs && (
          <>
            <RuleDivider />
            <FaqSection service={service} />
          </>
        )}

        {/* ── Why Choose Us ── */}
        {hasWhyUs && (
          <>
            <RuleDivider />
            <WhyUsSection service={service} />
          </>
        )}

        {/* ── Related services ── */}
        {hasRelated && (
          <>
            <RuleDivider />
            <RelatedSection services={relatedServices} />
          </>
        )}

        <ContactSection variant="inner" />
      </main>
      <Footer />
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({
  service,
  category,
}: {
  service: ServiceDoc
  category: ServiceCategoryDoc | null
}) {
  const facts: { icon: LucideIcon; label: string; value: string }[] = []
  if (service.quickInfo?.timeline) facts.push({ icon: Clock, label: "Typical timeline", value: service.quickInfo.timeline })
  if (service.quickInfo?.consultation) facts.push({ icon: MessageSquare, label: "Consultation", value: service.quickInfo.consultation })
  if (service.quickInfo?.startingPrice) facts.push({ icon: DollarSign, label: "Starting fee", value: service.quickInfo.startingPrice })

  const hasImage = !!service.featuredImage

  return (
    <section style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 py-5 text-[11px] font-medium"
          style={{ borderBottom: "1px solid var(--border)" }}
          aria-label="Breadcrumb"
        >
          <Link href="/services" style={{ color: "var(--fw-blue)" }}>Services</Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
              <Link href={`/services/${category.slug}`} style={{ color: "var(--fw-blue)" }}>
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
          <span style={{ color: "var(--foreground)" }}>{service.title}</span>
        </nav>

        {/* Split: content left, image OR facts right */}
        <div className={`grid gap-0 py-14 md:gap-14 md:py-20 ${hasImage ? "md:grid-cols-2" : "md:grid-cols-12"}`}>
          {/* Left — content */}
          <div className={hasImage ? "" : "md:col-span-7"}>
            {category && (
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                  {category.name}
                </span>
              </div>
            )}

            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(2.3rem, 4.5vw, 3.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              {service.hero?.heading || service.title}
            </h1>

            {service.hero?.subheading && (
              <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "52ch" }}>
                {service.hero.subheading}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all"
                style={{ background: "var(--fw-navy)", borderRadius: "3px" }}
              >
                {service.hero?.ctaText || "Book a consultation"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#process" className="text-sm font-semibold" style={{ color: "var(--fw-blue)" }}>
                See how we work
              </a>
            </div>

            {/* Inline facts — only when image takes the right col */}
            {hasImage && facts.length > 0 && (
              <dl className="mt-10 flex flex-col divide-y" style={{ borderTop: "1px solid var(--border)", borderColor: "var(--border)" }}>
                {facts.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.label} className="flex items-center justify-between py-3">
                      <dt className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
                        <Icon className="h-3.5 w-3.5" style={{ color: "var(--fw-gold)" }} />
                        {f.label}
                      </dt>
                      <dd className="text-sm font-semibold" style={{ color: "var(--fw-navy)" }}>{f.value}</dd>
                    </div>
                  )
                })}
              </dl>
            )}
          </div>

          {/* Right — image OR facts panel */}
          {hasImage ? (
            <div className="mt-10 md:mt-0">
              <div
                className="relative h-full min-h-[320px] overflow-hidden"
                style={{ border: "1px solid var(--border)", borderRadius: "3px" }}
              >
                <Image src={service.featuredImage!} alt={service.title} fill className="object-cover" priority />
              </div>
            </div>
          ) : facts.length > 0 ? (
            <div className="mt-12 md:col-span-5 md:mt-0">
              <div className="p-7" style={{ background: "oklch(0.97 0.008 258)", border: "1px solid var(--border)", borderRadius: "3px" }}>
                <p className="mb-6 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                  Engagement details
                </p>
                <dl>
                  {facts.map((f, i) => {
                    const Icon = f.icon
                    return (
                      <div
                        key={f.label}
                        className="flex items-start justify-between gap-4 py-4"
                        style={i > 0 ? { borderTop: "1px solid var(--border)" } : undefined}
                      >
                        <dt className="flex items-center gap-2.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                          <Icon className="h-3.5 w-3.5" style={{ color: "var(--fw-gold)" }} />
                          {f.label}
                        </dt>
                        <dd className="text-right text-sm font-semibold" style={{ color: "var(--fw-navy)" }}>{f.value}</dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

// ─── Benefits + Eligibility ───────────────────────────────────────────────────

function BenefitsSection({ service }: { service: ServiceDoc }) {
  const benefits = service.benefits ?? []
  const eligibility = service.eligibility ?? []

  return (
    <section
      style={{
        background: "var(--fw-surface)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
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
              className="p-8"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "3px",
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
              className="p-8"
              style={{
                background: "var(--fw-blue-pale)",
                border: "1px solid var(--border)",
                borderRadius: "3px",
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
                      className="flex h-5 w-5 shrink-0 items-center justify-center text-[10px] font-bold"
                      style={{
                        background: "var(--fw-gold)",
                        color: "white",
                        marginTop: "1px",
                        borderRadius: "2px",
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

function ProcessSection({ service }: { service: ServiceDoc }) {
  const steps = service.processSteps ?? []

  return (
    <section
      id="process"
      style={{
        background: "oklch(0.97 0.008 258)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        scrollMarginTop: "4rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Our Approach</SectionLabel>
        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fw-navy)",
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
              className="group relative p-6 transition-colors"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "3px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  lineHeight: 1,
                  color: "oklch(0.91 0.012 258)",
                  display: "block",
                  marginBottom: "0.75rem",
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
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

function DocumentsSection({ service }: { service: ServiceDoc }) {
  const docs = service.requiredDocuments ?? []

  return (
    <section
      style={{
        background: "var(--fw-surface)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
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
              className="flex items-center gap-3 px-4 py-3.5"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
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

function FaqSection({ service }: { service: ServiceDoc }) {
  const faqs = service.faqs ?? []

  return (
    <section
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionLabel>Common Questions</SectionLabel>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.15,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Have more questions? We&apos;re here to help.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--fw-blue)" }}
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

function WhyUsSection({ service }: { service: ServiceDoc }) {
  const reasons = service.whyChooseUs ?? []

  return (
    <section
      style={{
        background: "oklch(0.97 0.008 258)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[300px_1fr]">
          {/* Left — sticky label */}
          <div>
            <SectionLabel>Our Advantage</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.15,
              }}
            >
              Why choose NEXGEN
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Every engagement is backed by 18+ years of practice, fixed-fee transparency, and a team that handles both legal and CA work in-house.
            </p>
          </div>

          {/* Right — vertical numbered guide */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="flex gap-8 py-7"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.25rem",
                    lineHeight: 1,
                    color: "oklch(0.88 0.014 258)",
                    flexShrink: 0,
                    width: "3rem",
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Related Services ─────────────────────────────────────────────────────────

function RelatedSection({ services }: { services: ServiceDoc[] }) {
  return (
    <section
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <SectionLabel>Explore More</SectionLabel>
            <h2
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
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
            style={{ color: "var(--fw-blue)" }}
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
              className="group block p-5 transition-colors"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "3px",
              }}
            >
              <ServiceIcon
                name={svc.icon}
                className="mb-4 h-5 w-5"
                style={{ color: "var(--fw-blue)" }}
              />
              <p className="mb-2 text-sm font-semibold leading-snug" style={{ color: "var(--fw-navy)" }}>
                {svc.title}
              </p>
              <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {svc.shortDescription}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: "var(--fw-blue)" }}>
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
      <main>
        {/* Hero */}
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <nav className="mb-5 flex items-center gap-2 text-xs font-medium">
              <Link href="/services" style={{ color: "var(--fw-blue)" }}>Services</Link>
              <ChevronRight className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
              <span style={{ color: "var(--foreground)" }}>{category.name}</span>
            </nav>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                Practice Area
              </span>
            </div>
            <h1
              className="mb-4 max-w-3xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)", fontSize: "clamp(2.25rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
            >
              {category.name}
            </h1>
            <p className="max-w-[58ch] text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {category.description}
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section
          style={{
            background: "var(--background)",
            borderTop: "1px solid var(--border)",
            paddingTop: "5rem",
            paddingBottom: "5rem",
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
                    className="group block p-6 transition-colors"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                    }}
                  >
                    <ServiceIcon
                      name={svc.icon}
                      className="mb-5 h-5 w-5"
                      style={{ color: "var(--fw-blue)" }}
                    />
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

        <ContactSection variant="inner" />
      </main>
      <Footer />
    </>
  )
}
