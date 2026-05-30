import { Scale } from "lucide-react"
import { FOOTER_COLUMNS, FIRM_INFO } from "@/lib/data"

export function Footer() {
  return (
    <footer style={{ background: "oklch(0.97 0.008 258)", borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center"
                style={{ background: "var(--fw-navy)", borderRadius: "3px" }}
              >
                <Scale className="h-[18px] w-[18px] text-white" />
              </div>
              <span
                className="text-xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)" }}
              >
                NEX<span style={{ color: "var(--fw-blue)" }}>GEN</span>
              </span>
            </div>
            <p
              className="max-w-[30ch] text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {FIRM_INFO.tagline}
            </p>
            <div className="flex gap-2.5">
              {["in", "tw", "fb", "yt"].map((s) => (
                <div
                  key={s}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center text-[10px] font-bold uppercase transition-all duration-200 hover:opacity-70"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
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
                style={{ color: "var(--fw-navy)" }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-10 h-px" style={{ background: "var(--border)" }} />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © {new Date().getFullYear()} NEXGEN. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "var(--muted-foreground)" }}
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
