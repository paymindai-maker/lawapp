import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { tagColor } from "@/app/blog/_components/blog-utils"
import type { BlogPostDoc } from "@/types"

export function RelatedPosts({ posts }: { posts: BlogPostDoc[] }) {
  if (posts.length === 0) return null

  return (
    <section style={{ background: "var(--fw-surface)", borderTop: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "5rem" }}>
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          Continue reading
        </p>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {posts.map((r) => (
            <Link
              key={r.id}
              href={`/blog/${r.slug}`}
              className="post-card group flex flex-col p-6 transition-colors"
              style={{ background: "var(--card)", textDecoration: "none", minHeight: "180px" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: tagColor(r.tag) }}>
                  {r.tag}
                </span>
                <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{r.date}</span>
              </div>
              <h3
                className="text-base font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
              >
                {r.title}
              </h3>
              <div className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold" style={{ color: "var(--fw-blue)" }}>
                Read article
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
