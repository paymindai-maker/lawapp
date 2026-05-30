"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface Faq {
  q: string
  a: string
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 py-5 text-left"
          >
            <span
              className="text-sm font-medium leading-snug"
              style={{ color: open === i ? "var(--fw-navy)" : "var(--foreground)" }}
            >
              {faq.q}
            </span>
            <ChevronDown
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{
                color: "var(--fw-blue)",
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateRows: open === i ? "1fr" : "0fr",
              transition: "grid-template-rows 280ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="pb-5 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
