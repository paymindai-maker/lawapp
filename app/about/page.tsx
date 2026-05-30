import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FIRM_INFO, CONTACT_INFO } from "@/lib/data"
import { AboutTabs } from "./about-tabs"

export const revalidate = 3600

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata = {
  title: "About NEXGEN | Legal, Tax & Compliance Firm in Mumbai, India",
  description:
    "NEXGEN is a full-service legal and compliance firm in Mumbai with 18+ years of expertise in business registration, GST, income tax, litigation, and corporate advisory. Trusted by 500+ clients.",
}

const VALID_TABS = ["firm", "why", "process", "team"] as const
type TabId = (typeof VALID_TABS)[number]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const initialTab: TabId = VALID_TABS.includes(tab as TabId) ? (tab as TabId) : "firm"

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "3.5rem", paddingBottom: "2.5rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--fw-gold)" }}>
              About · {FIRM_INFO.city} · Est. {FIRM_INFO.established}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fw-navy)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
                lineHeight: 1.1,
                maxWidth: "18ch",
              }}
            >
              The firm behind your legal &amp; tax counsel
            </h1>
          </div>
        </section>

        {/* ── Tabbed content ── */}
        <div style={{ background: "var(--fw-surface)" }}>
          <AboutTabs initialTab={initialTab} />
        </div>

        {/* ── Final CTA ── */}
        <section style={{ background: "var(--fw-navy)", paddingTop: "5rem", paddingBottom: "6rem" }}>
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
            <p className="mx-auto mb-8 max-w-[48ch] text-sm leading-relaxed" style={{ color: "oklch(0.58 0.055 255)" }}>
              Book a free 30-minute consultation on business registration, GST compliance, income
              tax, litigation, or mutual fund advisory. Response within one business day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--fw-blue)", color: "white", borderRadius: "3px" }}
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT_INFO.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                style={{ border: "1px solid oklch(0.34 0.07 255)", color: "oklch(0.72 0.05 255)", borderRadius: "3px" }}
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
