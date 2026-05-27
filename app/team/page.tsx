import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { TeamCard } from "@/components/common/team-card"
import { TEAM_MEMBERS } from "@/lib/data"

export const metadata = {
  title: "Our Team | Advocates & Chartered Accountants | NEXGEN Mumbai",
  description:
    "Meet NEXGEN's team of senior Advocates and Chartered Accountants with 10–20 years of expertise in corporate law, taxation, litigation, and compliance. Based in Mumbai, serving India.",
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
              Senior Advocates &amp; Chartered Accountants
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "white" }}>
              The Experts Behind <span style={{ color: "oklch(0.72 0.16 255)" }}>NEXGEN</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed" style={{ color: "oklch(0.65 0.05 255)" }}>
              A multidisciplinary team of Advocates and CAs with 10–20 years of active practice across corporate law, taxation, compliance, and commercial litigation.
            </p>
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
