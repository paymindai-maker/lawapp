import { TeamCard } from "@/components/common/team-card"
import { SectionLabel } from "@/components/common/section-label"
import { HorizontalRulesBg } from "@/components/common/orb-bg"
import { DiagonalDivider } from "@/components/common/shape-divider"
import { TEAM_MEMBERS } from "@/lib/data"

export function TeamPreview() {
  const preview = TEAM_MEMBERS.slice(0, 6)

  return (
    <section
      id="team"
      className="relative overflow-hidden"
      style={{
        background: "var(--fw-navy)",
        clipPath: "polygon(0 0, 100% 72px, 100% 100%, 0 100%)",
        marginTop: "-72px",
        paddingTop: "calc(72px + 5rem)",
        paddingBottom: "5rem",
        zIndex: 5,
      }}
    >
      <HorizontalRulesBg opacity={0.09} spacing={44} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel light>The People</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "white",
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
            style={{ color: "oklch(0.44 0.055 255)" }}
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
          <a
            href="/team"
            className="btn-primary inline-flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold text-white"
            style={{ background: "var(--fw-navy-surface)", letterSpacing: "0.04em" }}
          >
            View full team
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Diagonal to light testimonials */}
      <DiagonalDivider fill="var(--fw-surface)" direction="left" height={72} />
    </section>
  )
}
