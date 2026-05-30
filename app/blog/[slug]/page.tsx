import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import sanitizeHtml from "sanitize-html"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogSlugs } from "@/lib/firestore/blog"

export const revalidate = 1800

// ─── HTML sanitizer config ────────────────────────────────────────────────────

const SANITIZE_CONFIG: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4", "p", "ul", "ol", "li", "blockquote",
    "strong", "em", "a", "img", "br", "hr", "code", "pre",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
  },
  allowedSchemes: ["https", "http", "mailto"],
}

function safe(html: string) {
  return sanitizeHtml(html, SANITIZE_CONFIG)
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

// ─── Reading time ───────────────────────────────────────────────────────────────

function readingTime(html?: string) {
  if (!html) return null
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
  if (words === 0) return null
  return Math.max(1, Math.round(words / 200))
}

// ─── Static params (ISR) ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | NEXGEN Blog`,
    description: post.excerpt,
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedBlogPosts(post.id, post.tag)
  const color = tagColor(post.tag)
  const minutes = readingTime(post.content)

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--background)" }}>

        {/* ── Utility bar ── */}
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3.5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All articles
            </Link>
            {minutes && (
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {minutes} min read
              </span>
            )}
          </div>
        </div>

        {/* ── Article ── */}
        <article>
          {/* Header */}
          <header className="mx-auto max-w-3xl px-6 pb-10 pt-14">
            <div className="mb-5 flex items-center gap-3 text-xs">
              <span className="font-bold uppercase tracking-widest" style={{ color }}>
                {post.tag}
              </span>
              <span style={{ color: "var(--border)" }}>—</span>
              <span style={{ color: "var(--muted-foreground)" }}>{post.date}</span>
              <span style={{ color: "var(--border)" }}>—</span>
              <span style={{ color: "var(--muted-foreground)" }}>NEXGEN Editorial</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
                fontSize: "clamp(2.1rem, 4.5vw, 3.4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                textWrap: "balance",
              }}
            >
              {post.title}
            </h1>

            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: "var(--muted-foreground)", maxWidth: "62ch" }}
            >
              {post.excerpt}
            </p>
          </header>

          {/* Featured image — wider than text column */}
          {post.featuredImage && (
            <div className="mx-auto mb-12 max-w-5xl px-6">
              <div className="overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: "3px" }}>
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1100}
                  height={560}
                  className="w-full object-cover"
                  style={{ maxHeight: "520px" }}
                  priority
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="mx-auto max-w-3xl px-6 pb-20" style={{ paddingTop: post.featuredImage ? 0 : "0.5rem" }}>
            {post.content ? (
              <div
                className="blog-prose article-body"
                dangerouslySetInnerHTML={{ __html: safe(post.content) }}
              />
            ) : (
              <p className="text-sm italic" style={{ color: "var(--muted-foreground)" }}>
                Full article content coming soon.
              </p>
            )}

            <div
              className="mt-14 flex items-center justify-between pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--fw-blue)" }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--fw-blue)" }}
              >
                Speak with us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>

        {/* ── Continue reading ── */}
        {related.length > 0 && (
          <section style={{ background: "var(--fw-surface)", borderTop: "1px solid var(--border)", paddingTop: "4rem", paddingBottom: "5rem" }}>
            <div className="mx-auto max-w-5xl px-6">
              <p className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                Continue reading
              </p>
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                {related.map((r) => (
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
        )}

      </main>
      <Footer />
    </>
  )
}
