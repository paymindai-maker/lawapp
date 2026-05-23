import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WhyChooseUs } from "@/components/sections/home/why-choose-us"
import { TeamPreview } from "@/components/sections/home/team-preview"
import { FIRM_INFO } from "@/lib/data"

export const metadata = {
  title: "About Us | ForLaw",
  description: "Learn about ForLaw — 18+ years of trusted legal expertise across India.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="relative overflow-hidden py-24" style={{ background: "var(--fw-navy)" }}>
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-orb-drift rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--fw-blue), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 255)" }}
            >
              Our Story
            </p>
            <h1
              className="text-4xl font-semibold md:text-5xl"
              style={{ fontFamily: "var(--font-heading)", color: "white" }}
            >
              About <span style={{ color: "oklch(0.72 0.16 255)" }}>ForLaw</span>
            </h1>
            <p
              className="mx-auto mt-5 max-w-[55ch] text-base leading-relaxed"
              style={{ color: "oklch(0.65 0.05 255)" }}
            >
              Founded in {FIRM_INFO.established} in {FIRM_INFO.city}, ForLaw was built on
              a simple belief: every business deserves premium legal counsel, delivered with
              clarity and integrity.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--fw-blue)" }}
                >
                  Our Mission
                </p>
                <h2
                  className="mb-5 text-2xl font-semibold md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Legal expertise that works for{" "}
                  <span style={{ color: "var(--fw-blue)" }}>your business</span>
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  We believe legal services should be proactive, not reactive. Our team
                  partners with businesses from day one — structuring deals, managing
                  compliance, and resolving disputes — so you can focus on growth with
                  confidence.
                </p>
              </div>
              <div>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--fw-blue)" }}
                >
                  Our Values
                </p>
                <h2
                  className="mb-5 text-2xl font-semibold md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Principles that{" "}
                  <span style={{ color: "var(--fw-blue)" }}>guide every case</span>
                </h2>
                <ul className="flex flex-col gap-4">
                  {["Integrity above all", "Transparency in every step", "Client outcomes first", "Continuous learning"].map((v) => (
                    <li
                      key={v}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: "var(--fw-blue)" }}
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <TeamPreview />
      </main>
      <Footer />
    </>
  )
}
