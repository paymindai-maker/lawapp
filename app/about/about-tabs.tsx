"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TEAM_MEMBERS, FIRM_INFO } from "@/lib/data"

// ─── Tab content data ──────────────────────────────────────────────────────

const METRICS = [
  { val: "500+", label: "Businesses Served" },
  { val: "18+", label: "Years of Practice" },
  { val: "5", label: "Practice Areas" },
  { val: "98%", label: "Client Satisfaction" },
]

const WHY_US = [
  {
    title: "18+ Years of Proven Expertise",
    body: "Founded in 2006, NEXGEN has guided 500+ businesses through India's evolving legal and tax landscape. Our track record spans startups, SMEs, and listed companies.",
  },
  {
    title: "Deadline Guarantee",
    body: "We have never missed a statutory filing deadline for a managed client. Proactive reminders, advance tax alerts, and GST due-date calendars keep you perpetually compliant.",
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
  { num: "01", title: "Free Consultation", body: "A 30-minute call to understand your legal, tax, or registration requirements — with no obligation." },
  { num: "02", title: "Scope & Timeline", body: "Written proposal with fixed fees, exact deliverables, and a day-by-day completion timeline." },
  { num: "03", title: "Document Collection", body: "Secure digital document submission — our team pre-checks every file before proceeding." },
  { num: "04", title: "Filing & Liaison", body: "We handle all authority submissions, respond to queries, and track approvals on your behalf." },
  { num: "05", title: "Ongoing Compliance", body: "Annual compliance calendars, renewal reminders, and a dedicated manager for all future needs." },
]

const TABS = [
  { id: "firm", label: "Our Firm" },
  { id: "why", label: "Why NEXGEN" },
  { id: "process", label: "How We Work" },
  { id: "team", label: "Leadership" },
] as const

type TabId = (typeof TABS)[number]["id"]

// ─── Component ───────────────────────────────────────────────────────────────

export function AboutTabs({ initialTab }: { initialTab: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab)

  const select = useCallback((id: TabId) => {
    setTab(id)
    window.history.replaceState(null, "", `/about?tab=${id}`)
  }, [])

  return (
    <>
      {/* Tab bar — sticky beneath navbar */}
      <div
        className="sticky z-40"
        style={{
          top: "64px",
          background: "color-mix(in oklch, var(--fw-surface) 88%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto md:gap-2">
            {TABS.map((t, i) => {
              const active = t.id === tab
              return (
                <button
                  key={t.id}
                  onClick={() => select(t.id)}
                  className="relative shrink-0 px-4 py-4 text-sm transition-colors"
                  style={{
                    color: active ? "var(--fw-navy)" : "var(--muted-foreground)",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  <span
                    className="mr-2 text-[11px] tabular-nums"
                    style={{ color: active ? "var(--fw-blue)" : "var(--muted-foreground)", opacity: 0.7 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.label}
                  {active && (
                    <span
                      className="absolute inset-x-3 bottom-0 h-[2px]"
                      style={{ background: "var(--fw-blue)" }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Panels */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {tab === "firm" && <FirmPanel />}
        {tab === "why" && <WhyPanel />}
        {tab === "process" && <ProcessPanel />}
        {tab === "team" && <TeamPanel />}
      </div>
    </>
  )
}

// ─── Panels ──────────────────────────────────────────────────────────────────

function PanelHeading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--fw-blue)" }}>
        {kicker}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--foreground)",
          fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
          lineHeight: 1.08,
          maxWidth: "20ch",
        }}
      >
        {children}
      </h2>
    </div>
  )
}

function FirmPanel() {
  return (
    <div className="animate-reveal-fade">
      <PanelHeading kicker="Our Firm">
        Full-service legal &amp; financial advisory since {FIRM_INFO.established}
      </PanelHeading>

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div className="flex flex-col gap-5">
          <p className="leading-relaxed" style={{ color: "var(--foreground)", maxWidth: "60ch", fontSize: "1.05rem" }}>
            NEXGEN is a Mumbai-based legal and compliance firm that has served 500+ businesses
            across India since 2006. Our integrated team of qualified Advocates and Chartered
            Accountants covers every compliance need your business faces — from first registration
            to complex commercial litigation.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "60ch" }}>
            We specialise in business registration, business licensing, GST and income-tax
            compliance, mutual fund advisory, and courtroom representation — making premium legal
            counsel accessible to businesses at every stage of growth.
          </p>

          <div className="mt-4 grid gap-8 border-t pt-8 sm:grid-cols-2" style={{ borderColor: "var(--border)" }}>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--muted-foreground)" }}>
                Mission
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                To simplify legal, tax, and compliance for Indian businesses — delivering expert
                Advocate and CA services with transparent pricing, guaranteed timelines, and zero
                missed deadlines.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--muted-foreground)" }}>
                Vision
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                To be India&apos;s most trusted integrated legal and financial advisory firm — where
                every business, from a first-time founder to a seasoned enterprise, gets counsel
                that is rigorous, honest, and built for their growth.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div
          className="grid grid-cols-2 gap-px self-start overflow-hidden"
          style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "4px" }}
        >
          {METRICS.map((m) => (
            <div key={m.label} className="p-6" style={{ background: "var(--card)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--foreground)", lineHeight: 1 }}>
                {m.val}
              </p>
              <p className="mt-2 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WhyPanel() {
  return (
    <div className="animate-reveal-fade">
      <PanelHeading kicker="Why NEXGEN">Why 500+ businesses choose us</PanelHeading>

      <div className="grid gap-px overflow-hidden sm:grid-cols-2" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "4px" }}>
        {WHY_US.map(({ title, body }, i) => (
          <div key={title} className="flex flex-col gap-2 p-8" style={{ background: "var(--card)" }}>
            <span className="text-[11px] font-bold tabular-nums" style={{ color: "var(--fw-blue)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
              {title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessPanel() {
  return (
    <div className="animate-reveal-fade">
      <PanelHeading kicker="How We Work">A clear, fully managed engagement</PanelHeading>

      <div className="flex flex-col">
        {PROCESS.map((step, i) => (
          <div
            key={step.num}
            className="grid items-start gap-5 py-7 md:grid-cols-[auto_1fr] md:gap-10"
            style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}
          >
            <div className="flex items-baseline gap-4 md:w-48">
              <span
                style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", lineHeight: 1, color: "var(--fw-blue)" }}
              >
                {step.num}
              </span>
            </div>
            <div className="max-w-[60ch] md:pt-2">
              <h3 className="mb-1.5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--fw-navy)", borderRadius: "3px" }}
        >
          Start with a free consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function TeamPanel() {
  return (
    <div className="animate-reveal-fade">
      <PanelHeading kicker="Leadership">The people behind your counsel</PanelHeading>

      <div className="grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "4px" }}>
        {TEAM_MEMBERS.map((m) => (
          <div key={m.name} className="flex flex-col gap-4 p-7" style={{ background: "var(--card)" }}>
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center text-sm font-bold text-white"
                style={{ background: "var(--fw-navy)", borderRadius: "3px", fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
              >
                {m.initials}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {m.name}
                </p>
                <p className="text-xs font-medium" style={{ color: "var(--fw-blue)" }}>
                  {m.title}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {m.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
