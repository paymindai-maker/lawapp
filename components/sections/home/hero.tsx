"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { FIRM_INFO } from "@/lib/data"

const HERO_IMAGE: string | null = "/hero.png"
const ease = [0.16, 1, 0.3, 1] as const

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
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY, scale: 1.1, zIndex: 0 }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
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

          <motion.p
            className="mb-7 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase"
            style={{ color: "var(--fw-gold)", letterSpacing: "0.20em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <span className="inline-block h-px w-7 shrink-0" style={{ background: "var(--fw-gold)" }} />
            Advocates · Chartered Accountants · Compliance
            <span className="inline-block h-px w-7 shrink-0" style={{ background: "var(--fw-gold)" }} />
          </motion.p>

          <motion.h1
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
            Built for Business. Backed by Law.
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 text-base leading-relaxed"
            style={{ color: "oklch(0.82 0.012 258)", maxWidth: "44ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease }}
          >
            {FIRM_INFO.tagline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease }}
          >
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
          </motion.div>

        </div>
      </div>
    </section>
  )
}
