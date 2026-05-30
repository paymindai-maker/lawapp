import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactSection } from "@/components/sections/home/contact-section"

export const metadata = {
  title: "Contact NEXGEN | Book a Free Legal & Tax Consultation in Mumbai",
  description:
    "Reach NEXGEN's team of Advocates and Chartered Accountants in Mumbai. Free 30-min consultation on business registration, GST, income tax, litigation, and mutual fund advisory. Mon–Sat, 9am–7pm IST.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                Free Consultation
              </p>
            </div>
            <h1
              className="max-w-[22ch]"
              style={{ fontFamily: "var(--font-display)", color: "var(--fw-navy)", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              Speak with a legal expert
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Business registration, GST, income tax, litigation, or mutual fund advisory — book a free 30-minute consultation. We respond within one business day.
            </p>
          </div>
        </section>
        <ContactSection variant="inner" />
      </main>
      <Footer />
    </>
  )
}
