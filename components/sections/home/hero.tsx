import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FIRM_INFO } from "@/lib/data"

// Drop your hero photo into /public/hero.jpg (or .webp/.png) then set the path below.
// Recommended: wide landscape, people/office/court, 1920×1080+.
// While null → solid navy fallback.
const HERO_IMAGE: string | null = "/hero.png"
export function HeroSection() {
  return (
    <section
      className="relative flex flex-col"
      style={{
        minHeight: "min(82vh, 660px)",
        background: "var(--fw-navy)",
      }}
    >
      {/* Background image */}
      {HERO_IMAGE && (
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Dark overlay — always present so text stays legible over any image */}
      <div
        className="absolute inset-0"
        style={{
          background: HERO_IMAGE
            ? "oklch(0.14 0.04 258 / 0.68)"
            : "transparent",
          zIndex: 1,
        }}
      />

      {/* Centered body */}
      <div
        className="relative flex flex-1 items-center justify-center px-6 py-14 text-center"
        style={{ zIndex: 2 }}
      >
        <div style={{ maxWidth: "38rem" }}>

          {/* Eyebrow */}
          <p
            className="mb-7 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase"
            style={{ color: "var(--fw-gold)", letterSpacing: "0.20em" }}
          >
            <span className="inline-block h-px w-7 shrink-0" style={{ background: "var(--fw-gold)" }} />
            Advocates · Chartered Accountants · Compliance
            <span className="inline-block h-px w-7 shrink-0" style={{ background: "var(--fw-gold)" }} />
          </p>

          {/* Headline — kept short, one line at all breakpoints */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.97 0.005 258)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            Built for Business. Backed by Law.
          </h1>

          {/* Tagline */}
          <p
            className="mx-auto mt-6 text-base leading-relaxed"
            style={{ color: "oklch(0.82 0.012 258)", maxWidth: "44ch" }}
          >
            {FIRM_INFO.tagline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                background: "var(--fw-gold)",
                color: "oklch(0.16 0.04 258)",
                borderRadius: "3px",
                letterSpacing: "0.02em",
              }}
            >
              Book a Consultation
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
              style={{
                color: "oklch(0.97 0.005 258)",
                border: "1px solid oklch(1 0 0 / 0.22)",
                borderRadius: "3px",
              }}
            >
              View Practice Areas
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                style={{ color: "var(--fw-gold)" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
