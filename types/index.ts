import type { LucideIcon } from "lucide-react"

export interface NavLink {
  label: string
  href: string
}

export interface TeamMember {
  name: string
  title: string
  initials: string
  bio: string
}

export interface Testimonial {
  quote: string
  name: string
  title: string
  initials: string
}

export interface StatItem {
  val: string
  label: string
  icon: LucideIcon
}

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

// ─── Rich service content types ───────────────────────────────────────────────

export interface BenefitItem {
  title: string
  description: string
  icon?: string
}

export interface EligibilityItem {
  audience: string
  note?: string
}

// ─── Firestore document types ─────────────────────────────────────────────────

export interface ServiceDoc {
  id: string
  slug: string
  categoryId: string
  title: string
  icon: string
  shortDescription: string
  hero: {
    heading: string
    subheading: string
    ctaText: string
  }
  quickInfo: {
    timeline: string
    consultation: string
    startingPrice: string
  }
  benefits: string[]           // legacy flat strings (kept for old docs)
  eligibility: string[]        // legacy flat strings (kept for old docs)
  benefitItems?: BenefitItem[]
  eligibilityItems?: EligibilityItem[]
  requiredDocuments: string[]
  processSteps: string[]
  whyChooseUs: string[]
  faqs: { q: string; a: string }[]
  relatedServices: string[]
  seo: {
    title: string
    description: string
    keywords: string
  }
  content: string
  featuredImage: string
  status: "draft" | "published" | "archived"
  createdAt?: string
  updatedAt?: string
}

export interface ServiceCategoryDoc {
  id: string
  slug: string
  order: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface BlogPostDoc {
  id: string
  slug: string
  tag: string
  title: string
  date: string
  excerpt: string
  content?: string
  featuredImage?: string
  createdAt?: string
  updatedAt?: string
  status?: "draft" | "published" | "archived"
}
