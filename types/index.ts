import type { LucideIcon } from "lucide-react"

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  slug: string
  categorySlug: string
  categoryName: string
  num: string
  title: string
  description: string
  process: string[]
  faqs: { q: string; a: string }[]
  icon: LucideIcon
}

export interface ServiceCategory {
  slug: string
  num: string
  name: string
  description: string
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

export interface BlogPost {
  slug: string
  tag: string
  title: string
  date: string
  excerpt: string
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

// Firestore document types (no LucideIcon refs)
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
  benefits: string[]
  eligibility: string[]
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
