# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Next.js + Turbopack)
npm run build        # Production build
npm run typecheck    # TypeScript check (no emit)
npm run lint         # ESLint
npm run format       # Prettier (writes in place)
```

No test suite configured yet.

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui components.

**Fonts:** `Spectral` (`--font-heading`) for headings, `Mulish` (`--font-sans`) for body — both injected as CSS variables in `app/layout.tsx`.

**Theme:** Tailwind CSS v4 with OKLCH color tokens defined in `app/globals.css`. Dark mode via `next-themes`. Primary color is a rich blue (`oklch(0.50 0.21 255)`).

**Data layer:** All site content (services, team, blog posts, testimonials, stats, nav, footer) lives as static typed arrays in `lib/data.ts`. No database or CMS yet — the admin dashboard (`app/admin/`) is a future phase. To add or change content, edit `lib/data.ts` directly.

**Type definitions:** `types/index.ts` — `Service`, `TeamMember`, `BlogPost`, `Testimonial`, `StatItem`, `NavLink`, `FooterColumn`. `Service` includes `slug`, `num`, `process[]`, `faqs[]`, and a `LucideIcon`.

**Component layers:**
- `components/ui/` — shadcn primitives (Button, Card, Badge, Avatar, etc.)
- `components/common/` — reusable site-specific cards and decoratives (`ServiceCard`, `TeamCard`, `TestimonialCard`, `BlogCard`, `SectionLabel`, `OrbBg`)
- `components/layout/` — `Navbar`, `Footer`
- `components/sections/home/` — one file per homepage section (`HeroSection`, `StatsStripe`, `ServicesPreview`, `WhyChooseUs`, `TeamPreview`, `TestimonialsSection`, `BlogPreview`, `ContactSection`)

**Routing:** Each route in `app/` is a page. Dynamic segments: `app/services/[slug]/page.tsx` and `app/blog/[slug]/page.tsx` — slugs must match keys in `lib/data.ts`. `app/admin/layout.tsx` wraps the future admin area.

**Path alias:** `@/` maps to repo root (`tsconfig.json` `paths`). Use `@/components/...`, `@/lib/...`, `@/types` etc.

**Adding a service:** Add an entry to `SERVICES` in `lib/data.ts` with a unique `slug` — the dynamic route picks it up automatically.
