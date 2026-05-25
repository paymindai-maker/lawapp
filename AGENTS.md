# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

**Fonts:** `Abril Fatface` (`--font-display`) for headings/numbers, `Barlow` (`--font-sans`) for body — both injected as CSS variables in `app/layout.tsx`.

**Theme:** Tailwind CSS v4 with OKLCH color tokens in `app/globals.css`. Dark mode via `next-themes` (`ThemeProvider` in `app/layout.tsx`). Toggle: `ThemeToggle` component in `components/ui/theme-toggle.tsx`, mounted in navbar. Primary blue: `oklch(0.50 0.21 255)`. ForLaw brand tokens prefixed `--fw-*`. Dark-mode brand token overrides are in the `.dark` block at the bottom of `globals.css`.

**Data layer (current):** Static typed arrays in `lib/data.ts` (services, team, blog posts, testimonials, stats, nav, footer). To add or change content, edit `lib/data.ts` directly.

**Data layer (planned — Firebase Firestore):** All dynamic content (services, blogs, team members, testimonials) will migrate to Firebase Firestore. Fetch server-side in Next.js Server Components using the Firebase Admin SDK. Client-side reads (CMS dashboard) use the Firebase JS SDK.

**Auth:** Firebase Auth with Google sign-in. Admin roles are granted via Firebase custom claims (`admin: true`). Middleware at `middleware.ts` will protect `/admin` routes by verifying the ID token's custom claim. Non-admin Google users get read-only access.

**CMS dashboard (`app/admin/`):** Protected area for managing Firestore content. `app/admin/layout.tsx` wraps all admin pages. Routes planned: `/admin/services`, `/admin/blog`, `/admin/team`. The auth layer uses Firebase custom claims — users must have `admin: true` in their token to access any `/admin` route.

**SEO:** Each page exports a `generateMetadata` (or static `metadata`) object using the Next.js Metadata API. Dynamic routes (`/services/[slug]`, `/blog/[slug]`) use `generateMetadata` to pull title/description from Firestore (or `lib/data.ts` until migration). `app/layout.tsx` sets default metadata with `metadataBase`.

**Type definitions:** `types/index.ts` — `Service`, `TeamMember`, `BlogPost`, `Testimonial`, `StatItem`, `NavLink`, `FooterColumn`.

**Component layers:**
- `components/ui/` — shadcn primitives + `ThemeToggle`
- `components/common/` — reusable site-specific cards (`ServiceCard`, `TeamCard`, `TestimonialCard`, `BlogCard`), decoratives (`SectionLabel`, `CrosshatchBg`, `DotGridBg`, `FloatingShape`, `HorizontalRulesBg`), shape dividers (`DiagonalDivider`, `WaveDivider`)
- `components/layout/` — `Navbar` (sticky, scroll-aware, dark-mode aware via `.navbar-bg` CSS class), `Footer`
- `components/sections/home/` — one file per homepage section

**Routing:** Each route in `app/` gets its own layout. Homepage uses `app/layout.tsx` shared layout. Every other page (`/services`, `/blog`, `/team`, `/about`, `/contact`, `/admin`) must have its own `layout.tsx` with a unique design. Dynamic segments: `app/services/[slug]/page.tsx` and `app/blog/[slug]/page.tsx`.

**Section dividers pattern:** Homepage sections alternate dark (`--fw-navy` bg) and light (`--fw-surface` bg). Transitions use `clip-path: polygon(...)` with 72px offset and matching negative `marginTop`. `DiagonalDivider` and `WaveDivider` SVG components are placed at section bottoms. All clip-path sections use `paddingTop: "calc(72px + 5rem)"` and `marginTop: "-72px"`.

**Path alias:** `@/` maps to repo root. Use `@/components/...`, `@/lib/...`, `@/types` etc.
