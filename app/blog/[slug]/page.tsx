import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getAdminDb } from "@/lib/firebase-admin"
import type { BlogPostDoc } from "@/types"

export const revalidate = 60

// ─── Tag colors (same as listing page) ───────────────────────────────────────

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

async function getPost(slug: string): Promise<BlogPostDoc | null> {
  try {
    const db = getAdminDb()
    const snap = await db.collection("blog_posts").where("slug", "==", slug).limit(1).get()
    if (snap.empty) return null
    const doc = snap.docs[0]
    return { id: doc.id, ...(doc.data() as Omit<BlogPostDoc, "id">) }
  } catch {
    return null
  }
}

async function getRelatedPosts(currentId: string, tag: string): Promise<BlogPostDoc[]> {
  try {
    const db = getAdminDb()
    const snap = await db.collection("blog_posts").where("tag", "==", tag).limit(4).get()
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPostDoc, "id">) }))
      .filter((p) => p.id !== currentId)
      .slice(0, 3)
  } catch {
    return []
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | NEXGEN Blog`,
    description: post.excerpt,
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.id, post.tag)
  const color = tagColor(post.tag)

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          style={{ background: "var(--fw-navy)", paddingTop: "5rem", paddingBottom: "4.5rem", position: "relative", zIndex: 1 }}
        >
          <div className="mx-auto max-w-3xl px-6">
            {/* Back link */}
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5"
              style={{ color: "oklch(0.50 0.08 255)" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All articles
            </Link>

            {/* Tag */}
            <div className="mb-5">
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{
                  background: `color-mix(in oklch, ${color} 18%, transparent)`,
                  color,
                  border: `1px solid color-mix(in oklch, ${color} 28%, transparent)`,
                }}
              >
                {post.tag}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
                fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p
              className="mt-4 max-w-[60ch] text-base leading-relaxed"
              style={{ color: "oklch(0.58 0.055 255)" }}
            >
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="mt-6 flex items-center gap-2 text-xs" style={{ color: "oklch(0.44 0.07 255)" }}>
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{post.date}</span>
              <span>·</span>
              <span>NEXGEN Editorial</span>
            </div>
          </div>
        </section>

        {/* ── Featured image (if present) ── */}
        {post.featuredImage && (
          <div
            style={{
              background: "var(--fw-surface)",
              clipPath: "polygon(0 48px, 100% 0, 100% 100%, 0 100%)",
              marginTop: "-48px",
              paddingTop: "calc(48px + 2.5rem)",
              paddingBottom: "0",
              zIndex: 2,
              position: "relative",
            }}
          >
            <div className="mx-auto max-w-3xl px-6">
              <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={900}
                  height={480}
                  className="w-full object-cover"
                  style={{ maxHeight: "480px" }}
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Article body ── */}
        <section
          className="relative"
          style={{
            background: "var(--fw-surface)",
            ...(post.featuredImage
              ? { paddingTop: "3rem", zIndex: 2 }
              : {
                  clipPath: "polygon(0 48px, 100% 0, 100% 100%, 0 100%)",
                  marginTop: "-48px",
                  paddingTop: "calc(48px + 3rem)",
                  zIndex: 2,
                }),
            paddingBottom: "5rem",
          }}
        >
          <div className="mx-auto max-w-3xl px-6">
            {post.content ? (
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div
                className="rounded-xl p-8 text-center"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Full article content coming soon.
                </p>
              </div>
            )}

            {/* Bottom meta */}
            <div
              className="mt-12 flex items-center justify-between pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "var(--fw-blue)" }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to blog
              </Link>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {post.date}
              </span>
            </div>
          </div>
        </section>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section
            style={{
              background: "var(--fw-navy)",
              clipPath: "polygon(0 0, 100% 56px, 100% 100%, 0 100%)",
              marginTop: "-56px",
              paddingTop: "calc(56px + 4rem)",
              paddingBottom: "5rem",
              zIndex: 3,
              position: "relative",
            }}
          >
            <div className="mx-auto max-w-3xl px-6">
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.44 0.08 255)" }}
              >
                More in {post.tag}
              </p>
              <div className="flex flex-col gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group flex items-start justify-between gap-4 py-4"
                    style={{ borderTop: "1px solid oklch(0.22 0.06 255)", textDecoration: "none" }}
                  >
                    <div className="flex-1">
                      <p className="text-xs mb-1" style={{ color: "oklch(0.42 0.07 255)" }}>{r.date}</p>
                      <h3
                        className="text-sm font-semibold leading-snug transition-colors"
                        style={{ color: "white", fontFamily: "var(--font-display)" }}
                      >
                        {r.title}
                      </h3>
                    </div>
                    <ArrowRight
                      className="mt-4 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ color: "oklch(0.44 0.08 255)" }}
                    />
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
