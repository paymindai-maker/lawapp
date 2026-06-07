"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { m, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"

const ease = [0.16, 1, 0.3, 1] as const

export function HeroSection({
  service,
  category,
}: {
  service: ServiceDoc
  category: ServiceCategoryDoc | null
}) {
  // Trust strip — authoritative signals only, no fees
  const trustStrip: { label: string; value: string }[] = []
  if (service.quickInfo?.timeline) {
    trustStrip.push({ label: "Processing Time", value: service.quickInfo.timeline })
  }
  if (service.quickInfo?.consultation) {
    trustStrip.push({ label: "Expert Support", value: service.quickInfo.consultation })
  }
  trustStrip.push({ label: "Compliance", value: "End-to-End" })

  const hasImage = !!service.featuredImage

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const imgY = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <section ref={sectionRef} style={{ background: "var(--background)" }}>

      {/* ── Breadcrumb bar ── */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
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

      {/* ── Hero band ── */}
      <div
        style={{
          background: "oklch(0.97 0.008 258)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className={`grid items-center gap-0 ${hasImage ? "md:grid-cols-[52%_48%]" : ""}`}>

            {/* Left — content */}
            <div
              className="py-12 md:py-16"
              style={{ paddingRight: hasImage ? "clamp(2rem, 4vw, 4rem)" : undefined }}
            >
              {/* Category kicker */}
              <p
                className="mb-5 text-[11px] font-bold uppercase"
                style={{ color: "var(--fw-gold)", letterSpacing: "0.22em" }}
              >
                {category?.name ?? "Legal Services"}
              </p>

              {/* Heading */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fw-navy)",
                  fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.03em",
                  maxWidth: hasImage ? undefined : "20ch",
                }}
              >
                {service.hero?.heading || service.title}
              </h1>

              {/* Description */}
              {service.hero?.subheading && (
                <p
                  className="mt-5 text-[0.9375rem] leading-relaxed"
                  style={{ color: "var(--muted-foreground)", maxWidth: "50ch" }}
                >
                  {service.hero.subheading}
                </p>
              )}

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--fw-navy)", borderRadius: "3px", letterSpacing: "0.02em" }}
                >
                  {service.hero?.ctaText || "Book a Consultation"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#process"
                  className="text-sm font-medium"
                  style={{ color: "var(--fw-blue)" }}
                >
                  See how we work
                </a>
              </div>
            </div>

            {/* Right — parallax illustration */}
            {hasImage && (
              <div className="hidden md:flex items-center justify-end py-4" style={{ overflow: "hidden" }}>
                <m.div
                  className="relative w-full"
                  style={{ aspectRatio: "4/3", y: imgY }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease }}
                >
                  <Image
                    src={service.featuredImage!}
                    alt={service.title}
                    fill
                    className="object-contain object-right-bottom mix-blend-multiply"
                    priority
                    sizes="(max-width: 1280px) 45vw, 560px"
                  />
                </m.div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Trust strip — full-width institutional row ── */}
      {trustStrip.length > 0 && (
        <div style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${trustStrip.length}, 1fr)` }}
            >
              {trustStrip.map((t, i) => (
                <div
                  key={t.label}
                  className="py-5"
                  style={{
                    paddingLeft: i === 0 ? 0 : "2rem",
                    paddingRight: "2rem",
                    borderLeft: i > 0 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <p
                    className="mb-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {t.label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--fw-navy)", fontFamily: "var(--font-display)" }}
                  >
                    {t.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
