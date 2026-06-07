"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Video } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"
import { Input } from "@/components/ui/input"
import { CONTACT_INFO, FIRM_INFO } from "@/lib/data"

const CONTACT_ITEMS = [
  { icon: Phone, val: CONTACT_INFO.phone, label: "Phone" },
  { icon: Mail, val: CONTACT_INFO.email, label: "Email" },
  { icon: MapPin, val: CONTACT_INFO.address, label: "Office" },
]

interface ContactSectionProps {
  /** "homepage" (default): includes DiagonalDivider at bottom for section stacking.
   *  "inner": clean flat end, no divider — for service/contact pages. */
  variant?: "homepage" | "inner"
}

interface FormState {
  name: string
  email: string
  phone: string
  matter: string
  preferred: string
  message: string
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  matter: "",
  preferred: "",
  message: "",
}

function buildWhatsAppUrl(f: FormState) {
  const lines = [
    "*Google Meet Consultation Request — NEXGEN*",
    "",
    `*Name:* ${f.name || "—"}`,
    `*Email:* ${f.email || "—"}`,
    `*Phone:* ${f.phone || "—"}`,
    `*Matter type:* ${f.matter || "—"}`,
    `*Preferred slot:* ${f.preferred || "—"}`,
    "",
    "*Brief:*",
    f.message || "—",
    "",
    "Please share a Google Meet link for the consultation. Thanks!",
  ]
  return `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(lines.join("\n"))}`
}

export function ContactSection({ variant = "homepage" }: ContactSectionProps) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
    if (error) setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and phone are required.")
      return
    }
    const url = buildWhatsAppUrl(form)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: variant === "inner" ? "6rem" : "8rem",
        ...(variant === "homepage" ? { borderTop: "1px solid var(--border)" } : {}),
      }}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <FadeIn>
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--fw-blue)" }} />
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--fw-blue)" }}
            >
              Book a Google Meet
            </p>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "var(--foreground)",
              lineHeight: 1.08,
            }}
          >
            Schedule a free consultation.
          </h2>
        </div>

        </FadeIn>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Left — contact details */}
          <FadeIn direction="left" className="flex flex-col gap-8 md:col-span-2">
            <p
              className="max-w-[36ch] text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Fill the form and we&rsquo;ll receive your details on WhatsApp instantly.
              Our team will reply with a Google Meet link for your preferred slot.
            </p>

            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
                      style={{
                        background: "var(--fw-blue-pale)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "var(--fw-blue)" }} />
                    </div>
                    <div>
                      <p
                        className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {item.label}
                      </p>
                      <p className="text-sm leading-snug" style={{ color: "var(--foreground)" }}>
                        {item.val}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--border)" }}
            >
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                &ldquo;{FIRM_INFO.tagline}&rdquo;
              </p>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={140} className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-8"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "3px",
            }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Video className="h-4 w-4" style={{ color: "var(--fw-blue)" }} />
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--foreground)", fontWeight: 700 }}
              >
                Request a Google Meet
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Name *
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    className="rounded-sm"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    placeholder="your@email.com"
                    type="email"
                    className="rounded-sm"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Phone *
                  </label>
                  <Input
                    id="contact-phone"
                    placeholder="+91 …"
                    type="tel"
                    className="rounded-sm"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-matter"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Matter type
                  </label>
                  <Input
                    id="contact-matter"
                    placeholder="e.g. GST, ITR, Litigation"
                    className="rounded-sm"
                    value={form.matter}
                    onChange={(e) => update("matter", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-preferred"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Preferred date &amp; time
                </label>
                <Input
                  id="contact-preferred"
                  placeholder="e.g. Tomorrow 4 PM IST"
                  className="rounded-sm"
                  value={form.preferred}
                  onChange={(e) => update("preferred", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Describe your matter
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Briefly describe what you need help with…"
                  className="w-full resize-none rounded-sm px-3 py-2.5 text-sm transition-all"
                  style={{
                    border: "1px solid var(--input)",
                    background: "var(--background)",
                    color: "var(--foreground)",
                  }}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              {error && (
                <p className="text-xs font-medium" style={{ color: "oklch(0.55 0.18 25)" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm py-3 text-sm font-semibold tracking-wide text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--fw-accent)",
                  letterSpacing: "0.04em",
                  boxShadow: "0 10px 28px -8px oklch(0.55 0.22 258 / 0.45)",
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Send on WhatsApp
              </button>

              <p
                className="text-center text-[11px] leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                Submitting opens WhatsApp with your details pre-filled. We&rsquo;ll reply
                with a Google Meet link.
              </p>
            </div>
          </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
