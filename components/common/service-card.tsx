"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight, Phone, MessageCircle, X, Clock,
  Building2, FileText, Shield, Rocket, Scale, Landmark, Briefcase,
  Globe, Users, BookOpen, ReceiptText, ShieldCheck, FileCheck,
  Banknote, TrendingUp, Award, Gavel, FilePlus,
  type LucideIcon,
} from "lucide-react"
import type { ServiceDoc } from "@/types"
import { CONTACT_INFO } from "@/lib/data"

// ─── Config ──────────────────────────────────────────────────────────────────

const PHONE_RAW = CONTACT_INFO.phoneRaw
const PHONE_DISPLAY = CONTACT_INFO.phone

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, FileText, Shield, Rocket, Scale, Landmark, Briefcase,
  Globe, Users, BookOpen, ReceiptText, ShieldCheck, FileCheck,
  Banknote, TrendingUp, Award, Gavel, FilePlus,
}

function waLink(serviceTitle: string) {
  const msg = `Hi, I'm interested in your *${serviceTitle}* service. Could you please share more details and pricing?`
  return `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`
}

// ─── Component ───────────────────────────────────────────────────────────────

interface ServiceCardProps {
  service: ServiceDoc
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const Icon = ICON_MAP[service.icon] ?? Briefcase
  const price = service.quickInfo?.startingPrice
  const timeline = service.quickInfo?.timeline

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div
      ref={ref}
      className="group relative flex flex-col transition-colors"
      style={{ border: "1px solid var(--border)", background: "var(--card)", borderRadius: "3px" }}
    >
      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Icon + title */}
        <div className="mb-3 flex items-center gap-3">
          <Icon className="h-5 w-5 shrink-0" style={{ color: "var(--fw-blue)" }} />
          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-display)" }}
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="line-clamp-3 flex-1 text-sm leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {service.shortDescription}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {price && (
            <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              From {price}
            </span>
          )}
          {timeline && (
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
              <Clock className="h-3 w-3" />
              {timeline}
            </span>
          )}
        </div>
      </div>

      {/* Action bar */}
      <div
        className="flex items-center gap-px overflow-hidden"
        style={{ borderTop: "1px solid var(--border)", borderRadius: "0 0 3px 3px" }}
      >
        <Link
          href={`/services/${service.slug}`}
          className="flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors hover:bg-muted/60"
          style={{ color: "var(--fw-blue)" }}
        >
          View details
          <ArrowRight className="h-3 w-3" />
        </Link>
        <div style={{ width: "1px", alignSelf: "stretch", background: "var(--border)" }} />
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors hover:bg-muted/60"
          style={{ color: open ? "var(--fw-blue)" : "var(--foreground)" }}
        >
          <MessageCircle className="h-3 w-3" />
          Talk to expert
        </button>
      </div>

      {/* Expert panel (slides in above action bar) */}
      {open && (
        <div
          className="absolute bottom-[45px] left-0 right-0 z-20 p-4"
          style={{
            background: "var(--fw-navy)",
            borderRadius: "3px 3px 0 0",
            boxShadow: "0 -8px 24px -4px oklch(0 0 0 / 0.18)",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-white">Choose how to connect</p>
            <button
              onClick={() => setOpen(false)}
              className="flex h-5 w-5 items-center justify-center rounded-full transition-colors"
              style={{ color: "oklch(0.55 0.06 255)" }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:+${PHONE_RAW}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--fw-blue)", color: "white" }}
            >
              <Phone className="h-3.5 w-3.5" />
              Call us
            </a>
            <a
              href={waLink(service.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "oklch(0.52 0.18 148)", color: "white" }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
          <p className="mt-2.5 text-center text-[10px]" style={{ color: "oklch(0.44 0.06 255)" }}>
            {PHONE_DISPLAY} · Typically replies in minutes
          </p>
        </div>
      )}
    </div>
  )
}
