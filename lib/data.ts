import {
  Building2,
  Scale,
  Shield,
  TrendingUp,
} from "lucide-react"
import type {
  NavLink,
  TeamMember,
  Testimonial,
  StatItem,
  FooterColumn,
} from "@/types"

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]


export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Arjun Mehta",
    title: "Senior Partner",
    initials: "AM",
    bio: "18 years in corporate and M&A law. Advised 50+ startups on structuring and fundraising rounds across Series A to Series C.",
  },
  {
    name: "Priya Sharma",
    title: "Senior Advocate",
    initials: "PS",
    bio: "Specialist in IP law and trademark disputes. Former IP counsel at a leading FMCG group before joining NEXGEN.",
  },
  {
    name: "Ravi Nair",
    title: "Corporate Counsel",
    initials: "RN",
    bio: "Expert in contract law and cross-border transactions. Fluent in English, Hindi, and Malayalam; serves clients across South India.",
  },
  {
    name: "Neha Kapoor",
    title: "Founder & CEO",
    initials: "NK",
    bio: "Advocate with 20+ years of practice. Founded NEXGEN in 2006 with a vision to make premium legal services accessible to Indian businesses.",
  },
  {
    name: "Vikram Joshi",
    title: "Sr. Advocate — Litigation",
    initials: "VJ",
    bio: "High Court practitioner with 12 years of civil and commercial litigation experience. Known for strategic courtroom advocacy.",
  },
  {
    name: "Deepa Wilson",
    title: "CA & Audit Head",
    initials: "DW",
    bio: "Chartered Accountant with Big 4 background. Leads our tax advisory and audit practice serving 100+ corporate clients.",
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "NexGen handles our monthly GST, annual audit, and all our supplier contracts. Having one firm cover everything saves us enormous time and prevents costly gaps between financial and legal advice.",
    name: "Sunita Patel",
    title: "Director, Zenith Corp",
    initials: "SP",
  },
  {
    quote:
      "We were a two-person startup with zero idea about compliance. NexGen registered our company, set up accounting, filed our first ITR, and drafted our founders' agreement — all within three weeks.",
    name: "Karan Bhatt",
    title: "Co-founder, Stackly",
    initials: "KB",
  },
  {
    quote:
      "When we received an income tax scrutiny notice, NexGen responded within 24 hours and managed the entire assessment. No penalty, no stress — just complete professional handling end to end.",
    name: "Rahul Agarwal",
    title: "CEO, Mindrise Technologies",
    initials: "RA",
  },
]


export const STATS: StatItem[] = [
  { val: "1,200+", label: "Clients Served", icon: Building2 },
  { val: "15+", label: "Years Experience", icon: Scale },
  { val: "₹500 Cr+", label: "Tax Managed", icon: Shield },
  { val: "98%", label: "On-Time Filing Rate", icon: TrendingUp },
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Features",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Insights", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Support Center", href: "#" },
    ],
  },
]

export const CONTACT_INFO = {
  phone: "+91 87997 41288",
  phoneRaw: "918799741288", // digits-only for tel: and wa.me links
  whatsappGeneral: "https://wa.me/918799741288?text=Hi%2C%20I'd%20like%20to%20connect%20with%20NEXGEN%20for%20legal%20and%20compliance%20services.",
  email: "contact@nexgen.in",
  address: "Noida, Uttar Pradesh, India",
}

export const FIRM_INFO = {
  name: "NexGen",
  tagline: "Full-service chartered accountancy and legal advisory firm — integrated CA + legal solutions for 1,200+ Indian businesses, from incorporation to litigation support.",
  established: "2010",
  city: "Noida, India",
}
