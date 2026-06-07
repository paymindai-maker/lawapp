"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { m, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

const HERO_IMAGE: string | null = "/hero.png"
const ease = [0.16, 1, 0.3, 1] as const

const MARQUEE_ITEMS = [
  "Business Registration",
  "Income Tax & ITR Filing",
  "GST Returns",
  "TDS Filing",
  "ROC Annual Compliance",
  "PAN Application",
  "Litigation & Advocacy",
  "Mutual Fund Advisory",
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax: hero image drifts upward slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const bgY = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "min(82vh, 660px)", background: "var(--fw-navy)" }}
    >
      {/* Parallax background image */}
      {HERO_IMAGE && (
        <m.div
          className="absolute inset-0"
          style={{ y: bgY, scale: 1.1, zIndex: 0 }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </m.div>
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: HERO_IMAGE ? "oklch(0.14 0.04 258 / 0.68)" : "transparent",
          zIndex: 1,
        }}
      />

      {/* Centered body — staggered entrance */}
      <div
        className="relative flex flex-1 items-center justify-center px-6 py-14 text-center"
        style={{ zIndex: 2 }}
      >
        <div style={{ maxWidth: "38rem" }}>

          <m.p
            className="mb-7 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase"
            style={{ color: "var(--fw-accent)", letterSpacing: "0.20em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <span className="inline-block h-px w-7 shrink-0" style={{ background: "var(--fw-accent)" }} />
            Advocates · Chartered Accountants · Compliance
            <span className="inline-block h-px w-7 shrink-0" style={{ background: "var(--fw-accent)" }} />
          </m.p>

          <m.h1
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.97 0.005 258)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
          >
            One Firm. Every Filing. Zero Run-Around.
          </m.h1>

          {/* Devanagari accent */}
          <m.p
            className="mt-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
              color: "var(--fw-gold)",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
          >
            हर फाइलिंग, हर केस — एक छत के नीचे.
          </m.p>

          <m.p
            className="mx-auto mt-5 text-base leading-relaxed"
            style={{ color: "oklch(0.82 0.012 258)", maxWidth: "44ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease }}
          >
            Advocates, Chartered Accountants &amp; compliance specialists under one
            roof — 500+ Indian businesses trust NEXGEN for GST, ITR, ROC filings,
            and courtroom representation since 2006.
          </m.p>

          <m.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--fw-accent)",
                color: "white",
                borderRadius: "3px",
                letterSpacing: "0.02em",
                boxShadow: "0 12px 32px -8px oklch(0.55 0.22 258 / 0.55)",
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
                style={{ color: "var(--fw-accent)" }}
              />
            </Link>
          </m.div>

        </div>
      </div>

      {/* Bottom marquee — practice areas roll */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease }}
        className="relative"
        style={{
          borderTop: "1px solid oklch(1 0 0 / 0.12)",
          borderBottom: "1px solid oklch(1 0 0 / 0.12)",
          overflow: "hidden",
          zIndex: 2,
          padding: "1rem 0",
          background: "oklch(0.14 0.04 258 / 0.45)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div
          className="hero-marquee"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "hero-marquee 38s linear infinite",
            width: "max-content",
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                color: "oklch(0.78 0.022 258)",
                letterSpacing: "-0.01em",
                marginRight: "3rem",
                flexShrink: 0,
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--fw-accent)",
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </m.div>

    </section>
  )
}
