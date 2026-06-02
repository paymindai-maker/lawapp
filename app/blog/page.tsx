import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FadeIn } from "@/components/common/fade-in"
import { getAllBlogPosts } from "@/lib/firestore/blog"
import { PostCard } from "./_components/post-card"
import { CrossPageLinks } from "@/components/common/cross-page-links"

export const revalidate = 1800

export const metadata = {
  title: "Legal Insights & Compliance Guides | NEXGEN Blog",
  description:
    "Practical guides, regulatory updates, and expert commentary on business registration, GST, income tax, litigation, and compliance in India — from NEXGEN's Advocates and CAs.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Legal Insights & Compliance Guides | NEXGEN Blog",
    description:
      "GST updates, tax planning, business registration guides and compliance insight — written by NEXGEN's Advocates and Chartered Accountants.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXGEN Legal Blog | Compliance & Tax Guides for Indian Businesses",
    description:
      "GST updates, tax planning, business registration guides — written by NEXGEN's Advocates and CAs in Noida.",
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
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

        {/* Card grid */}
        <section style={{ background: "var(--fw-surface)", borderTop: "1px solid var(--border)", paddingTop: "3.5rem", paddingBottom: "5rem" }}>
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
                  {posts.map((post, i) => (
                    <FadeIn key={post.id} delay={i * 55}>
                      <PostCard post={post} />
                    </FadeIn>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
        <CrossPageLinks exclude="blog" />
      </main>
      <Footer />
    </>
  )
}
