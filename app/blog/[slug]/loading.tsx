export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div
        style={{
          background: "var(--fw-navy)",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          {/* Tag + date */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-5 w-20 rounded-full bg-white/15" />
            <div className="h-3 w-24 rounded-full bg-white/10" />
          </div>
          {/* Title */}
          <div className="space-y-3">
            <div className="mx-auto h-9 w-4/5 rounded-lg bg-white/12" />
            <div className="mx-auto h-9 w-3/5 rounded-lg bg-white/12" />
          </div>
          {/* Excerpt */}
          <div className="mx-auto mt-5 max-w-lg space-y-2">
            <div className="h-4 w-full rounded bg-white/07" />
            <div className="h-4 w-4/5 rounded bg-white/07" />
          </div>
        </div>
      </div>

      {/* Article body skeleton */}
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-4">
        {[100, 90, 95, 70, 100, 85, 60, 100, 88, 75].map((w, i) => (
          <div
            key={i}
            className="h-4 rounded"
            style={{ width: `${w}%`, background: "var(--border)" }}
          />
        ))}
        <div className="h-6" />
        {[100, 92, 80, 100, 65].map((w, i) => (
          <div
            key={i}
            className="h-4 rounded"
            style={{ width: `${w}%`, background: "var(--border)" }}
          />
        ))}
      </div>
    </div>
  )
}
