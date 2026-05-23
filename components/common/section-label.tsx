interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className="h-px w-8 shrink-0"
        style={{ background: light ? "var(--fw-gold)" : "var(--fw-blue)" }}
      />
      <p
        className="text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ color: light ? "var(--fw-gold)" : "var(--fw-blue)" }}
      >
        {children}
      </p>
    </div>
  )
}
