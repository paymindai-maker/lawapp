import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CrossPageLinks } from "@/components/common/cross-page-links"
import { ContactSection } from "@/components/sections/home/contact-section"
import { RuleDivider } from "@/components/common/shape-divider"
import {
  getServiceBySlug,
  getCategoryBySlug,
  getCategoryById,
  getRelatedServices,
  getServicesByCategory,
  getAllServiceSlugs,
} from "@/lib/firestore/services"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"
import { HeroSection } from "./_components/hero-section"
import { BenefitsSection } from "./_components/benefits-section"
import { ProcessSection } from "./_components/process-section"
import { DocumentsSection } from "./_components/documents-section"
import { FaqSection } from "./_components/faq-section"
import { WhyUsSection } from "./_components/why-us-section"
import { RelatedSection } from "./_components/related-section"
import { CategoryPage } from "./_components/category-page"

export const revalidate = 3600

// ─── Static params (ISR) ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const [service, category] = await Promise.all([getServiceBySlug(slug), getCategoryBySlug(slug)])
  if (service) {
    const title = service.seo?.title || `${service.title} | NEXGEN`
    const description = service.seo?.description || service.shortDescription
    return {
      title,
      description,
      alternates: { canonical: `/services/${slug}` },
      openGraph: {
        title,
        description,
        url: `/services/${slug}`,
        type: "website",
        images: service.featuredImage
          ? [{ url: service.featuredImage, width: 1200, height: 630, alt: service.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: service.featuredImage ? [service.featuredImage] : undefined,
      },
    }
  }
  if (category) {
    const title = `${category.name} | NEXGEN`
    const description = category.description
    return {
      title,
      description,
      alternates: { canonical: `/services/${slug}` },
      openGraph: { title, description, url: `/services/${slug}`, type: "website" },
      twitter: { card: "summary_large_image", title, description },
    }
  }
  return { robots: { index: false } }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, category] = await Promise.all([getServiceBySlug(slug), getCategoryBySlug(slug)])

  if (service) {
    const [relatedServices, serviceCategory] = await Promise.all([
      getRelatedServices(service.relatedServices ?? []),
      getCategoryById(service.categoryId),
    ])
    return <IndividualServicePage service={service} category={serviceCategory} relatedServices={relatedServices} />
  }

  if (category) {
    const categoryServices = await getServicesByCategory(category.id)
    return <CategoryPage category={category} services={categoryServices} />
  }

  notFound()
}

// ─── Individual service page ──────────────────────────────────────────────────

function IndividualServicePage({
  service,
  category,
  relatedServices,
}: {
  service: ServiceDoc
  category: ServiceCategoryDoc | null
  relatedServices: ServiceDoc[]
}) {
  const hasBenefits =
    (service.benefitItems?.length ?? 0) > 0 ||
    (service.eligibilityItems?.length ?? 0) > 0 ||
    (service.benefits?.length ?? 0) > 0 ||
    (service.eligibility?.length ?? 0) > 0
  const hasProcess = (service.processSteps?.length ?? 0) > 0
  const hasDocuments = (service.requiredDocuments?.length ?? 0) > 0
  const hasFaqs = (service.faqs?.length ?? 0) > 0
  const hasWhyUs = (service.whyChooseUs?.length ?? 0) > 0
  const hasRelated = relatedServices.length > 0

  return (
    <>
      <Navbar />
      <main>
        <HeroSection service={service} category={category} />
        {hasBenefits && <><RuleDivider /><BenefitsSection service={service} /></>}
        {hasProcess && <><RuleDivider /><ProcessSection service={service} /></>}
        {hasDocuments && <><RuleDivider /><DocumentsSection service={service} /></>}
        {hasWhyUs && <><RuleDivider /><WhyUsSection service={service} /></>}
        {hasFaqs && <><RuleDivider /><FaqSection service={service} /></>}
        
        {hasRelated && <><RuleDivider /><RelatedSection services={relatedServices} /></>}
        <ContactSection variant="inner" />
        <CrossPageLinks exclude="services" />
      </main>
      <Footer />
    </>
  )
}
