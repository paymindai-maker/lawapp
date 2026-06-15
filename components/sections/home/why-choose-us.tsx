import { FadeIn } from "@/components/common/fade-in"
import { ParallaxDrift } from "@/components/common/parallax"
import { SectionLabel } from "@/components/common/section-label"

const REASONS = [
  {
    num: "01",
    title: "Integrated CA + legal under one roof",
    desc: "No more coordinating between your accountant and lawyer. Our teams work together so filings, contracts, and compliance stay aligned — with no costly gaps between financial and legal advice.",
  },
  {
    num: "02",
    title: "Zero missed deadlines",
    desc: "Our proprietary compliance calendar tracks every due date for every client. We send reminders and file on time, every time — 98% on-time filing rate across 1,200+ active clients.",
  },
  {
    num: "03",
    title: "Transparent, fixed pricing",
    desc: "No surprise billing. Pricing is clear, predictable, and tailored to your business. You know exactly what you're paying for and exactly what you receive.",
  },
  {
    num: "04",
    title: "Pan-India and NRI coverage",
    desc: "Offices across 6 cities with remote client handling nationwide. We also serve NRIs and foreign companies entering India — FEMA, transfer pricing, and international tax advisory included.",
  },
]

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="relative"
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-5 md:gap-20">
          {/* Left — large editorial statement */}
          <FadeIn direction="left" className="md:col-span-2">
          <ParallaxDrift offset={20} className="flex flex-col justify-center gap-8">
            <SectionLabel>Why NexGen</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                color: "var(--foreground)",
                lineHeight: 1.08,
              }}
            >
              Big-4 rigor.
              <br />
              Boutique
              <br />
              <span style={{ color: "var(--fw-blue)" }}>attention.</span>
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)", maxWidth: "30ch" }}
            >
              You get a dedicated relationship manager — not a ticket number.
              One firm covers every CA and legal need a growing Indian business
              will encounter.
            </p>
            <div className="h-px w-16" style={{ background: "var(--fw-gold)" }} />
          </ParallaxDrift>
          </FadeIn>

          {/* Right — numbered reasons */}
          <div className="flex flex-col justify-center gap-0 md:col-span-3">
            {REASONS.map((r, i) => (
              <FadeIn key={r.num} delay={i * 100}>
              <div
                key={r.num}
                className="flex gap-6 py-8"
                style={{
                  borderBottom: i < REASONS.length - 1 ? "1px solid var(--border)" : undefined,
                }}
              >
                <span
                  className="shrink-0 pt-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: "var(--fw-blue-pale)",
                    lineHeight: 1,
                    WebkitTextStroke: "1.5px var(--fw-blue)",
                  }}
                >
                  {r.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)", fontWeight: 700 }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {r.desc}
                  </p>
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
