import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { safe } from "@/app/blog/_components/blog-utils"

interface Props {
  title: string
  featuredImage?: string | null
  content?: string | null
}

export function ArticleBody({ title, featuredImage, content }: Props) {
  return (
    <article>
      {/* Featured image — wider than text column */}
      {featuredImage && (
        <div className="mx-auto mb-12 max-w-5xl px-6">
          <div className="overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: "3px" }}>
            <Image
              src={featuredImage}
              alt={title}
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
      <div className="mx-auto max-w-3xl px-6 pb-20" style={{ paddingTop: featuredImage ? 0 : "0.5rem" }}>
        {content ? (
          <div
            className="blog-prose article-body"
            dangerouslySetInnerHTML={{ __html: safe(content) }}
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
  )
}
