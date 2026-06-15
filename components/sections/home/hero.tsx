"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { m, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import {
  BentoStat,
  BentoDevanagariCell,
  BentoIllustrationCard,
  LedgerGrowthIllustration,
} from "@/components/common/bento"

const HERO_IMAGE = "/hero.png"
const ease = [0.16, 1, 0.3, 1] as const

const SERVICE_SPINE = [
  "GST & Indirect Tax",
  "Income Tax",
  "Audit & Assurance",
  "Company Registration",
  "Legal Advisory",
  "Contract Drafting",
]

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
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const bgY = useSpring(rawY, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--fw-surface)",
        borderBottom: "1px solid var(--border)",
        paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
        paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Editorial outline year — bleeds out bottom-left */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "-2rem",
          bottom: "-7rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(14rem, 24vw, 24rem)",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "1.5px oklch(0.22 0.045 258 / 0.06)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        15+
      </span>

      <div className="relative mx-auto max-w-7xl px-6" style={{ zIndex: 1 }}>
        {/* Bento grid */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "minmax(120px, auto)",
            gap: "1rem",
          }}
        >
          {/* Primary cell — eyebrow + h1 + devanagari + sub + CTAs */}
          <article className="col-span-6 md:[grid-column:1/5] md:[grid-row:1/3]">
            <div
              className="flex h-full flex-col justify-between"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "clamp(1.75rem, 3vw, 2.5rem)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase"
                  style={{
                    color: "var(--fw-accent)",
                    letterSpacing: "0.22em",
                    background: "oklch(0.55 0.22 258 / 0.06)",
                    border: "1px solid oklch(0.55 0.22 258 / 0.16)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "var(--fw-gold)",
                    }}
                  />
                  Chartered Accountants · Legal Advisory
                </span>

                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fw-navy)",
                    fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.025em",
                    marginTop: "1.5rem",
                    marginBottom: "1.25rem",
                    textWrap: "balance" as const,
                  }}
                >
                  A partner who handles both
                  <br className="hidden md:block" /> numbers
                  <span style={{ color: "var(--fw-accent)" }}> and </span>law.
                </h1>

                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
                    color: "var(--fw-gold)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.3,
                    marginBottom: "1.25rem",
                  }}
                >
                  हर फाइलिंग, हर केस — एक छत के नीचे.
                </p>

                <p
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "clamp(0.98rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.6,
                    maxWidth: "56ch",
                  }}
                >
                  Full-service chartered accountancy and legal advisory under
                  one roof. 1,200+ Indian businesses trust NexGen for GST, ITR,
                  audit, company registration, and corporate legal work since
                  2010.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="hero-cta-primary group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    background: "var(--fw-accent)",
                    color: "white",
                    borderRadius: "3px",
                    letterSpacing: "0.01em",
                    boxShadow:
                      "0 12px 28px -10px oklch(0.55 0.22 258 / 0.55)",
                  }}
                >
                  Book a free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="hero-cta-secondary group inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold"
                  style={{
                    color: "var(--fw-navy)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                  }}
                >
                  Explore our services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 opacity-70" />
                </Link>
              </div>
            </div>
          </article>

          {/* Image cell — parallax */}
          <article className="col-span-6 md:[grid-column:5/7] md:[grid-row:1/2]">
            <div
              className="relative h-full overflow-hidden"
              style={{
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--fw-navy)",
                minHeight: "220px",
              }}
            >
              <m.div className="absolute inset-0" style={{ y: bgY, scale: 1.08 }}>
                <Image
                  src={HERO_IMAGE}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </m.div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.14 0.04 258 / 0.45) 0%, oklch(0.10 0.03 258 / 0.65) 100%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4"
                style={{ color: "white" }}
              >
                <span
                  className="text-[10px] font-semibold uppercase"
                  style={{
                    letterSpacing: "0.22em",
                    color: "oklch(0.82 0.018 258)",
                  }}
                >
                  Noida · Pan-India
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    letterSpacing: "0.04em",
                    color: "var(--fw-gold)",
                  }}
                >
                  Est. 2010
                </span>
              </div>
            </div>
          </article>

          {/* Dark stat — 1,200+ */}
          <article className="col-span-6 md:[grid-column:5/7] md:[grid-row:2/3]">
            <BentoStat
              val="1,200+"
              label="Indian businesses trust us with their compliance"
              tone="dark"
              kicker="Clients served"
            />
          </article>

          {/* Devanagari quote */}
          <article className="col-span-6 md:[grid-column:1/3] md:[grid-row:3/4]">
            <BentoDevanagariCell
              text="संख्या और कानून — दोनों एक जगह."
              caption="Numbers and law — together."
            />
          </article>

          {/* Service spine */}
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
                What we cover
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {SERVICE_SPINE.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 text-[12.5px]"
                    style={{ color: "var(--fw-navy)" }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--fw-gold)",
                        flexShrink: 0,
                      }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Custom SVG — ledger + growth */}
          <article className="col-span-6 md:[grid-column:5/7] md:[grid-row:3/4]">
            <BentoIllustrationCard
              kicker="Numbers · Law"
              caption="Compliant growth"
              captionAccent="Integrated"
            >
              <LedgerGrowthIllustration />
            </BentoIllustrationCard>
          </article>
        </m.div>

        {/* Stats strip — own identity below bento */}
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
          box-shadow: 0 16px 36px -10px oklch(0.55 0.22 258 / 0.65);
        }
        .hero-cta-secondary:hover {
          background: var(--fw-surface);
          border-color: var(--fw-navy);
        }
        .hero-stat:hover {
          background: oklch(0.97 0.008 258 / 0.6);
        }
      `}</style>
    </section>
  )
}
