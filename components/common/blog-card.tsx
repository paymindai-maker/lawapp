import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/types"
import { DotGridBg } from "@/components/common/orb-bg"

interface BlogCardProps {
  post: BlogPost
  href?: string
  featured?: boolean
}

export function BlogCard({ post, href = "#", featured = false }: BlogCardProps) {
  return (
    <a
      href={href}
      className="blog-card-editorial group flex flex-col overflow-hidden rounded-2xl"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          height: featured ? "220px" : "140px",
          background: "var(--fw-navy)",
          flexShrink: 0,
        }}
      >
        <DotGridBg opacity={0.06} />
        <div className="absolute inset-0 flex items-end p-5">
          <div className="flex items-center gap-3">
            <span
              className="rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "var(--fw-gold)", color: "var(--fw-navy)" }}
            >
              {post.tag}
            </span>
            <span className="text-xs" style={{ color: "oklch(0.48 0.055 255)" }}>
              {post.date}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3
          className="blog-card-title text-sm font-semibold leading-snug transition-colors duration-200 md:text-base"
          style={{ color: "var(--foreground)" }}
        >
          {post.title}
        </h3>
        {featured && (
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {post.excerpt}
          </p>
        )}
        <div
          className="mt-auto flex items-center gap-1 text-xs font-semibold"
          style={{ color: "var(--fw-blue)" }}
        >
          Read article
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  )
}
