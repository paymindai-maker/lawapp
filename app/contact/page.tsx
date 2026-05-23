import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactSection } from "@/components/sections/home/contact-section"

export const metadata = {
  title: "Contact | ForLaw",
  description: "Get in touch with ForLaw for a consultation on your legal matters.",
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
              Reach Out
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "white" }}>
              Get in <span style={{ color: "oklch(0.72 0.16 255)" }}>Touch</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[50ch] text-base leading-relaxed" style={{ color: "oklch(0.65 0.05 255)" }}>
              Ready to discuss your legal matter? Our team is available Monday–Saturday, 9am–7pm IST.
            </p>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
