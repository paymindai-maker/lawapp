import { HeroSection } from "@/components/sections/home/hero"
import { StatsStripe } from "@/components/sections/home/stats-stripe"
import { ServicesPreview } from "@/components/sections/home/services-preview"
import { WhyChooseUs } from "@/components/sections/home/why-choose-us"
import { FeaturedServicesSection } from "@/components/sections/home/FeaturedServicesSection"
import { TestimonialsSection } from "@/components/sections/home/testimonials-section"
import { BlogPreview } from "@/components/sections/home/blog-preview"
import { ContactSection } from "@/components/sections/home/contact-section"
export const revalidate = 3600

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStripe />
        <ServicesPreview />
        <WhyChooseUs />
        <FeaturedServicesSection />
        <TestimonialsSection />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
