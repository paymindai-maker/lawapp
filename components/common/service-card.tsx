import { ArrowRight } from "lucide-react"
import type { Service } from "@/types"

interface ServiceCardProps {
  service: Service
  href?: string
}

export function ServiceCard({ service, href = "#" }: ServiceCardProps) {
  const Icon = service.icon
  return (
    <div
      className="service-card group cursor-pointer rounded-2xl border bg-white p-6"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="svc-num mb-4 block text-xs font-semibold tracking-widest transition-colors duration-300"
        style={{ color: "var(--muted-foreground)" }}
      >
        {service.num}
      </span>
      <Icon
        className="svc-icon mb-4 h-6 w-6 transition-colors duration-300"
        style={{ color: "var(--fw-blue)" }}
      />
      <h3
        className="svc-title mb-4 text-base font-semibold transition-colors duration-300"
        style={{ color: "var(--foreground)" }}
      >
        {service.title}
      </h3>
      <a
        href={href}
        className="svc-link flex items-center gap-1.5 text-sm font-medium transition-colors duration-300"
        style={{ color: "var(--fw-blue)" }}
      >
        View Details
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </div>
  )
}
