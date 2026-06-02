import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CrossPageLinks } from "@/components/common/cross-page-links"
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogSlugs } from "@/lib/firestore/blog"
import { readingTime } from "@/app/blog/_components/blog-utils"
import { ArticleHeader } from "./_components/article-header"
import { ArticleBody } from "./_components/article-body"
import { RelatedPosts } from "./_components/related-posts"

export const revalidate = 1800

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
  const description = post.excerpt.length > 155
    ? post.excerpt.slice(0, 152) + "..."
    : post.excerpt
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.featuredImage ? [{ url: post.featuredImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedBlogPosts(post.id, post.tag)
  const minutes = readingTime(post.content)

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--background)" }}>
        <ArticleHeader
          tag={post.tag}
          date={post.date}
          title={post.title}
          excerpt={post.excerpt}
          minutes={minutes}
        />
        <ArticleBody
          title={post.title}
          featuredImage={post.featuredImage}
          content={post.content}
        />
        <RelatedPosts posts={related} />
        <CrossPageLinks exclude="blog" />
      </main>
      <Footer />
    </>
  )
}
