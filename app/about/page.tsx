import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ServiceCard } from "@/components/common/service-card"
import { FIRM_INFO, CONTACT_INFO } from "@/lib/data"
import { getFeaturedServices } from "@/lib/firestore/services"
import type { ServiceDoc } from "@/types"

export const revalidate = 3600

const SERVICES_TOTAL = 5

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata = {
  title: "About NEXGEN | Legal, Tax & Compliance Firm in Mumbai, India",
  description:
    "NEXGEN is a full-service legal and compliance firm in Mumbai with 18+ years of expertise in business registration, GST, income tax, litigation, and corporate advisory. Trusted by 500+ clients.",
}

// ─── Static content ───────────────────────────────────────────────────────────

const WHY_US = [
  {
    title: "18+ Years of Proven Expertise",
    body: "Founded in 2006, NEXGEN has guided 500+ businesses through India's evolving legal and tax landscape. Our track record spans startups, SMEs, and listed companies.",
  },
  {
    title: "Deadline Guarantee",
    body: "We have never missed a statutory filing deadline for a managed client. Proactive reminders, advance tax alerts, and GST due date calendars keep you perpetually compliant.",
  },
  {
    title: "Integrated Legal + CA Practice",
    body: "Unlike single-discipline firms, NEXGEN combines qualified Advocates and Chartered Accountants under one roof — so your legal strategy and tax planning always work together.",
  },
  {
    title: "Flat-Fee Transparency",
    body: "Every engagement starts with a clear, itemized quote. No surprise billings, no per-call charges, no fine print. Government fees are always passed through at actuals with receipts.",
  },
]

const PROCESS = [
  {
    num: "01",
    title: "Free Consultation",
    body: "30-minute call to understand your legal, tax, or registration requirements — with no obligation.",
  },
  {
    num: "02",
    title: "Scope & Timeline",
    body: "Written proposal with fixed fees, exact deliverables, and a day-by-day completion timeline.",
  },
  {
    num: "03",
    title: "Document Collection",
    body: "Secure digital document submission — our team pre-checks every file before proceeding.",
  },
  {
    num: "04",
    title: "Filing & Liaison",
    body: "We handle all authority submissions, respond to queries, and track approvals on your behalf.",
  },
  {
    num: "05",
    title: "Ongoing Compliance",
    body: "Annual compliance calendars, renewal reminders, and a dedicated manager for all future needs.",
  },
]

const METRICS = [
  { val: "500+", label: "Businesses Served" },
  { val: "18+", label: "Years of Practice" },
  { val: "5", label: "Practice Areas" },
  { val: "98%", label: "Client Satisfaction" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const services = await getFeaturedServices(SERVICES_TOTAL)
  const slots = Array.from({ length: SERVICES_TOTAL }, (_, i) => services[i] ?? null)

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
                India&apos;s Trusted Legal, Tax &amp; Compliance Partner for Growing Businesses
              </h1>
              <p
                className="mt-5 max-w-[52ch] text-base leading-relaxed"
                style={{ color: "oklch(0.60 0.05 255)" }}
              >
                From company incorporation and business licensing to GST compliance, income tax filing, mutual fund advisory, and commercial litigation — NEXGEN delivers expert legal and financial services under one roof.
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
                  Full-Service Legal &amp; Financial Advisory Since {FIRM_INFO.established}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "55ch" }}>
                  NEXGEN is a Mumbai-based legal and compliance firm that has served 500+
                  businesses across India since 2006. Our integrated team of qualified Advocates
                  and Chartered Accountants covers every compliance need your business faces —
                  from first registration to complex commercial litigation.
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "55ch" }}>
                  We specialize in business registration, business licensing, GST and income tax
                  compliance, mutual fund advisory, and courtroom representation — making
                  premium legal counsel accessible to businesses at every stage of growth.
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
                    To simplify legal, tax, and compliance for Indian businesses — delivering
                    expert Advocate and CA services with transparent pricing, guaranteed
                    timelines, and zero missed deadlines.
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
                    To be India&apos;s most trusted integrated legal and financial advisory firm —
                    where every business, from a first-time founder to a seasoned enterprise,
                    gets counsel that is rigorous, honest, and built for their growth.
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
                Why 500+ businesses choose NEXGEN
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
                Our process — clear, fast, and fully managed
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
              Ready to speak with a legal or tax expert?
            </h2>
            <p
              className="mx-auto mb-8 max-w-[48ch] text-sm leading-relaxed"
              style={{ color: "oklch(0.58 0.055 255)" }}
            >
              Book a free 30-minute consultation on business registration, GST compliance,
              income tax, litigation, or mutual fund advisory. Response within one business day.
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
