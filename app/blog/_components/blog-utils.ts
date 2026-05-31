import sanitizeHtml from "sanitize-html"

// ─── HTML sanitizer ───────────────────────────────────────────────────────────

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

export function safe(html: string) {
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

export function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "oklch(0.46 0.05 255)"
}

// ─── Reading time ─────────────────────────────────────────────────────────────

export function readingTime(html?: string) {
  if (!html) return null
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
  if (words === 0) return null
  return Math.max(1, Math.round(words / 200))
}
