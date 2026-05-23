import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BlogCard } from "@/components/common/blog-card"
import { BLOG_POSTS } from "@/lib/data"

export const metadata = {
  title: "Blog | ForLaw",
  description: "Legal insights, updates, and guides from the ForLaw team.",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden py-24" style={{ background: "var(--fw-navy)" }}>
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-orb-drift rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--fw-blue), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.16 255)" }}>
              Legal Insights
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "white" }}>
              Our <span style={{ color: "oklch(0.72 0.16 255)" }}>Blog</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[50ch] text-base leading-relaxed" style={{ color: "oklch(0.65 0.05 255)" }}>
              Expert legal commentary, guides, and updates from the ForLaw team.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <BlogCard key={post.slug} post={post} href={`/blog/${post.slug}`} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
