import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Briefcase,
  Scale,
  Landmark,
  Shield,
  Rocket,
  type LucideIcon,
} from "lucide-react"

import { SectionLabel } from "@/components/common/section-label"
import { ServiceCard } from "@/components/common/service-card"

import { getAdminDb } from "@/lib/firebase-admin"

import type {
  ServiceDoc,
  ServiceCategoryDoc,
} from "@/types"

// ─────────────────────────────────────────────────────────────
// Placeholder config
// ─────────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  string,
  {
    icon: LucideIcon
    description: string
  }
> = {
  "business-registration": {
    icon: Building2,
    description:
      "End-to-end company incorporation and registration support for modern businesses.",
  },

  compliance: {
    icon: Shield,
    description:
      "Regulatory filings and compliance management tailored for growing companies.",
  },

  taxation: {
    icon: Landmark,
    description:
      "Professional tax advisory and filing support for businesses and founders.",
  },

  litigation: {
    icon: Scale,
    description:
      "Strategic legal representation and dispute resolution services.",
  },

  startups: {
    icon: Rocket,
    description:
      "Legal and operational support designed for modern startups and founders.",
  },
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

async function getHomepageServices() {
  try {
    const db = getAdminDb()

    const [categorySnap, serviceSnap] = await Promise.all([
      db.collection("service_categories").orderBy("name").limit(5).get(),

      db
        .collection("services")
        .where("status", "==", "published")
        .get(),
    ])

    const categories: ServiceCategoryDoc[] =
      categorySnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ServiceCategoryDoc, "id">),
      }))

   const services: ServiceDoc[] =
  serviceSnap.docs.map((doc) => {
    const data = doc.data() as any

    return {
      id: doc.id,

      ...data,

      createdAt:
        typeof data.createdAt?.toDate === "function"
          ? data.createdAt.toDate().toISOString()
          : data.createdAt ?? null,

      updatedAt:
        typeof data.updatedAt?.toDate === "function"
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt ?? null,
    }
  })
    const items = categories.map((category) => {
      const service = services.find(
        (svc) => svc.categoryId === category.id
      )

      return {
        category,
        service: service ?? null,
      }
    })

    return items
  } catch (error) {
    console.error("Failed to fetch homepage services:", error)
    return []
  }
}

// ─────────────────────────────────────────────────────────────
// Placeholder card
// ─────────────────────────────────────────────────────────────

function PlaceholderCard({
  category,
}: {
  category: ServiceCategoryDoc
}) {
  const meta =
    CATEGORY_META[category.slug] ?? {
      icon: Briefcase,
      description:
        "Professional legal and compliance solutions tailored for modern businesses.",
    }

  const Icon = meta.icon

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{
        border: "1px solid var(--border)",
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.95))",
      }}
    >
      {/* Badge */}
      <div className="absolute right-4 top-4">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: "var(--muted)",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
        >
          Coming Soon
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Icon */}
        <div
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            background: "var(--muted)",
            border: "1px solid var(--border)",
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{
              color: "var(--muted-foreground)",
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="mb-2.5 text-base font-semibold leading-snug"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
          }}
        >
          {category.name}
        </h3>

        {/* Description */}
        <p
          className="flex-1 text-sm leading-relaxed"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          {meta.description}
        </p>

        {/* CTA */}
        <div
          className="mt-6 flex items-center gap-1 text-xs font-semibold"
          style={{
            color: "var(--muted-foreground)",
            opacity: 0.7,
          }}
        >
          Launching soon
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────

export async function FeaturedServicesSection() {
  const items = await getHomepageServices()

  if (!items.length) return null

  return (
    <section
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>
              Featured Services
            </SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "var(--foreground)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Legal solutions for
              modern businesses.
            </h2>
          </div>

          <p
            className="max-w-[42ch] text-sm leading-relaxed"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            Explore our core practice areas covering
            business registration, compliance, taxation,
            startup advisory, and legal support.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(({ category, service }) =>
            service ? (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ) : (
              <PlaceholderCard
                key={category.id}
                category={category}
              />
            )
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{
              color: "var(--fw-blue)",
            }}
          >
            Explore all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}