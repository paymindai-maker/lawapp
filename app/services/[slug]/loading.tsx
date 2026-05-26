export default function ServicePageLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton — navy */}
      <div
        style={{
          background: "var(--fw-navy)",
          paddingTop: "5.5rem",
          paddingBottom: "4.5rem",
        }}
      >
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="h-3 w-16 rounded-full bg-white/10" />
            <div className="h-3 w-3 rounded-full bg-white/10" />
            <div className="h-3 w-24 rounded-full bg-white/10" />
          </div>

          {/* Heading */}
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <div className="mx-auto h-10 w-3/4 rounded-lg bg-white/10" />
            <div className="mx-auto h-10 w-1/2 rounded-lg bg-white/10" />
          </div>

          {/* Subheading */}
          <div className="mx-auto mt-5 max-w-xl space-y-2">
            <div className="h-4 w-full rounded bg-white/07" />
            <div className="h-4 w-5/6 rounded bg-white/07" />
          </div>

          {/* Pills */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {[80, 100, 90].map((w, i) => (
              <div
                key={i}
                className="h-7 rounded-full bg-white/07"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <div className="h-10 w-36 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center px-6 py-1">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <div className="mx-3 h-[5px] w-[5px] rotate-45" style={{ background: "var(--border)" }} />
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      {/* Content section skeleton */}
      <div
        style={{ background: "var(--fw-surface)", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Section label */}
          <div className="mb-2 h-3 w-28 rounded-full" style={{ background: "var(--border)" }} />
          <div className="mb-12 h-8 w-56 rounded-lg" style={{ background: "var(--border)" }} />

          {/* Card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl"
                style={{ background: "var(--border)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
