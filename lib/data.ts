import {
  Building2,
  ReceiptText,
  Shield,
  Rocket,
  FileText,
  PenLine,
  Scale,
  TrendingUp,
} from "lucide-react"
import type {
  NavLink,
  Service,
  ServiceCategory,
  TeamMember,
  Testimonial,
  BlogPost,
  StatItem,
  FooterColumn,
} from "@/types"

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "business-registration",
    num: "01",
    name: "Business Registration",
    description:
      "Company formation, entity structuring, founder documents, and early-stage legal setup for Indian businesses.",
  },
  {
    slug: "tax-compliance",
    num: "02",
    name: "Tax & Compliance",
    description:
      "GST, income tax, ROC, audits, filings, and compliance support for operating companies.",
  },
  {
    slug: "intellectual-property",
    num: "03",
    name: "Intellectual Property",
    description:
      "Trademark search, filing, prosecution, renewals, and brand protection strategy.",
  },
  {
    slug: "legal-documentation",
    num: "04",
    name: "Legal Documentation",
    description:
      "Contracts, agreements, policies, notices, and business-critical legal drafting.",
  },
]

export const SERVICES: Service[] = [
  {
    slug: "corporate-law",
    categorySlug: "business-registration",
    categoryName: "Business Registration",
    num: "01",
    title: "Corporate & Business Law",
    description:
      "End-to-end legal support for companies at every stage — from incorporation and structuring to governance, contracts, and M&A advisory.",
    icon: Building2,
    process: [
      "Initial consultation & needs assessment",
      "Entity structuring & incorporation filing",
      "Drafting shareholder & founder agreements",
      "Ongoing governance & compliance support",
    ],
    faqs: [
      {
        q: "What entity type is best for my startup?",
        a: "Most Indian startups opt for a Private Limited Company for its liability protection, ease of raising funding, and DPIIT recognition eligibility.",
      },
      {
        q: "How long does incorporation take?",
        a: "Typically 7–15 business days after all documents are in order.",
      },
    ],
  },
  {
    slug: "taxation-gst",
    categorySlug: "tax-compliance",
    categoryName: "Tax & Compliance",
    num: "02",
    title: "Taxation & GST Compliance",
    description:
      "Comprehensive tax planning, GST registration, return filing, and advisory to keep your business compliant and tax-efficient year-round.",
    icon: ReceiptText,
    process: [
      "GST registration & GSTIN procurement",
      "Monthly / quarterly return filing (GSTR-1, 3B)",
      "Annual tax computation & ITR filing",
      "Tax dispute resolution & representation",
    ],
    faqs: [
      {
        q: "When is GST registration mandatory?",
        a: "If your aggregate turnover exceeds ₹40L (goods) or ₹20L (services) in a financial year, GST registration is mandatory.",
      },
      {
        q: "Can you handle tax notices?",
        a: "Yes. We represent clients before GST authorities and Income Tax officers for assessments, appeals, and scrutiny notices.",
      },
    ],
  },
  {
    slug: "trademark",
    categorySlug: "intellectual-property",
    categoryName: "Intellectual Property",
    num: "03",
    title: "Trademark Registration",
    description:
      "Protect your brand identity with expert trademark search, filing, prosecution, and enforcement across India and internationally.",
    icon: Shield,
    process: [
      "Trademark availability search",
      "Class selection & application filing",
      "Examination response & objection handling",
      "Certificate issuance & renewal tracking",
    ],
    faqs: [
      {
        q: "How long does trademark registration take in India?",
        a: "Typically 18–24 months from filing to registration, assuming no objections or oppositions.",
      },
      {
        q: "Can I use ™ before registration?",
        a: "Yes. The ™ symbol can be used after filing. The ® symbol is reserved for fully registered trademarks.",
      },
    ],
  },
  {
    slug: "startup-legal",
    categorySlug: "business-registration",
    categoryName: "Business Registration",
    num: "04",
    title: "Startup Legal Services",
    description:
      "From founder agreements to DPIIT recognition and ESOP structuring — a complete legal toolkit built for the pace of startup growth.",
    icon: Rocket,
    process: [
      "Co-founder agreement drafting",
      "DPIIT startup recognition filing",
      "ESOP policy design & implementation",
      "Term sheet & investment round support",
    ],
    faqs: [
      {
        q: "What is DPIIT startup recognition?",
        a: "Recognition by the Department for Promotion of Industry and Internal Trade that unlocks tax exemptions, funding access, and regulatory benefits.",
      },
      {
        q: "Do I need a co-founder agreement?",
        a: "Strongly recommended. It defines equity splits, vesting schedules, IP ownership, and exit terms — preventing costly disputes later.",
      },
    ],
  },
  {
    slug: "legal-documentation",
    categorySlug: "legal-documentation",
    categoryName: "Legal Documentation",
    num: "05",
    title: "Legal Documentation",
    description:
      "Precise drafting and review of contracts, NDAs, MOUs, employment agreements, and all business-critical legal documents.",
    icon: FileText,
    process: [
      "Requirement briefing & scope definition",
      "First draft preparation",
      "Review cycles & negotiation support",
      "Execution & secure storage guidance",
    ],
    faqs: [
      {
        q: "How fast can you draft a contract?",
        a: "Standard agreements are typically turned around within 2–3 business days. Complex multi-party agreements may require 5–7 days.",
      },
      {
        q: "Do you review contracts drafted by the other party?",
        a: "Yes. We provide a detailed redline review highlighting risks, missing clauses, and recommended modifications.",
      },
    ],
  },
  {
    slug: "ca-audit",
    categorySlug: "tax-compliance",
    categoryName: "Tax & Compliance",
    num: "06",
    title: "CA & Audit Services",
    description:
      "Statutory audits, internal audits, financial due diligence, and ROC compliance handled by our in-house Chartered Accountants.",
    icon: PenLine,
    process: [
      "Audit planning & risk assessment",
      "Financial statement review & verification",
      "Management letter & findings report",
      "ROC filing & MCA compliance",
    ],
    faqs: [
      {
        q: "Is a statutory audit mandatory for my company?",
        a: "Every company registered under the Companies Act must undergo a statutory audit annually, regardless of turnover.",
      },
      {
        q: "What is ROC compliance?",
        a: "Filing of annual returns (MGT-7) and financial statements (AOC-4) with the Registrar of Companies — mandatory for all private limited companies.",
      },
    ],
  },
]

export function getServicesByCategory(categorySlug: string) {
  return SERVICES.filter((service) => service.categorySlug === categorySlug)
}

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
      "NEXGEN handled my startup's incorporation and trademark filing with precision. Transparent, decisive, and deeply knowledgeable. Exactly what a growing business needs.",
    name: "Rahul Agarwal",
    title: "CEO, Mindrise Technologies",
    initials: "RA",
  },
  {
    quote:
      "I've worked with several firms, but NEXGEN's clarity of communication set them apart entirely. Our GST compliance was resolved faster than I believed possible.",
    name: "Sunita Patel",
    title: "Director, Zenith Corp",
    initials: "SP",
  },
  {
    quote:
      "Their ESOP structuring advice was spot-on and saved us significant tax liability. The team understood our startup context immediately.",
    name: "Karan Bhatt",
    title: "Co-founder, Stackly",
    initials: "KB",
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-contract-disputes",
    tag: "Corporate",
    title: "Understanding Contract Disputes: A Simple Guide for Businesses",
    date: "May 2025",
    excerpt:
      "Contract disputes are among the most common legal challenges businesses face. This guide walks through types, prevention strategies, and resolution options.",
  },
  {
    slug: "lawyer-on-retainer",
    tag: "Advisory",
    title: "Why Every Business Needs a Lawyer on Retainer",
    date: "Apr 2025",
    excerpt:
      "A retainer arrangement gives your business on-demand legal access — proactive advice instead of reactive crisis management.",
  },
  {
    slug: "startup-legal-essentials-2025",
    tag: "Startups",
    title: "Startup Legal Essentials: What Founders Must Know in 2025",
    date: "Mar 2025",
    excerpt:
      "From co-founder agreements to DPIIT recognition, here are the five legal steps every Indian founder should take in the first 90 days.",
  },
  {
    slug: "gst-compliance-guide",
    tag: "Taxation",
    title: "GST Compliance Guide for Small Businesses in India",
    date: "Feb 2025",
    excerpt:
      "Navigating GST can be complex. We break down registration thresholds, filing deadlines, and common mistakes to avoid.",
  },
]

export const STATS: StatItem[] = [
  { val: "500+", label: "Cases Resolved", icon: Building2 },
  { val: "18 yrs", label: "Legal Expertise", icon: Scale },
  { val: "6", label: "Practice Areas", icon: Shield },
  { val: "98%", label: "Client Satisfaction", icon: TrendingUp },
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
  phone: "+91 99 8765 4321",
  email: "contact@forlaw.in",
  address: "Level 12, One BKC, Bandra Kurla Complex, Mumbai 400051",
}

export const FIRM_INFO = {
  name: "NEXGEN",
  tagline: "Serving clients for 18+ years with proven legal expertise and a commitment to excellence.",
  established: "2006",
  city: "Mumbai, India",
}
