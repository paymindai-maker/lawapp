import Link from "next/link"
import { TeamCard } from "@/components/common/team-card"
import { SectionLabel } from "@/components/common/section-label"
import { TEAM_MEMBERS } from "@/lib/data"

export function TeamPreview() {
  const preview = TEAM_MEMBERS.slice(0, 6)

  return (
    <section
      id="team"
      style={{
        background: "oklch(0.97 0.008 258)",
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>The People</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "var(--fw-navy)",
                lineHeight: 1.1,
              }}
            >
              Counsel backed by
              <br />
              decades of practice.
            </h2>
          </div>
          <p
            className="max-w-[36ch] text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Advocates and chartered accountants united by one commitment: your success.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {preview.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white"
            style={{ background: "var(--fw-navy)", letterSpacing: "0.04em", borderRadius: "3px" }}
          >
            View full team
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
