"use client"

import { motion } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number           // ms
  direction?: "up" | "fade" | "left"
}

const ease = [0.16, 1, 0.3, 1] as const // ease-out-expo

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? -28 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.8, delay: delay / 1000, ease }}
    >
      {children}
    </motion.div>
  )
}
