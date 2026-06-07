"use client"

import { useRef } from "react"
import { m, useScroll, useSpring, useTransform } from "framer-motion"

interface ParallaxProps {
  children: React.ReactNode
  /**
   * Total vertical travel in px.
   * Positive = element drifts up as you scroll (default: 60).
   * Negative = element drifts down.
   */
  offset?: number
  className?: string
}

/**
 * Parallax wrapper. Content moves at a different speed than the page scroll,
 * creating a depth effect. Uses a spring for smooth, physics-based motion.
 *
 * Usage:
 *   <Parallax offset={80}>
 *     <Image … />
 *   </Parallax>
 */
export function Parallax({ children, offset = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  // Spring smoothing: stiffness/damping tuned for an editorial, non-bouncy feel
  const y = useSpring(rawY, { stiffness: 80, damping: 20, restDelta: 0.001 })

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <m.div style={{ y }}>
        {children}
      </m.div>
    </div>
  )
}

/**
 * Lightweight parallax for text/decorative elements — no overflow clip.
 * Use when the element should drift visibly outside its container bounds.
 */
export function ParallaxDrift({
  children,
  offset = 30,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const smoothY = useSpring(y, { stiffness: 60, damping: 18, restDelta: 0.001 })

  return (
    <m.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </m.div>
  )
}
