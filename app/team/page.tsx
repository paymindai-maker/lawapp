import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { TeamCard } from "@/components/common/team-card"
import { TEAM_MEMBERS } from "@/lib/data"
import { CrossPageLinks } from "@/components/common/cross-page-links"

export const metadata = {
  title: "Our Team | Advocates & Chartered Accountants | NEXGEN Noida",
  description:
    "Meet NEXGEN's team of senior Advocates and Chartered Accountants with 10–20 years of expertise in corporate law, taxation, litigation, and compliance. Based in Noida, serving India.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team | Senior Advocates & CAs | NEXGEN Noida",
    description:
      "Meet NEXGEN's senior Advocates and Chartered Accountants — 10–20 years of expertise in corporate law, GST, litigation, and compliance.",
    url: "/team",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXGEN Team | Senior Advocates & Chartered Accountants in Noida",
    description:
      "Senior Advocates and CAs with 10–20 years of expertise in corporate law, taxation, litigation, and compliance.",
  },
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                Senior Advocates &amp; Chartered Accountants
              </p>
            </div>
            <h1
              className="max-w-[22ch]"
              style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              Senior Advocates &amp; Chartered Accountants — Noida
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Advocates and CAs with 10–20 years of active practice across corporate law, taxation, compliance, and commercial litigation.
            </p>
          </div>
        </section>

        <section className="py-20" style={{ background: "oklch(0.97 0.008 258)" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {TEAM_MEMBERS.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
        <CrossPageLinks exclude="team" />
      </main>
      <Footer />
    </>
  )
}
