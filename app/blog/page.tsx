import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getAllBlogPosts } from "@/lib/firestore/blog"
import type { BlogPostDoc } from "@/types"

export const revalidate = 1800

export const metadata = {
  title: "Legal Insights & Compliance Guides | NEXGEN Blog",
  description:
    "Practical guides, regulatory updates, and expert commentary on business registration, GST, income tax, litigation, and compliance in India — from NEXGEN's Advocates and CAs.",
}

// ─── Tag colors ───────────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  Corporate:   "oklch(0.42 0.10 258)",
  Advisory:    "oklch(0.46 0.08 165)",
  Startups:    "oklch(0.46 0.09 285)",
  Taxation:    "oklch(0.52 0.08 80)",
  "IP Law":    "oklch(0.46 0.09 320)",
  Litigation:  "oklch(0.46 0.09 30)",
  Compliance:  "oklch(0.44 0.07 220)",
  General:     "oklch(0.46 0.04 258)",
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "oklch(0.46 0.05 255)"
}

// ─── Data ────────────────────────────────────────────────────────────────────

async function getPosts(): Promise<BlogPostDoc[]> {
  return getAllBlogPosts()
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <Navbar />
      <main>
        {/* ── Header ── */}
        <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--fw-gold)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                Legal Insights
              </p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fw-navy)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                  lineHeight: 1.05,
                }}
              >
                The NEXGEN Brief
              </h1>
              <p className="max-w-[42ch] text-sm leading-relaxed md:text-right" style={{ color: "var(--muted-foreground)" }}>
                GST updates, tax planning, business registration guides and compliance
                insight — written by our Advocates and Chartered Accountants.
              </p>
            </div>
          </div>
        </section>

        {/* ── Card grid ── */}
        <section
          style={{
            background: "var(--fw-surface)",
            borderTop: "1px solid var(--border)",
            paddingTop: "3.5rem",
            paddingBottom: "5rem",
          }}
        >
          <div className="mx-auto max-w-7xl px-6">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>No posts yet</p>
                <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Articles will appear here once published.
                </p>
              </div>
            ) : (
              <>
                <div
                  className="mb-8 flex items-center justify-between"
                  style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.875rem" }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                    All Articles
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {posts.length} {posts.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// ─── Vertical post card ───────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPostDoc }) {
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
          <div
            className="absolute inset-0 flex items-end p-5"
          >
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
        <div
          className="mt-5 flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: "var(--fw-blue)" }}
        >
          Read article
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
