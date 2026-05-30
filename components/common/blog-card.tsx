import Image from "next/image"
import { ArrowRight } from "lucide-react"

import type { BlogPostDoc } from "@/types"

interface BlogCardProps {
  post: BlogPostDoc
  href?: string
  featured?: boolean
}

const TAG_COLORS: Record<string, string> = {
  Corporate: "oklch(0.42 0.10 258)",
  Advisory: "oklch(0.46 0.08 165)",
  Startups: "oklch(0.46 0.09 285)",
  Taxation: "oklch(0.52 0.08 80)",
  "IP Law": "oklch(0.46 0.09 320)",
  Litigation: "oklch(0.46 0.09 30)",
  Compliance: "oklch(0.44 0.07 220)",
  General: "oklch(0.46 0.04 258)",
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "oklch(0.46 0.05 255)"
}

export function BlogCard({
  post,
  href = "#",
  featured = false,
}: BlogCardProps) {
  const color = tagColor(post.tag)

  return (
    <a
      href={href}
      className="blog-card-editorial group flex h-full flex-col overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        background: "var(--card)",
        textDecoration: "none",
        borderRadius: "3px",
      }}
    >
      {/* Cover */}
      <div
        className="relative overflow-hidden"
        style={{
          height: featured ? "240px" : "180px",
          background: "var(--fw-navy)",
          flexShrink: 0,
        }}
      >
        {post.featuredImage ? (
          <>
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.08))",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color}, color-mix(in oklch, ${color} 38%, black))`,
            }}
          />
        )}

        {/* Meta */}
        <div className="absolute inset-x-0 bottom-0 flex items-end p-5">
          <div className="flex items-center gap-3">
            <span
              className="rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {post.tag}
            </span>

            <span
              className="text-xs"
              style={{
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {post.date}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3
          className="blog-card-title text-base font-semibold leading-snug transition-colors duration-200"
          style={{
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-display)",
          }}
        >
          {post.title}
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          {post.excerpt.length > (featured ? 140 : 90)
            ? `${post.excerpt.slice(0, featured ? 140 : 90)}...`
            : post.excerpt}
        </p>

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