import { Scale, ArrowRight } from "lucide-react"
import { CrosshatchBg, FloatingShape } from "@/components/common/orb-bg"
import { WaveDivider } from "@/components/common/shape-divider"
import { FIRM_INFO } from "@/lib/data"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-surface)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CrosshatchBg opacity={0.028} />

      <FloatingShape
        size={160}
        top="10%"
        right="4%"
        opacity={0.045}
        animationClass="animate-shape-float-slow"
        sides={6}
      />
      <FloatingShape
        size={100}
        bottom="30%"
        left="2%"
        opacity={0.035}
        animationClass="animate-shape-float"
        sides={3}
      />

      <div
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 md:py-20"
      >
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-6 shrink-0" style={{ background: "var(--fw-gold)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--fw-gold)" }}
          >
            Est. {FIRM_INFO.established} &middot; {FIRM_INFO.city}
          </span>
        </div>

        {/* Bento grid — equal columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">

          {/* Left card — heading + body + CTAs */}
          <div
            className="flex flex-col justify-between gap-8 rounded-2xl p-8 md:p-10"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex flex-col gap-5">
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                }}
              >
                Legal counsel for India&rsquo;s businesses.
              </h1>

              <p
                className="max-w-[48ch] text-base leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {FIRM_INFO.tagline} Corporate law, GST compliance, trademark
                registration, and startup legal — delivered with precision.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 rounded-sm px-7 py-3 text-sm font-semibold tracking-wide text-white"
                style={{ background: "var(--fw-navy)", letterSpacing: "0.04em" }}
              >
                Start your matter
              </a>
              <a
                href="/team"
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--fw-blue)" }}
              >
                Meet the attorneys
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right bento — 2 rows */}
          <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-4">

            {/* Row 1 left — identity */}
            <div
              className="flex flex-col justify-between rounded-xl p-5"
              style={{ background: "var(--fw-navy)" }}
            >
              <Scale className="h-8 w-8 mb-4" style={{ color: "var(--fw-blue-mid)" }} />
              <div>
                <p
                  className="mb-0.5 text-lg leading-none"
                  style={{ fontFamily: "var(--font-display)", color: "white" }}
                >
                  ForLaw
                </p>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "oklch(0.44 0.055 255)" }}
                >
                  Legal Counsel
                </p>
              </div>
            </div>

            {/* Row 1 right — motto */}
            <div
              className="flex items-end rounded-xl p-5"
              style={{ background: "var(--fw-navy-mid)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Justice.
                <br />
                Integrity.
                <br />
                Advocacy.
              </p>
            </div>

            {/* Row 2 — wide card with established + CTA */}
            <div
              className="col-span-2 flex items-center justify-between rounded-xl px-6 py-5"
              style={{ background: "var(--fw-navy)", borderTop: "3px solid var(--fw-gold)" }}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--fw-gold)" }}
                >
                  Founded {FIRM_INFO.established}
                </p>
                <p
                  className="mt-0.5 text-sm"
                  style={{ color: "oklch(0.52 0.055 255)" }}
                >
                  {FIRM_INFO.city}
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-90"
                style={{ background: "var(--fw-blue)", letterSpacing: "0.04em" }}
              >
                Book consultation
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>
      </div>

      <WaveDivider fill="var(--fw-navy)" height={88} />
    </section>
  )
}
