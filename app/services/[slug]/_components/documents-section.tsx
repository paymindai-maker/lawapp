import { FileText } from "lucide-react"
import { FadeIn } from "@/components/common/fade-in"
import { SectionLabel } from "@/components/common/section-label"
import type { ServiceDoc } from "@/types"

export function DocumentsSection({ service }: { service: ServiceDoc }) {
  const docs = service.requiredDocuments ?? []

  return (
    <section style={{ background: "var(--fw-surface)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionLabel>What to Prepare</SectionLabel>
          <h2
            className="mb-12"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fw-navy)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
            }}
          >
            Required Documents
          </h2>
        </FadeIn>

        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {docs.map((doc, i) => (
            <FadeIn key={doc} delay={i * 55} direction="up" className="h-full">
              <div
                className="doc-item flex h-full items-center gap-3 px-4 py-3.5"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                }}
              >
                <FileText className="doc-icon h-4 w-4 shrink-0" style={{ color: "var(--fw-blue)" }} />
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{doc}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
