import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlogCard } from "@/components/common/blog-card"
import { SectionLabel } from "@/components/common/section-label"

import { getRecentBlogPosts } from "@/lib/firestore/blog"

import type { BlogPostDoc } from "@/types"

export async function BlogPreview() {
  const posts = await getRecentBlogPosts(3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section
      id="blog"
      className="relative"
      style={{
        background: "var(--fw-surface)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        borderTop: "1px solid var(--border)",
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
                color: "var(--foreground)",
                lineHeight: 1.1,
              }}
            >
              From the practice.
            </h2>
          </div>

          <Link
            href="/blog"
            className="hidden items-center gap-1.5 text-sm font-semibold md:flex"
            style={{ color: "var(--fw-blue)" }}
          >
            All articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Blog Grid */}
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

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--fw-blue)" }}
          >
            All articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}