import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FadeIn } from "@/components/common/fade-in"
import { ContactSection } from "@/components/sections/home/contact-section"
import { CrossPageLinks } from "@/components/common/cross-page-links"

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
      
        <ContactSection variant="inner" />
        <CrossPageLinks exclude="contact" />
      </main>
      <Footer />
    </>
  )
}
