import { Suspense } from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/home/hero"
import { AboutUsSection } from "@/components/sections/home/about-us"
import { ServicesPreview } from "@/components/sections/home/services-preview"
import { WhyChooseUs } from "@/components/sections/home/why-choose-us"
import { FeaturedServicesSection } from "@/components/sections/home/FeaturedServicesSection"
import { BlogPreview } from "@/components/sections/home/blog-preview"
import { ContactSection } from "@/components/sections/home/contact-section"
import {
  ServiceRowsSkeleton,
  CardGridSkeleton,
  BlogCardsSkeleton,
} from "@/components/ui/section-skeleton"
import { CONTACT_INFO, FIRM_INFO } from "@/lib/data"

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexgen.in"

export const metadata: Metadata = {
  title: "NexGen Associates LLP | Chartered Accountants & Legal Services in India",
  description:
    "NexGen Associates LLP, a trusted CA and legal advisory firm in India. Expert GST filing, tax planning, audit, company registration, and corporate legal services under one roof.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NexGen Associates LLP | Chartered Accountants & Legal Services in India",
    description:
      "Full-service CA and legal advisory under one roof. GST, ITR, audit, company registration, contracts, and corporate legal — trusted by 1,200+ Indian businesses.",
    url: "/",
    type: "website",
  },
}

// ─── Organization JSON-LD ────────────────────────────────────────────────────

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "Organization"],
  name: FIRM_INFO.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  foundingDate: FIRM_INFO.established,
  description: FIRM_INFO.tagline,
  telephone: CONTACT_INFO.phone,
  email: CONTACT_INFO.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5355,
    longitude: 77.3910,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  priceRange: "₹₹",
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <AboutUsSection />
        <Suspense fallback={<ServiceRowsSkeleton />}>
          <ServicesPreview />
        </Suspense>
        <WhyChooseUs />
        <Suspense fallback={<CardGridSkeleton count={4} />}>
          <FeaturedServicesSection />
        </Suspense>
        <Suspense fallback={<BlogCardsSkeleton count={3} />}>
          <BlogPreview />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
