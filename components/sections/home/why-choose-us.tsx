import { SectionLabel } from "@/components/common/section-label"
import { CrosshatchBg, FloatingShape } from "@/components/common/orb-bg"
import { DiagonalDivider } from "@/components/common/shape-divider"

const REASONS = [
  {
    num: "01",
    title: "Clear Communication",
    desc: "We keep you informed at every step, ensuring transparency and confidence throughout the entire legal process.",
  },
  {
    num: "02",
    title: "Proven Success",
    desc: "500+ cases resolved across practice areas. A consistent track record of delivering favorable outcomes.",
  },
  {
    num: "03",
    title: "Committed to Results",
    desc: "Your business is our priority. We work tirelessly to protect your rights and deliver the outcomes you deserve.",
  },
]

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-surface)",
        clipPath: "polygon(0 72px, 100% 0, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        zIndex: 4,
      }}
    >
      <CrosshatchBg opacity={0.06} />
      <FloatingShape
        size={160}
        top="15%"
        right="5%"
        opacity={0.09}
        animationClass="animate-shape-float-mid"
        sides={5}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-5 md:gap-20">
          {/* Left — large editorial statement */}
          <div className="flex flex-col justify-center gap-8 md:col-span-2">
            <SectionLabel>Our Approach</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                color: "var(--foreground)",
                lineHeight: 1.08,
              }}
            >
              Built for
              <br />
              business.
              <br />
              Built to
              <br />
              <span style={{ color: "var(--fw-blue)" }}>win.</span>
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)", maxWidth: "30ch" }}
            >
              NEXGEN has operated from Mumbai&rsquo;s BKC since 2006. Our multidiscipline
              team covers every legal need a growing Indian business will encounter.
            </p>
            <div className="h-px w-16" style={{ background: "var(--fw-gold)" }} />
          </div>

          {/* Right — numbered reasons */}
          <div className="flex flex-col justify-center gap-0 md:col-span-3">
            {REASONS.map((r, i) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Diagonal into dark team section */}
      <DiagonalDivider fill="var(--fw-navy)" direction="right" height={72} />
    </section>
  )
}
