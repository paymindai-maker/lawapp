"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionLabel } from "@/components/common/section-label"
import type { ServiceDoc } from "@/types"

const STEP_STAGGER = 0.3
const STEP_DURATION = 0.55

export function ProcessSection({ service }: { service: ServiceDoc }) {
  const steps = service.processSteps ?? []
  const timelineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(timelineRef, { once: true, margin: "-80px" })

  const totalDuration = steps.length * STEP_STAGGER + STEP_DURATION

  return (
    <section
      id="process"
      style={{
        background: "oklch(0.97 0.008 258)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Our Approach</SectionLabel>
          <h2
            className="mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fw-navy)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
            }}
          >
            How We Work
          </h2>
        </motion.div>

        {/* Vertical timeline — scales to any step count, no scroll */}
        <div ref={timelineRef} className="relative" style={{ paddingLeft: "3.5rem" }}>

          {/* Base rail */}
          <div
            className="absolute"
            style={{
              left: "23px",
              top: "12px",
              bottom: "12px",
              width: "1px",
              background: "var(--border)",
            }}
          />

          {/* Animated rail fill */}
          <motion.div
            className="absolute"
            style={{
              left: "22px",
              top: "12px",
              width: "3px",
              background: "var(--fw-blue)",
              transformOrigin: "top center",
              height: "calc(100% - 24px)",
              borderRadius: "2px",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: totalDuration, ease: "easeInOut" }}
          />

          <ol className="relative flex flex-col gap-7">
            {steps.map((step, i) => {
              const delay = i * STEP_STAGGER
              return (
                <li key={i} className="relative flex items-start">
                  {/* Circle (positioned over rail) */}
                  <motion.div
                    className="absolute flex items-center justify-center"
                    style={{
                      left: "-3.5rem",
                      top: 0,
                      width: "48px",
                      height: "48px",
                      background: "var(--fw-navy)",
                      border: "1px solid var(--fw-navy)",
                      borderRadius: "50%",
                      zIndex: 2,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      duration: STEP_DURATION,
                      delay,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {/* Pulse ring */}
                    <motion.span
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "2px solid var(--fw-blue)",
                      }}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={inView ? { scale: [1, 1.6], opacity: [0.55, 0] } : {}}
                      transition={{
                        duration: 0.9,
                        delay: delay + 0.15,
                        ease: "easeOut",
                      }}
                    />
                    <motion.span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        lineHeight: 1,
                        color: "white",
                      }}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: delay + 0.2 }}
                    >
                      {i + 1}
                    </motion.span>
                  </motion.div>

                  {/* Label card */}
                  <motion.div
                    className="flex-1"
                    style={{ minHeight: "48px", paddingTop: "0.6rem" }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: delay + 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <p
                      className="text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: "var(--fw-gold)", marginBottom: "0.25rem" }}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: "var(--fw-navy)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        maxWidth: "60ch",
                      }}
                    >
                      {step}
                    </p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>

      </div>
    </section>
  )
}
