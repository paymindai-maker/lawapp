"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { m, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"
import {
  BentoStat,
  BentoTextCell,
  BentoIllustrationCard,
} from "@/components/common/bento"
import { getServiceSvg } from "./service-svg-registry"

const ease = [0.16, 1, 0.3, 1] as const

export function HeroSection({
  service,
  category,
}: {
  service: ServiceDoc
  category: ServiceCategoryDoc | null
}) {
  const hasImage = !!service.featuredImage

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const imgY = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const timeline = service.quickInfo?.timeline?.trim()
  const consultation = service.quickInfo?.consultation?.trim()
  const categoryName = category?.name ?? "Legal Services"
  const heading = service.hero?.heading || service.title
  const subheading = service.hero?.subheading
  const ctaText = service.hero?.ctaText || "Book a Consultation"

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--fw-surface)",
        borderBottom: "1px solid var(--border)",
        paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Breadcrumb bar ── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <nav
            className="flex items-center gap-2 py-4 text-[11px] font-medium"
            aria-label="Breadcrumb"
          >
            <Link href="/services" style={{ color: "var(--fw-blue)" }}>Services</Link>
            {category && (
              <>
                <ChevronRight className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
                <Link href={`/services/${category.slug}`} style={{ color: "var(--fw-blue)" }}>
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
            <span style={{ color: "var(--foreground)" }}>{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Editorial outline — service title initial */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "-3rem",
          bottom: "-8rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(14rem, 26vw, 26rem)",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "1.5px oklch(0.22 0.045 258 / 0.06)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {service.title.charAt(0).toUpperCase()}
      </span>

      <div
        className="relative mx-auto max-w-7xl px-6"
        style={{ zIndex: 1, paddingTop: "clamp(1.75rem, 3vw, 2.5rem)" }}
      >
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
          {/* Primary cell */}
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
                  {categoryName}
                </span>

                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fw-navy)",
                    fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.025em",
                    marginTop: "1.5rem",
                    marginBottom: "1.25rem",
                    textWrap: "balance" as const,
                  }}
                >
                  {heading}
                </h1>

                {subheading && (
                  <p
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                      lineHeight: 1.6,
                      maxWidth: "56ch",
                    }}
                  >
                    {subheading}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="svc-cta-primary group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    background: "var(--fw-navy)",
                    color: "white",
                    borderRadius: "3px",
                    letterSpacing: "0.01em",
                    boxShadow:
                      "0 12px 28px -10px oklch(0.22 0.045 258 / 0.45)",
                  }}
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#process"
                  className="group inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold"
                  style={{
                    color: "var(--fw-navy)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                  }}
                >
                  See how we work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 opacity-70" />
                </a>
              </div>
            </div>
          </article>

          {/* Right top — photo if present, else custom SVG */}
          <article className="col-span-6 md:[grid-column:5/7] md:[grid-row:1/3]">
            {hasImage ? (
              <div
                className="relative h-full overflow-hidden"
                style={{
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--fw-navy)",
                  minHeight: "300px",
                }}
              >
                <m.div className="absolute inset-0" style={{ y: imgY, scale: 1.06 }}>
                  <Image
                    src={service.featuredImage!}
                    alt={service.title}
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
                      "linear-gradient(180deg, oklch(0.14 0.04 258 / 0.40) 0%, oklch(0.10 0.03 258 / 0.65) 100%)",
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
                    {categoryName}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      letterSpacing: "0.04em",
                      color: "var(--fw-gold)",
                    }}
                  >
                    NexGen · Noida
                  </span>
                </div>
              </div>
            ) : (
              <BentoIllustrationCard
                kicker={categoryName}
                caption="Service in focus"
                captionAccent="Custom"
              >
                {getServiceSvg(category, service)}
              </BentoIllustrationCard>
            )}
          </article>

          {/* Bottom row — quick info as bento cells */}
          {timeline && (
            <article className="col-span-6 md:[grid-column:1/3] md:[grid-row:3/4]">
              <BentoStat
                val={timeline}
                label="Typical turnaround once documents are in"
                tone="dark"
                kicker="Timeline"
              />
            </article>
          )}

          {consultation && (
            <article className="col-span-6 md:[grid-column:3/5] md:[grid-row:3/4]">
              <BentoStat
                val={consultation}
                label="First consultation with a partner"
                tone="light"
                kicker="Consultation"
              />
            </article>
          )}

          <article className="col-span-6 md:[grid-column:5/7] md:[grid-row:3/4]">
            <BentoTextCell
              kicker="Compliance"
              body="End-to-end advisory — filings, follow-ups, and statutory representations included. One firm, one accountable contact."
            />
          </article>
        </m.div>
      </div>

      <style>{`
        .svc-cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 36px -10px oklch(0.22 0.045 258 / 0.55);
        }
      `}</style>
    </section>
  )
}
