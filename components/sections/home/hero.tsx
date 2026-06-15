"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { m, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

const HERO_IMAGE = "/hero.png"
const ease = [0.16, 1, 0.3, 1] as const

const TRUST_ITEMS = [
  { val: "1,200+", label: "Clients served" },
  { val: "15+", label: "Years experience" },
  { val: "₹500 Cr+", label: "Tax managed" },
  { val: "98%", label: "On-time filing" },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const bgY = useSpring(rawY, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14])
  const bgScale = useSpring(rawScale, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--background)",
        paddingTop: "clamp(2rem, 4vw, 3.5rem)",
        paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto overflow-hidden"
          style={{
            width: "100%",
            height: "clamp(560px, 72vh, 640px)",
            borderRadius: "clamp(28px, 3vw, 40px)",
            background: "var(--fw-navy)",
            boxShadow:
              "0 30px 80px -30px oklch(0.14 0.04 258 / 0.45), 0 8px 24px -12px oklch(0.14 0.04 258 / 0.25)",
            isolation: "isolate",
          }}
        >
          {/* Background image */}
          <m.div
            className="absolute inset-0"
            style={{ y: bgY, scale: bgScale, zIndex: 0 }}
          >
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="(max-width: 1400px) 95vw, 1330px"
              className="object-cover object-center"
            />
          </m.div>

          {/* Layered overlays — depth + legibility */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.14 0.04 258 / 0.55) 0%, oklch(0.14 0.04 258 / 0.62) 55%, oklch(0.10 0.03 258 / 0.80) 100%)",
              zIndex: 1,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, oklch(0.20 0.05 258 / 0) 0%, oklch(0.10 0.03 258 / 0.35) 75%)",
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div
            className="relative flex h-full flex-col items-center justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
            style={{ zIndex: 2 }}
          >
            <div
              className="flex flex-col items-center text-center"
              style={{ maxWidth: "800px" }}
            >
              {/* Glass badge */}
              <m.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase"
                style={{
                  letterSpacing: "0.18em",
                  color: "oklch(0.96 0.005 258)",
                  background: "oklch(1 0 0 / 0.08)",
                  border: "1px solid oklch(1 0 0 / 0.18)",
                  backdropFilter: "blur(14px) saturate(120%)",
                  WebkitBackdropFilter: "blur(14px) saturate(120%)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--fw-gold)",
                    boxShadow: "0 0 8px var(--fw-gold)",
                  }}
                />
                Chartered Accountants · Legal Advisory
              </m.span>

              {/* Headline */}
              <m.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.28, ease }}
                style={{
                  fontFamily: "var(--font-display)",
                  color: "oklch(0.99 0.003 258)",
                  fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  marginTop: "1.75rem",
                  textWrap: "balance" as const,
                  textShadow: "0 2px 24px oklch(0 0 0 / 0.25)",
                }}
              >
                A partner who handles both
                <br className="hidden sm:block" /> numbers and law.
              </m.h1>

              {/* Subhead */}
              <m.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.42, ease }}
                className="mt-6 text-base sm:text-[1.05rem]"
                style={{
                  color: "oklch(0.88 0.012 258)",
                  lineHeight: 1.6,
                  maxWidth: "58ch",
                  letterSpacing: "0.005em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                One trusted firm — accounting, taxation, compliance,
                registrations, legal advisory, and business growth under one
                roof.
              </m.p>

              {/* CTAs */}
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.56, ease }}
                className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                <Link
                  href="/contact"
                  className="hero-cta-primary group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    background: "var(--fw-accent)",
                    color: "white",
                    borderRadius: "999px",
                    letterSpacing: "0.01em",
                    boxShadow:
                      "0 14px 32px -10px oklch(0.55 0.22 258 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.18)",
                  }}
                >
                  Book a free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="hero-cta-secondary group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    color: "oklch(0.98 0.005 258)",
                    background: "oklch(1 0 0 / 0.06)",
                    border: "1px solid oklch(1 0 0 / 0.28)",
                    borderRadius: "999px",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  Explore our services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 opacity-80" />
                </Link>
              </m.div>
            </div>
          </div>
        </m.div>

        {/* Stats strip — own identity, breathing space from card */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="relative mx-auto"
          style={{
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            maxWidth: "1200px",
          }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {TRUST_ITEMS.map((t, i) => (
              <div
                key={t.label}
                className="hero-stat flex flex-col items-start gap-2 px-5 py-7 sm:px-7 sm:py-8 transition-colors"
                style={{
                  borderLeft:
                    i > 0 ? "1px solid var(--border)" : undefined,
                  borderRight:
                    i === TRUST_ITEMS.length - 1
                      ? "1px solid var(--border)"
                      : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "var(--fw-navy)",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {t.val}
                </span>
                <span
                  className="text-[10.5px] font-semibold uppercase"
                  style={{
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </m.div>
      </div>

      <style>{`
        .hero-cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 40px -10px oklch(0.55 0.22 258 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.22);
        }
        .hero-cta-secondary:hover {
          background: oklch(1 0 0 / 0.12);
          border-color: oklch(1 0 0 / 0.4);
        }
        .hero-stat:hover {
          background: oklch(0.97 0.008 258 / 0.6);
        }
      `}</style>
    </section>
  )
}
