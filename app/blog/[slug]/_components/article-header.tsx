import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { tagColor } from "@/app/blog/_components/blog-utils"

interface Props {
  tag: string
  date: string
  title: string
  excerpt: string
  minutes: number | null
}

export function ArticleHeader({ tag, date, title, excerpt, minutes }: Props) {
  const color = tagColor(tag)

  return (
    <>
      {/* Utility bar */}
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

      {/* Article header */}
      <header className="mx-auto max-w-3xl px-6 pb-10 pt-14">
        <div className="mb-5 flex items-center gap-3 text-xs">
          <span className="font-bold uppercase tracking-widest" style={{ color }}>{tag}</span>
          <span style={{ color: "var(--border)" }}>—</span>
          <span style={{ color: "var(--muted-foreground)" }}>{date}</span>
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
          {title}
        </h1>

        <p
          className="mt-5 text-lg leading-relaxed"
          style={{ color: "var(--muted-foreground)", maxWidth: "62ch" }}
        >
          {excerpt}
        </p>
      </header>
    </>
  )
}
