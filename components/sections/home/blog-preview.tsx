import { ArrowRight } from "lucide-react"
import { BlogCard } from "@/components/common/blog-card"
import { SectionLabel } from "@/components/common/section-label"
import { BLOG_POSTS } from "@/lib/data"

export function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3)

  return (
    <section
      id="blog"
      className="relative"
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        zIndex: 7,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <SectionLabel>Legal Insights</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "var(--fw-navy)",
                lineHeight: 1.1,
              }}
            >
              From the practice.
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden items-center gap-1.5 text-sm font-semibold md:flex"
            style={{ color: "var(--fw-blue)" }}
          >
            All articles <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Equal 3-col grid — no space imbalance */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              href={`/blog/${post.slug}`}
              featured={i === 0}
            />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <a
            href="/blog"
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--fw-blue)" }}
          >
            All articles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
