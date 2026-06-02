import Link from "next/link"
import { ArrowUpRight, Briefcase, Users, BookOpen, Building2, MessageSquare } from "lucide-react"

type PageKey = "services" | "team" | "blog" | "about" | "contact"

interface LinkItem {
  key: PageKey
  href: string
  label: string
  title: string
  description: string
  icon: typeof Briefcase
}

const LINKS: LinkItem[] = [
  {
    key: "services",
    href: "/services",
    label: "Services",
    title: "Explore Our Services",
    description: "Business registration, GST, income tax, litigation, and compliance — built for Indian businesses.",
    icon: Briefcase,
  },
  {
    key: "team",
    href: "/team",
    label: "Team",
    title: "Meet Our Team",
    description: "Senior Advocates and Chartered Accountants with 10–20 years of active practice.",
    icon: Users,
  },
  {
    key: "blog",
    href: "/blog",
    label: "Insights",
    title: "Read Legal Insights",
    description: "GST updates, tax planning, and compliance guides from our practising experts.",
    icon: BookOpen,
  },
  {
    key: "about",
    href: "/about",
    label: "About",
    title: "About the Firm",
    description: "18+ years of integrated legal and tax practice from Noida, serving 500+ clients.",
    icon: Building2,
  },
  {
    key: "contact",
    href: "/contact",
    label: "Contact",
    title: "Book a Consultation",
    description: "Free 30-minute consultation with an Advocate or CA. Response within one business day.",
    icon: MessageSquare,
  },
]

interface Props {
  exclude?: PageKey
  eyebrow?: string
  heading?: string
}

export function CrossPageLinks({
  exclude,
  eyebrow = "Explore More",
  heading = "Continue exploring NEXGEN",
}: Props) {
  const items = LINKS.filter((l) => l.key !== exclude).slice(0, 4)

  return (
    <section
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingTop: "4.5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--fw-gold)" }}
          >
            {eyebrow}
          </p>
        </div>
        <h2
          className="mb-10 max-w-[28ch]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fw-navy)",
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            lineHeight: 1.15,
          }}
        >
          {heading}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.key}
                href={item.href}
                className="group flex flex-col justify-between p-6 transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--fw-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  minHeight: "200px",
                }}
              >
                <div>
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center"
                    style={{
                      background: "var(--fw-navy)",
                      color: "white",
                      borderRadius: "3px",
                    }}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>
                  <p
                    className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--fw-gold)" }}
                  >
                    {item.label}
                  </p>
                  <h3
                    className="text-base font-semibold leading-snug"
                    style={{ color: "var(--fw-navy)", fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-[13px] leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.description}
                  </p>
                </div>
                <div
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-transform group-hover:translate-x-0.5"
                  style={{ color: "var(--fw-blue)" }}
                >
                  Visit
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
