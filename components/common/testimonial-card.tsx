import type { Testimonial } from "@/types"

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <figure className="flex flex-col gap-6">
      <blockquote>
        <p
          className="text-xl leading-relaxed md:text-2xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "var(--foreground)",
            fontStyle: "italic",
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--fw-navy)" }}
        >
          <span
            className="text-sm font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {testimonial.name}
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {testimonial.title}
          </p>
        </div>
        <div className="ml-auto hidden h-px w-16 md:block" style={{ background: "var(--border)" }} />
      </figcaption>
    </figure>
  )
}
