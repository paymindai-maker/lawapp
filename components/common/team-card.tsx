import type { TeamMember } from "@/types"

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div
      className="team-card-editorial group p-7"
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "3px" }}
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center"
        style={{ background: "var(--fw-blue-pale)", border: "1px solid var(--border)", borderRadius: "2px" }}
      >
        <span
          className="text-2xl font-bold leading-none"
          style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)" }}
        >
          {member.initials}
        </span>
      </div>
      <p className="mb-1 text-base font-semibold" style={{ color: "var(--foreground)" }}>
        {member.name}
      </p>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--fw-gold)" }}>
        {member.title}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
        {member.bio}
      </p>
    </div>
  )
}
