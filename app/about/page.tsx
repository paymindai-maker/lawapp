import Link from "next/link"
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CrossPageLinks } from "@/components/common/cross-page-links"
import { CONTACT_INFO, TEAM_MEMBERS } from "@/lib/data"
import { AboutNav } from "./about-nav"

export const revalidate = 3600

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata = {
  title: "About NexGen Associates LLP | CA + Legal Services in India",
  description:
    "NexGen Associates LLP is a full-service CA and legal advisory firm with 15+ years of expertise. Chartered Accountants, company secretaries, and legal professionals serving 1,200+ Indian businesses since 2010.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NexGen Associates LLP | Integrated CA + Legal Firm",
    description:
      "15+ years of practice. CAs, company secretaries, and legal professionals serving 1,200+ Indian businesses since 2010.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About NexGen Associates LLP",
    description:
      "15+ years. 1,200+ businesses. Integrated CA + legal practice serving India.",
  },
}

const WA_MSG = "Hi NEXGEN, I'd like to book a free 30-min consultation."
const WA_URL = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(WA_MSG)}`

// ─── Static content (server-rendered for SEO) ────────────────────────────────

const METRICS = [
  { val: "1,200+", label: "Clients served" },
  { val: "15+", label: "Years of practice" },
  { val: "₹500 Cr+", label: "Tax managed" },
  { val: "98%", label: "On-time filing rate" },
]

const WHY_US = [
  {
    title: "15+ years of proven expertise",
    body: "Founded in 2010, NexGen has guided 1,200+ businesses through India's evolving regulatory landscape. Our track record spans startups, SMEs, and listed companies.",
  },
  {
    title: "Deadline guarantee",
    body: "We have never missed a statutory filing deadline for a managed client. Proactive reminders, advance tax alerts, and GST due-date calendars keep you perpetually compliant.",
  },
  {
    title: "Integrated legal + CA practice",
    body: "Unlike single-discipline firms, NEXGEN combines qualified Advocates and Chartered Accountants under one roof — so your legal strategy and tax planning always work together.",
  },
  {
    title: "Flat-fee transparency",
    body: "Every engagement starts with a clear, itemized quote. No surprise billings, no per-call charges, no fine print. Government fees are passed through at actuals with receipts.",
  },
]

const PROCESS = [
  { num: "01", title: "Free consultation", body: "A 30-minute call to understand your legal, tax, or registration requirements — with no obligation." },
  { num: "02", title: "Scope & timeline", body: "Written proposal with fixed fees, exact deliverables, and a day-by-day completion timeline." },
  { num: "03", title: "Document collection", body: "Secure digital document submission — our team pre-checks every file before proceeding." },
  { num: "04", title: "Filing & liaison", body: "We handle all authority submissions, respond to queries, and track approvals on your behalf." },
  { num: "05", title: "Ongoing compliance", body: "Annual compliance calendars, renewal reminders, and a dedicated manager for all future needs." },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBento />
        <AboutNav />
        <FirmSection />
        <WhySection />
        <ProcessSection />
        <LeadershipSection />
        <FinalCta />
        <CrossPageLinks exclude="about" />
      </main>
      <Footer />
    </>
  )
}

// ─── Hero — Bento Split ──────────────────────────────────────────────────────

function HeroBento() {
  return (
    <section
      style={{
        background: "var(--fw-surface)",
        borderBottom: "1px solid var(--border)",
        paddingTop: "1.75rem",
        paddingBottom: "4.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative outline year */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "-8rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(16rem, 28vw, 28rem)",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "1.5px oklch(0.22 0.045 258 / 0.06)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        2010
      </span>

      <div
        className="relative mx-auto max-w-7xl px-6"
        style={{ zIndex: 1 }}
      >
        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "minmax(120px, auto)",
            gap: "1rem",
          }}
        >
          {/* Primary cell — h1 + subhead + CTAs */}
          <article className="col-span-6 md:[grid-column:1/5] md:[grid-row:1/3]">
            <div
              className="flex h-full flex-col justify-between"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "clamp(1.75rem, 3vw, 2.5rem)",
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fw-navy)",
                    fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.025em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Fifteen years.
                  <br />
                  Six service lines.
                  <br />
                  <span style={{ color: "var(--fw-accent)" }}>One partner.</span>
                </h1>
                <p
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "clamp(0.98rem, 1.2vw, 1.1rem)",
                    lineHeight: 1.55,
                    maxWidth: "52ch",
                  }}
                >
                  NexGen Associates LLP brings Chartered Accountants, company
                  secretaries, and legal professionals into a single integrated
                  practice — serving 1,200+ Indian businesses from our Noida
                  headquarters since 2010.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{
                    background: "var(--fw-accent)",
                    borderRadius: "3px",
                    letterSpacing: "0.02em",
                    boxShadow:
                      "0 10px 28px -8px oklch(0.55 0.22 258 / 0.45)",
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Book a 30-min consultation
                </a>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
                  style={{
                    color: "var(--fw-navy)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                  }}
                >
                  Browse services
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </article>

          {/* Stat — 1,200+ (dark) */}
          <article className="col-span-3 md:[grid-column:5/7] md:[grid-row:1/2]">
            <BentoStat
              val="1,200+"
              label="Clients served across India since 2010"
              tone="dark"
            />
          </article>

          {/* Custom law illustration cell */}
          <article className="col-span-3 md:[grid-column:5/7] md:[grid-row:2/3]">
            <LawIllustrationCard />
          </article>

          {/* Devanagari quote cell */}
          <article className="col-span-6 md:[grid-column:1/3] md:[grid-row:3/4]">
            <div
              className="flex h-full flex-col justify-between"
              style={{
                background: "var(--fw-navy)",
                color: "white",
                borderRadius: "6px",
                padding: "1.5rem 1.75rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                  lineHeight: 1.25,
                  color: "white",
                  letterSpacing: "0.005em",
                }}
              >
                हर फाइलिंग, हर केस — एक छत के नीचे.
              </p>
              <p
                className="mt-4 text-[10px] font-semibold uppercase"
                style={{
                  color: "oklch(0.72 0.03 258)",
                  letterSpacing: "0.22em",
                }}
              >
                Every filing, every case — one roof.
              </p>
            </div>
          </article>

          {/* Mission cell */}
          <article className="col-span-6 md:[grid-column:3/5] md:[grid-row:3/4]">
            <div
              className="flex h-full flex-col justify-between"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "1.5rem 1.75rem",
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase"
                style={{
                  color: "var(--muted-foreground)",
                  letterSpacing: "0.22em",
                }}
              >
                Our mission
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--fw-navy)" }}
              >
                Simplify legal, tax, and compliance for Indian businesses — with
                transparent pricing, guaranteed timelines, and zero missed
                deadlines.
              </p>
            </div>
          </article>

          {/* Location cell */}
          <article className="col-span-6 md:[grid-column:5/7] md:[grid-row:3/4]">
            <div
              className="flex h-full flex-col justify-between"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "1.5rem 1.75rem",
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase"
                style={{
                  color: "var(--muted-foreground)",
                  letterSpacing: "0.22em",
                }}
              >
                Headquartered in
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                    color: "var(--fw-navy)",
                    lineHeight: 1,
                  }}
                >
                  Noida<span style={{ color: "var(--fw-accent)" }}>.</span>
                </p>
                <MapPin
                  className="h-5 w-5"
                  style={{ color: "var(--fw-accent)" }}
                />
              </div>
              <p
                className="mt-3 text-[12px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                Uttar Pradesh, India · Mon–Sat, 9am–7pm IST
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function BentoStat({
  val,
  label,
  tone,
}: {
  val: string
  label: string
  tone: "dark" | "light"
}) {
  const dark = tone === "dark"
  return (
    <div
      className="flex h-full flex-col justify-between"
      style={{
        background: dark ? "var(--fw-navy)" : "var(--card)",
        color: dark ? "white" : "var(--fw-navy)",
        border: dark ? "1px solid var(--fw-navy)" : "1px solid var(--border)",
        borderRadius: "6px",
        padding: "1.5rem 1.75rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* outline echo of the value */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "-1rem",
          bottom: "-2rem",
          fontFamily: "var(--font-display)",
          fontSize: "9rem",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: dark
            ? "1.5px oklch(1 0 0 / 0.07)"
            : "1.5px oklch(0.22 0.045 258 / 0.06)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {val}
      </span>

      <p
        className="relative text-[10px] font-semibold uppercase"
        style={{
          color: dark ? "oklch(0.72 0.03 258)" : "var(--muted-foreground)",
          letterSpacing: "0.22em",
        }}
      >
        {dark ? "Trusted by" : "Built over"}
      </p>
      <div className="relative">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: dark ? "white" : "var(--fw-navy)",
          }}
        >
          {val}
        </p>
        <p
          className="mt-3 text-[13px] leading-relaxed"
          style={{
            color: dark ? "oklch(0.82 0.018 258)" : "var(--muted-foreground)",
            maxWidth: "20ch",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

// ─── Custom law illustration cell ────────────────────────────────────────────

function LawIllustrationCard() {
  return (
    <div
      className="law-illus-card group relative flex h-full flex-col justify-between overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "1.5rem 1.75rem",
        minHeight: "100%",
      }}
    >
      {/* Background grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <pattern
            id="law-grid"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 22 0 L 0 0 0 22"
              fill="none"
              stroke="oklch(0.22 0.045 258 / 0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#law-grid)" />
      </svg>

      {/* Kicker */}
      <p
        className="relative text-[10px] font-semibold uppercase"
        style={{
          color: "var(--muted-foreground)",
          letterSpacing: "0.22em",
        }}
      >
        Counsel · Compliance
      </p>

      {/* Custom SVG — scales + pillars + ledger lines */}
      <div className="relative flex flex-1 items-center justify-center py-3">
        <svg
          viewBox="0 0 220 170"
          width="100%"
          style={{ maxWidth: "260px", height: "auto", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Pillars (back) */}
          <g stroke="oklch(0.22 0.045 258 / 0.18)" strokeWidth="1.2" fill="none">
            <rect x="22" y="40" width="10" height="100" rx="1.5" />
            <rect x="188" y="40" width="10" height="100" rx="1.5" />
            {/* Capitals */}
            <rect x="18" y="34" width="18" height="6" rx="1" />
            <rect x="184" y="34" width="18" height="6" rx="1" />
            {/* Bases */}
            <rect x="16" y="140" width="22" height="6" rx="1" />
            <rect x="182" y="140" width="22" height="6" rx="1" />
          </g>

          {/* Ledger baseline */}
          <line
            x1="10"
            y1="152"
            x2="210"
            y2="152"
            stroke="var(--fw-navy)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="158"
            x2="180"
            y2="158"
            stroke="oklch(0.22 0.045 258 / 0.25)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Central post */}
          <line
            x1="110"
            y1="32"
            x2="110"
            y2="118"
            stroke="var(--fw-navy)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Post finial */}
          <circle cx="110" cy="28" r="4" fill="var(--fw-gold)" />
          <circle
            cx="110"
            cy="28"
            r="5.5"
            fill="none"
            stroke="var(--fw-navy)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Post base */}
          <path
            d="M 96 120 L 124 120 L 120 130 L 100 130 Z"
            fill="var(--fw-navy)"
          />

          {/* Cross beam */}
          <line
            x1="48"
            y1="50"
            x2="172"
            y2="50"
            stroke="var(--fw-navy)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Beam chains */}
          <line
            x1="62"
            y1="50"
            x2="62"
            y2="72"
            stroke="var(--fw-navy)"
            strokeWidth="1.2"
          />
          <line
            x1="158"
            y1="50"
            x2="158"
            y2="72"
            stroke="var(--fw-navy)"
            strokeWidth="1.2"
          />

          {/* Left pan (slightly lower) */}
          <g className="law-pan-left">
            <ellipse
              cx="62"
              cy="78"
              rx="22"
              ry="4"
              fill="var(--fw-navy)"
            />
            <path
              d="M 42 78 Q 62 96 82 78 Z"
              fill="none"
              stroke="var(--fw-navy)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line
              x1="48"
              y1="82"
              x2="76"
              y2="82"
              stroke="var(--fw-gold)"
              strokeWidth="1"
              opacity="0.7"
            />
          </g>

          {/* Right pan (slightly higher — balance) */}
          <g className="law-pan-right">
            <ellipse
              cx="158"
              cy="78"
              rx="22"
              ry="4"
              fill="var(--fw-navy)"
            />
            <path
              d="M 138 78 Q 158 96 178 78 Z"
              fill="none"
              stroke="var(--fw-navy)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line
              x1="144"
              y1="82"
              x2="172"
              y2="82"
              stroke="var(--fw-gold)"
              strokeWidth="1"
              opacity="0.7"
            />
          </g>

          {/* Accent dot — center hinge */}
          <circle cx="110" cy="50" r="3" fill="var(--fw-gold)" />
        </svg>
      </div>

      {/* Caption */}
      <div className="relative flex items-end justify-between gap-3">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "var(--fw-navy)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          Balanced advice<span style={{ color: "var(--fw-accent)" }}>.</span>
        </p>
        <p
          className="text-[10px] font-semibold uppercase"
          style={{
            color: "var(--muted-foreground)",
            letterSpacing: "0.18em",
          }}
        >
          CA + Legal
        </p>
      </div>

      <style>{`
        .law-pan-left { transform-origin: 62px 50px; transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1); }
        .law-pan-right { transform-origin: 158px 50px; transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1); }
        .law-illus-card:hover .law-pan-left { transform: translateY(-3px); }
        .law-illus-card:hover .law-pan-right { transform: translateY(3px); }
      `}</style>
    </div>
  )
}

// ─── Section 01 — The Firm ───────────────────────────────────────────────────

function FirmSection() {
  return (
    <Section id="firm" index={1} kicker="The Firm" tone="light">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <SectionH2>
            A full-service practice
            <br />
            built for the long arc.
          </SectionH2>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)", maxWidth: "44ch" }}
          >
            NEXGEN was founded in 2006 in Noida to serve a generation of Indian
            entrepreneurs who needed legal and financial counsel that grew with
            them — not vendors that disappeared after the invoice.
          </p>
        </header>

        <div className="lg:col-span-7">
          <div className="grid gap-10 sm:grid-cols-2">
            <PullBlock
              kicker="What we do"
              body="Business registration, business licensing, GST and income-tax compliance, mutual fund advisory, and courtroom representation — a single roof for every regulatory and commercial need."
            />
            <PullBlock
              kicker="Who we serve"
              body="From first-time founders incorporating their startup to listed companies fighting commercial disputes. 500+ businesses across India trust us with their compliance and counsel."
            />
            <PullBlock
              kicker="How we charge"
              body="Flat-fee proposals with itemized scope. Government fees passed at actuals with receipts. No per-call charges, no surprise bills, no fine print."
            />
            <PullBlock
              kicker="Why we exist"
              body="To make premium legal counsel accessible — without the opacity, jargon, or grandstanding of traditional law firms."
            />
          </div>

          {/* Metric strip */}
          <div
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-4"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
            }}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="p-5"
                style={{ background: "var(--card)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: "var(--fw-navy)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.val}
                </p>
                <p
                  className="mt-2 text-[11px] font-semibold uppercase"
                  style={{
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Section 02 — Why ────────────────────────────────────────────────────────

function WhySection() {
  return (
    <Section id="why" index={2} kicker="Why NEXGEN" tone="dark">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <SectionH2 inverse>
            Four reasons
            <br />
            500+ businesses
            <br />
            stay with us.
          </SectionH2>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "oklch(0.78 0.018 258)", maxWidth: "42ch" }}
          >
            What separates a transactional vendor from a firm you keep on
            retainer for a decade. We aim for the latter.
          </p>
        </header>

        <div className="lg:col-span-7">
          <ol className="flex flex-col">
            {WHY_US.map((item, i) => (
              <li
                key={item.title}
                className="grid items-start gap-5 py-7 md:grid-cols-[auto_1fr] md:gap-10"
                style={{
                  borderTop:
                    i === 0
                      ? "1px solid oklch(1 0 0 / 0.10)"
                      : "1px solid oklch(1 0 0 / 0.08)",
                  ...(i === WHY_US.length - 1
                    ? { borderBottom: "1px solid oklch(1 0 0 / 0.10)" }
                    : {}),
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: "var(--fw-accent)",
                    letterSpacing: "-0.02em",
                    minWidth: "3.5rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "white", fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "oklch(0.78 0.018 258)",
                      maxWidth: "60ch",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

// ─── Section 03 — Process ────────────────────────────────────────────────────

function ProcessSection() {
  return (
    <Section id="process" index={3} kicker="How We Work" tone="light">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <SectionH2>
            A clear, fully
            <br />
            managed engagement.
          </SectionH2>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)", maxWidth: "42ch" }}
          >
            From first call to ongoing compliance, every step is documented,
            quoted, and tracked. No surprises.
          </p>
        </header>

        <div className="lg:col-span-7">
          <ol className="flex flex-col">
            {PROCESS.map((step, i) => (
              <li
                key={step.num}
                className="grid items-baseline gap-6 py-7 md:grid-cols-[6rem_1fr] md:gap-10"
                style={{
                  borderTop:
                    i === 0 ? "1px solid var(--border)" : "1px solid var(--border)",
                  ...(i === PROCESS.length - 1
                    ? { borderBottom: "1px solid var(--border)" }
                    : {}),
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 3vw, 2.6rem)",
                    lineHeight: 1,
                    color: "var(--fw-accent)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.num}
                </span>
                <div>
                  <h3
                    className="mb-2 text-lg font-semibold"
                    style={{
                      color: "var(--fw-navy)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--muted-foreground)",
                      maxWidth: "60ch",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

// ─── Section 04 — Leadership ─────────────────────────────────────────────────

function LeadershipSection() {
  return (
    <Section id="leadership" index={4} kicker="Leadership" tone="light-alt">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <SectionH2>
            Senior counsel.
            <br />
            Direct access.
          </SectionH2>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)", maxWidth: "44ch" }}
          >
            You speak with the partner working on your matter — not a layer of
            associates. Every engagement is owned end-to-end by a senior
            practitioner.
          </p>
        </header>

        <div className="lg:col-span-7">
          <ul
            className="grid gap-px overflow-hidden sm:grid-cols-2"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
            }}
          >
            {TEAM_MEMBERS.map((m) => (
              <li
                key={m.name}
                className="flex flex-col gap-4 p-6"
                style={{ background: "var(--card)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-sm font-bold text-white"
                    style={{
                      background: "var(--fw-navy)",
                      borderRadius: "3px",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--fw-navy)" }}
                    >
                      {m.name}
                    </p>
                    <p
                      className="text-[11px] font-semibold uppercase"
                      style={{
                        color: "var(--fw-accent)",
                        letterSpacing: "0.14em",
                      }}
                    >
                      {m.title}
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {m.bio}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <section
      style={{
        background: "var(--fw-navy)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        borderTop: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p
          className="mb-4 text-[11px] font-semibold uppercase"
          style={{ color: "var(--fw-accent)", letterSpacing: "0.22em" }}
        >
          Next Step
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "white",
            fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}
        >
          Ready to speak with a partner?
        </h2>
        <p
          className="mx-auto mb-9 max-w-[52ch] text-base leading-relaxed"
          style={{ color: "oklch(0.78 0.018 258)" }}
        >
          Free 30-minute consultation on business registration, GST, income
          tax, litigation, or mutual fund advisory. We reply within one
          business day.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--fw-accent)",
              color: "white",
              borderRadius: "3px",
              letterSpacing: "0.02em",
              boxShadow: "0 14px 32px -8px oklch(0.55 0.22 258 / 0.55)",
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Book on WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            style={{
              color: "white",
              border: "1px solid oklch(1 0 0 / 0.22)",
              borderRadius: "3px",
            }}
          >
            Send a brief
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p
          className="mt-6 text-xs"
          style={{ color: "oklch(0.62 0.03 258)" }}
        >
          {CONTACT_INFO.email} · {CONTACT_INFO.phone}
        </p>
      </div>
    </section>
  )
}

// ─── Shared primitives ───────────────────────────────────────────────────────

function Section({
  id,
  index,
  kicker,
  tone,
  children,
}: {
  id: string
  index: number
  kicker: string
  tone: "light" | "light-alt" | "dark"
  children: React.ReactNode
}) {
  const isDark = tone === "dark"
  const bg =
    tone === "dark"
      ? "var(--fw-navy)"
      : tone === "light-alt"
      ? "oklch(0.97 0.008 258)"
      : "var(--background)"

  return (
    <section
      id={id}
      style={{
        background: bg,
        paddingTop: "6rem",
        paddingBottom: "6rem",
        scrollMarginTop: "8rem",
        borderTop: tone === "light" ? "1px solid var(--border)" : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-center gap-4">
          <span
            className="font-semibold tabular-nums"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.95rem",
              color: isDark ? "var(--fw-accent)" : "var(--fw-accent)",
              letterSpacing: "0.06em",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <span
            className="inline-block h-px flex-1 max-w-[3.5rem]"
            style={{
              background: isDark ? "oklch(1 0 0 / 0.15)" : "var(--border)",
            }}
          />
          <p
            className="text-[11px] font-semibold uppercase"
            style={{
              color: isDark
                ? "oklch(0.78 0.018 258)"
                : "var(--muted-foreground)",
              letterSpacing: "0.22em",
            }}
          >
            {kicker}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

function SectionH2({
  children,
  inverse = false,
}: {
  children: React.ReactNode
  inverse?: boolean
}) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        color: inverse ? "white" : "var(--fw-navy)",
        fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.022em",
        maxWidth: "22ch",
      }}
    >
      {children}
    </h2>
  )
}

function PullBlock({ kicker, body }: { kicker: string; body: string }) {
  return (
    <div>
      <p
        className="mb-2 text-[10px] font-semibold uppercase"
        style={{
          color: "var(--fw-accent)",
          letterSpacing: "0.22em",
        }}
      >
        {kicker}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--fw-navy)" }}
      >
        {body}
      </p>
    </div>
  )
}
