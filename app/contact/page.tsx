import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FadeIn } from "@/components/common/fade-in"
import { ContactSection } from "@/components/sections/home/contact-section"

export const metadata = {
  title: "Contact NEXGEN | Book a Free Legal & Tax Consultation in Noida",
  description:
    "Reach NEXGEN's team of Advocates and Chartered Accountants in Noida. Free 30-min consultation on business registration, GST, income tax, litigation, and mutual fund advisory. Mon–Sat, 9am–7pm IST.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Free Legal Consultation | NEXGEN Noida",
    description:
      "Free 30-minute consultation with NEXGEN's Advocates and CAs. Business registration, GST, income tax, litigation, and mutual fund advisory. Mon–Sat, 9am–7pm IST.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Legal Consultation | NEXGEN Noida",
    description:
      "Free 30-min consultation with NEXGEN's Advocates and CAs. Business registration, GST, income tax, litigation, and more.",
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
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
              Book a Free Legal Consultation in Noida
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Business registration, GST, income tax, litigation, or mutual fund advisory — book a free 30-minute consultation. We respond within one business day.
            </p>
            </FadeIn>
          </div>
        </section>
        <ContactSection variant="inner" />
      </main>
      <Footer />
    </>
  )
}
