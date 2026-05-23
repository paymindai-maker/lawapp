import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BLOG_POSTS } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} | ForLaw Blog`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-24" style={{ background: "var(--fw-navy)" }}>
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-orb-drift rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--fw-blue), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-3xl px-6">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: "var(--fw-blue)" }}
            >
              {post.tag}
            </span>
            <h1
              className="text-3xl font-semibold leading-tight md:text-4xl"
              style={{ fontFamily: "var(--font-heading)", color: "white" }}
            >
              {post.title}
            </h1>
            <p className="mt-3 text-sm" style={{ color: "oklch(0.62 0.06 255)" }}>
              {post.date} · ForLaw Editorial
            </p>
          </div>
        </section>

        {/* Content placeholder */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {post.excerpt}
            </p>
            <p
              className="mt-8 rounded-2xl p-6 text-sm leading-relaxed"
              style={{ background: "var(--fw-blue-pale)", color: "var(--muted-foreground)" }}
            >
              Full article content will be managed through the ForLaw CMS admin panel.
              Rich text, images, and structured sections will be rendered here dynamically.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
