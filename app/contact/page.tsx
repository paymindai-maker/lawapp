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
        <section className="relative overflow-hidden py-20" style={{ background: "var(--fw-navy)" }}>
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-orb-drift rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--fw-blue), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.16 255)" }}>
              Free Consultation
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "white" }}>
              Speak with a <span style={{ color: "oklch(0.72 0.16 255)" }}>Legal Expert</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed" style={{ color: "oklch(0.65 0.05 255)" }}>
              Business registration, GST compliance, income tax, litigation, or mutual fund advisory — book a free 30-minute consultation with NEXGEN&apos;s Advocates and CAs. We respond within one business day.
            </p>
          </div>
        </section>
        <ContactSection variant="inner" />
      </main>
      <Footer />
    </>
  )
}
