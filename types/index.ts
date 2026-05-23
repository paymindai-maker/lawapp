import type { LucideIcon } from "lucide-react"

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  slug: string
  num: string
  title: string
  description: string
  process: string[]
  faqs: { q: string; a: string }[]
  icon: LucideIcon
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
