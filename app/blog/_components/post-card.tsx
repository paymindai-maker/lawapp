import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { tagColor } from "./blog-utils"
import type { BlogPostDoc } from "@/types"

export function PostCard({ post }: { post: BlogPostDoc }) {
  const color = tagColor(post.tag)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="post-card group flex flex-col overflow-hidden transition-colors"
      style={{ background: "var(--card)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "3px" }}
    >
      {/* Image / color band */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ height: "200px", background: `color-mix(in oklch, ${color} 12%, var(--background))` }}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-5">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4.5rem",
                lineHeight: 1,
                color: `color-mix(in oklch, ${color} 22%, transparent)`,
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>
          </div>
        )}
        {/* Tag overlay */}
        <div className="absolute bottom-4 left-4">
          <span
            className="rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.92)", color, border: `1px solid ${color}` }}
          >
            {post.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-[11px]" style={{ color: "var(--muted-foreground)" }}>{post.date}</p>
        <h3
          className="mb-3 text-base font-semibold leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)", letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--fw-blue)" }}>
          Read article
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
