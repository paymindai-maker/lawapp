import Link from "next/link"
import { Scale } from "lucide-react"
import { FOOTER_COLUMNS, FIRM_INFO } from "@/lib/data"

const TEXT_PRIMARY = "oklch(0.97 0.005 258)"
const TEXT_MUTED = "oklch(0.74 0.022 258)"
const TEXT_FAINT = "oklch(0.62 0.022 258)"
const HAIRLINE = "oklch(1 0 0 / 0.10)"
const CHIP_BG = "oklch(1 0 0 / 0.04)"
const CHIP_BORDER = "oklch(1 0 0 / 0.14)"

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--fw-navy)",
        borderTop: "1px solid oklch(1 0 0 / 0.06)",
        color: TEXT_PRIMARY,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  border: `1px solid ${CHIP_BORDER}`,
                  borderRadius: "3px",
                }}
              >
                <Scale className="h-[18px] w-[18px]" style={{ color: "var(--fw-gold)" }} />
              </div>
              <span
                className="text-xl"
                style={{ fontFamily: "var(--font-display)", color: TEXT_PRIMARY }}
              >
                NEX<span style={{ color: "var(--fw-gold)" }}>GEN</span>
              </span>
            </div>
            <p
              className="max-w-[30ch] text-sm leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              {FIRM_INFO.tagline}
            </p>
            <div className="flex gap-2.5">
              {["in", "tw", "fb", "yt"].map((s) => (
                <div
                  key={s}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center text-[10px] font-bold uppercase transition-colors duration-200"
                  style={{
                    background: CHIP_BG,
                    border: `1px solid ${CHIP_BORDER}`,
                    color: TEXT_MUTED,
                    borderRadius: "2px",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: TEXT_PRIMARY }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors duration-150 hover:text-white"
                      style={{ color: TEXT_MUTED }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-10 h-px" style={{ background: HAIRLINE }} />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs" style={{ color: TEXT_FAINT }} suppressHydrationWarning>
            © {new Date().getFullYear()} NEXGEN. All rights reserved.
          </p>
          <div className="flex gap-6">
            {([["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"]] as const).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-xs transition-colors hover:text-white"
                style={{ color: TEXT_FAINT }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
