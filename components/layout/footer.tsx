import { Scale } from "lucide-react"
import { FOOTER_COLUMNS, FIRM_INFO } from "@/lib/data"

export function Footer() {
  return (
    <footer style={{ background: "var(--fw-navy)", marginTop: "-1px" }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "var(--fw-blue)" }}
              >
                <Scale className="h-[18px] w-[18px] text-white" />
              </div>
              <span
                className="text-xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "oklch(0.92 0.02 255)",
                }}
              >
                NEX<span style={{ color: "var(--fw-blue-mid)" }}>GEN</span>
              </span>
            </div>
            <p
              className="max-w-[30ch] text-sm leading-relaxed"
              style={{ color: "oklch(0.52 0.05 255)" }}
            >
              {FIRM_INFO.tagline}
            </p>
            <div className="flex gap-2.5">
              {["in", "tw", "fb", "yt"].map((s) => (
                <div
                  key={s}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[10px] font-bold uppercase transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "oklch(0.62 0.06 255)",
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
                style={{ color: "oklch(0.72 0.16 255)" }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors duration-150 hover:text-white"
                      style={{ color: "oklch(0.55 0.05 255)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="my-10 h-px opacity-10"
          style={{ background: "oklch(0.70 0.04 255)" }}
        />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs" style={{ color: "oklch(0.45 0.04 255)" }}>
            © {new Date().getFullYear()} NEXGEN. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "oklch(0.50 0.05 255)" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
