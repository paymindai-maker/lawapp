import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getAdminDb } from "@/lib/firebase-admin"
import type { BlogPostDoc } from "@/types"

export const revalidate = 60

export const metadata = {
  title: "Blog | NEXGEN",
  description: "Legal insights, updates, and guides from the NEXGEN team.",
}

// ─── Tag colors ───────────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  Corporate:   "oklch(0.42 0.22 264)",
  Advisory:    "oklch(0.50 0.16 155)",
  Startups:    "oklch(0.52 0.18 285)",
  Taxation:    "oklch(0.62 0.12 78)",
  "IP Law":    "oklch(0.50 0.18 310)",
  Litigation:  "oklch(0.50 0.15 20)",
  Compliance:  "oklch(0.42 0.10 200)",
  General:     "oklch(0.46 0.05 255)",
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "oklch(0.46 0.05 255)"
}

// ─── Data ────────────────────────────────────────────────────────────────────

async function getPosts(): Promise<BlogPostDoc[]> {
  try {
    const db = getAdminDb()
    const snap = await db.collection("blog_posts").orderBy("date", "desc").get()
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPostDoc, "id">) }))
  } catch {
    return []
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <Navbar />
      <main>
        {/* ── Header ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--fw-navy)", paddingTop: "5rem", paddingBottom: "4rem" }}
        >
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]">
            <defs>
              <pattern id="blog-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
          <div
            aria-hidden
            className="animate-shape-float pointer-events-none absolute right-[6%] top-[10%] h-40 w-40 opacity-[0.05]"
            style={{
              background: "conic-gradient(from 45deg, var(--fw-gold), transparent 50%)",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fw-gold)" }}>
                  Legal Insights
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "white",
                    fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                    lineHeight: 1.05,
                  }}
                >
                  The ForLaw Brief
                </h1>
              </div>
              <p className="max-w-[38ch] text-sm leading-relaxed md:text-right" style={{ color: "oklch(0.55 0.055 255)" }}>
                Expert commentary, regulatory updates, and practical guides for Indian businesses.
              </p>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section
          style={{
            background: "var(--fw-surface)",
            clipPath: "polygon(0 48px, 100% 0, 100% 100%, 0 100%)",
            marginTop: "-48px",
            paddingTop: "calc(48px + 3.5rem)",
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
              <div className="flex flex-col gap-12">
                {/* ── Featured post ── */}
                {featured && <FeaturedPost post={featured} />}

                {/* ── All articles ── */}
                {rest.length > 0 && (
                  <div>
                    <div
                      className="mb-6 flex items-center gap-4"
                      style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.875rem" }}
                    >
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        All Articles
                      </span>
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{ background: "var(--fw-blue-light)", color: "var(--fw-blue)" }}
                      >
                        {rest.length}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {rest.map((post, i) => (
                        <PostCard key={post.id} post={post} index={i + 2} />
                      ))}
                    </div>
                  </div>
                )}

                {/* If only one post, show it as featured with no grid */}
                {posts.length === 1 && (
                  <p className="text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
                    More articles coming soon.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// ─── Featured post (compact horizontal) ──────────────────────────────────────

function FeaturedPost({ post }: { post: BlogPostDoc }) {
  const color = tagColor(post.tag)

  return (
    <div>
      <div
        className="mb-4 flex items-center gap-3"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.875rem" }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Latest
        </span>
        <span
          className="h-1 w-1 rounded-full"
          style={{ background: "var(--border)" }}
        />
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
          style={{
            background: `color-mix(in oklch, ${color} 15%, transparent)`,
            color,
            border: `1px solid color-mix(in oklch, ${color} 25%, transparent)`,
          }}
        >
          {post.tag}
        </span>
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="group flex overflow-hidden rounded-2xl"
        style={{ border: "1px solid var(--border)", background: "var(--card)", textDecoration: "none" }}
      >
        {/* Left: dark accent panel */}
        <div
          className="hidden shrink-0 flex-col justify-between p-6 md:flex"
          style={{ background: "var(--fw-navy)", width: "180px" }}
        >
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{
              background: `color-mix(in oklch, ${color} 18%, transparent)`,
              color,
              border: `1px solid color-mix(in oklch, ${color} 28%, transparent)`,
            }}
          >
            {post.tag}
          </span>
          <div>
            <p
              className="mb-1 font-display text-3xl font-bold leading-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "color-mix(in oklch, white 12%, transparent)",
              }}
            >
              01
            </p>
            <p className="text-xs" style={{ color: "oklch(0.48 0.055 255)" }}>{post.date}</p>
          </div>
        </div>

        {/* Center: title + excerpt */}
        <div className="flex flex-1 flex-col justify-center gap-2.5 px-7 py-6">
          <h2
            className="text-xl font-bold leading-snug md:text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            {post.title}
          </h2>
          <p
            className="line-clamp-2 text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)", maxWidth: "65ch" }}
          >
            {post.excerpt}
          </p>
          {/* Mobile: date */}
          <p className="text-xs md:hidden" style={{ color: "var(--muted-foreground)" }}>{post.date}</p>
        </div>

        {/* Right: CTA */}
        <div className="hidden shrink-0 items-center px-7 md:flex">
          <div
            className="flex flex-col items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--fw-blue)" }}
          >
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            <span className="text-xs">Read</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: BlogPostDoc; index: number }) {
  const color = tagColor(post.tag)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-sm"
      style={{ border: "1px solid var(--border)", background: "var(--card)", textDecoration: "none" }}
    >
      {/* Top strip */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: `color-mix(in oklch, ${color} 8%, var(--card))`,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{
            background: `color-mix(in oklch, ${color} 15%, transparent)`,
            color,
            border: `1px solid color-mix(in oklch, ${color} 22%, transparent)`,
          }}
        >
          {post.tag}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            color: `color-mix(in oklch, ${color} 18%, transparent)`,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="mb-2.5 text-sm font-semibold leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          {post.title}
        </h3>
        <p
          className="line-clamp-2 flex-1 text-xs leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{post.date}</span>
          <span
            className="flex items-center gap-1 text-[11px] font-semibold transition-all group-hover:gap-1.5"
            style={{ color }}
          >
            Read
            <ArrowRight className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
