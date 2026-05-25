import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { TeamCard } from "@/components/common/team-card"
import { TEAM_MEMBERS } from "@/lib/data"

export const metadata = {
  title: "Our Team | NEXGEN",
  description: "Meet the experienced advocates and chartered accountants behind NEXGEN.",
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden py-24" style={{ background: "var(--fw-navy)" }}>
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-orb-drift rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--fw-blue), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.16 255)" }}>
              Our People
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "white" }}>
              Meet the <span style={{ color: "oklch(0.72 0.16 255)" }}>Team</span>
            </h1>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {TEAM_MEMBERS.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
