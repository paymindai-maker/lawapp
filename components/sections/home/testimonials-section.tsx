import { TestimonialCard } from "@/components/common/testimonial-card"
import { SectionLabel } from "@/components/common/section-label"
import { TESTIMONIALS } from "@/lib/data"

export function TestimonialsSection() {
  const quotes = TESTIMONIALS.slice(0, 3)

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Decorative large quote — editorial touch */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-8 top-20 select-none leading-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(140px, 18vw, 220px)",
          color: "var(--fw-blue)",
          opacity: 0.04,
          lineHeight: 1,
        }}
      >
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <SectionLabel>Client Stories</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}
          >
            What our clients say.
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {quotes.map((t, i) => (
            <div
              key={t.name}
              className="py-10"
              style={{
                borderTop: "1px solid var(--border)",
              }}
            >
              <TestimonialCard testimonial={t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
