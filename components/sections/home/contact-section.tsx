import { Phone, Mail, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CrosshatchBg } from "@/components/common/orb-bg"
import { DiagonalDivider } from "@/components/common/shape-divider"
import { CONTACT_INFO, FIRM_INFO } from "@/lib/data"

const CONTACT_ITEMS = [
  { icon: Phone, val: CONTACT_INFO.phone, label: "Phone" },
  { icon: Mail, val: CONTACT_INFO.email, label: "Email" },
  { icon: MapPin, val: CONTACT_INFO.address, label: "Office" },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: "8rem",
        zIndex: 8,
      }}
    >
      <CrosshatchBg opacity={0.025} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--fw-blue)" }} />
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--fw-blue)" }}
            >
              Contact Us
            </p>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "var(--fw-navy)",
              lineHeight: 1.08,
            }}
          >
            Start your matter today.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Left — contact details */}
          <div className="flex flex-col gap-8 md:col-span-2">
            <p
              className="max-w-[36ch] text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Don&rsquo;t face complex legal challenges alone. Our team is available
              for an initial consultation — let&rsquo;s discuss your matter.
            </p>

            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "var(--fw-blue-pale)",
                        border: "1px solid var(--border)",
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
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8 md:col-span-3"
            style={{
              background: "oklch(1 0 0)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="mb-6 text-lg font-semibold"
              style={{ color: "var(--fw-navy)", fontWeight: 700 }}
            >
              Send us a message
            </h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Name
                  </label>
                  <Input placeholder="Your name" className="rounded-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Email
                  </label>
                  <Input placeholder="your@email.com" type="email" className="rounded-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Phone
                  </label>
                  <Input placeholder="+91 …" type="tel" className="rounded-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Matter type
                  </label>
                  <Input placeholder="e.g. Corporate law" className="rounded-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Describe your matter
                </label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe your legal issue…"
                  className="w-full resize-none rounded-sm px-3 py-2.5 text-sm transition-all"
                  style={{
                    border: "1px solid var(--input)",
                    background: "var(--background)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
              <button
                className="btn-primary mt-1 w-full rounded-sm py-3 text-sm font-semibold tracking-wide text-white"
                style={{ background: "var(--fw-navy)", letterSpacing: "0.04em" }}
              >
                Submit inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal into dark footer */}
      <DiagonalDivider fill="var(--fw-navy)" direction="right" height={72} />
    </section>
  )
}
