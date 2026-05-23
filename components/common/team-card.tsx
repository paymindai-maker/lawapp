import type { TeamMember } from "@/types"

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div
      className="team-card-editorial group rounded-2xl p-7"
      style={{ background: "var(--fw-navy-mid)" }}
    >
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl"
        style={{ background: "oklch(0.11 0.08 255)" }}
      >
        <span
          className="text-2xl font-bold leading-none"
          style={{ fontFamily: "var(--font-display)", color: "var(--fw-blue-mid)" }}
        >
          {member.initials}
        </span>
      </div>
      <p className="mb-1 text-base font-semibold" style={{ color: "oklch(0.94 0.015 255)" }}>
        {member.name}
      </p>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--fw-gold)" }}>
        {member.title}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.52 0.055 255)" }}>
        {member.bio}
      </p>
    </div>
  )
}
