/**
 * Route-level loading skeletons — used by Next.js loading.tsx files.
 * Shown instantly on navigation, before the server renders the page.
 */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const BASE = "oklch(0.93 0.006 255)"
const HL   = "oklch(0.97 0.003 255)"

function T({ children }: { children: React.ReactNode }) {
  return <SkeletonTheme baseColor={BASE} highlightColor={HL}>{children}</SkeletonTheme>
}

// ── Shared pieces ──────────────────────────────────────────────────────────

function NavbarShell() {
  return (
    <div
      style={{
        height: 60,
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between",
      }}
    >
      <Skeleton width={110} height={22} borderRadius={2} />
      <div style={{ display: "flex", gap: 32 }}>
        {[80, 60, 72, 56, 68].map((w, i) => (
          <Skeleton key={i} width={w} height={14} borderRadius={2} />
        ))}
      </div>
      <Skeleton width={120} height={34} borderRadius={2} />
    </div>
  )
}

function PageHeader({ titleWidth = 320 }: { titleWidth?: number }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
        padding: "4rem 24px 3rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Skeleton width={60} height={11} borderRadius={2} />
        <div style={{ marginTop: 12 }}>
          <Skeleton width={titleWidth} height={48} borderRadius={2} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Skeleton width={480} height={16} borderRadius={2} />
        </div>
      </div>
    </div>
  )
}

// ── Page-specific skeletons ────────────────────────────────────────────────

/** Homepage */
export function HomePageSkeleton() {
  return (
    <T>
      <NavbarShell />
      {/* Hero */}
      <div
        style={{
          minHeight: "min(82vh, 660px)",
          background: "var(--fw-navy)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SkeletonTheme baseColor="oklch(0.30 0.04 258)" highlightColor="oklch(0.36 0.04 258)">
          <div style={{ textAlign: "center" }}>
            <Skeleton width={320} height={14} borderRadius={2} />
            <div style={{ marginTop: 20 }}>
              <Skeleton width={480} height={52} borderRadius={2} />
              <Skeleton width={380} height={52} borderRadius={2} style={{ marginTop: 8 }} />
            </div>
            <div style={{ marginTop: 24 }}>
              <Skeleton width={360} height={18} borderRadius={2} />
            </div>
            <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center" }}>
              <Skeleton width={160} height={44} borderRadius={3} />
              <Skeleton width={160} height={44} borderRadius={3} />
            </div>
          </div>
        </SkeletonTheme>
      </div>
      {/* Services rows */}
      <div style={{ padding: "5rem 24px", maxWidth: 1280, margin: "0 auto" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: "flex", gap: 24, padding: "1.5rem 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
            <Skeleton width={48} height={36} borderRadius={2} />
            <div style={{ flex: 1 }}>
              <Skeleton width={200} height={20} borderRadius={2} />
              <Skeleton width={360} height={14} borderRadius={2} style={{ marginTop: 8 }} />
            </div>
            <Skeleton width={20} height={20} circle />
          </div>
        ))}
      </div>
    </T>
  )
}

/** Services listing */
export function ServicesPageSkeleton() {
  return (
    <T>
      <NavbarShell />
      <PageHeader titleWidth={420} />
      <div style={{ padding: "5rem 24px", maxWidth: 1280, margin: "0 auto" }}>
        {[1, 2, 3].map((group) => (
          <div key={group} style={{ marginBottom: "3rem" }}>
            <Skeleton width={180} height={24} borderRadius={2} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.25rem",
                marginTop: "1.5rem",
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 3, padding: "24px" }}>
                  <Skeleton width={140} height={18} borderRadius={2} />
                  <div style={{ marginTop: 12 }}>
                    <Skeleton count={3} height={13} borderRadius={2} style={{ marginBottom: 6 }} />
                  </div>
                  <Skeleton width={100} height={30} borderRadius={2} style={{ marginTop: 16 }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </T>
  )
}

/** Service detail page */
export function ServiceDetailSkeleton() {
  return (
    <T>
      <NavbarShell />
      {/* Breadcrumb */}
      <div style={{ padding: "1rem 24px", borderBottom: "1px solid var(--border)", maxWidth: 1280, margin: "0 auto" }}>
        <Skeleton width={220} height={12} borderRadius={2} />
      </div>
      {/* Hero band */}
      <div style={{ background: "oklch(0.97 0.008 258)", borderBottom: "1px solid var(--border)", padding: "4rem 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "52% 48%", gap: 32 }}>
          <div>
            <Skeleton width={120} height={11} borderRadius={2} />
            <div style={{ marginTop: 16 }}>
              <Skeleton width="90%" height={52} borderRadius={2} />
              <Skeleton width="70%" height={52} borderRadius={2} style={{ marginTop: 8 }} />
            </div>
            <div style={{ marginTop: 20 }}>
              <Skeleton count={2} height={16} borderRadius={2} style={{ marginBottom: 8 }} />
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
              <Skeleton width={160} height={44} borderRadius={3} />
              <Skeleton width={120} height={44} borderRadius={3} />
            </div>
          </div>
          <Skeleton height={280} borderRadius={4} />
        </div>
      </div>
      {/* Trust strip */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "1.25rem 24px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {[1, 2, 3].map((i) => <div key={i}><Skeleton width={80} height={10} borderRadius={2} /><Skeleton width={120} height={16} borderRadius={2} style={{ marginTop: 6 }} /></div>)}
      </div>
    </T>
  )
}

/** Blog listing */
export function BlogListSkeleton() {
  return (
    <T>
      <NavbarShell />
      <PageHeader titleWidth={280} />
      <div style={{ padding: "3.5rem 24px 5rem", maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 3, overflow: "hidden" }}>
              <Skeleton height={180} borderRadius={0} />
              <div style={{ padding: "20px 24px" }}>
                <Skeleton width={60} height={11} borderRadius={2} />
                <div style={{ marginTop: 10 }}>
                  <Skeleton height={20} borderRadius={2} />
                  <Skeleton width="80%" height={20} borderRadius={2} style={{ marginTop: 4 }} />
                </div>
                <div style={{ marginTop: 12 }}>
                  <Skeleton count={2} height={13} borderRadius={2} style={{ marginBottom: 4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </T>
  )
}

/** Blog post / article */
export function ArticleSkeleton() {
  return (
    <T>
      <NavbarShell />
      {/* Article header */}
      <div style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", padding: "4rem 24px 3rem", maxWidth: 800, margin: "0 auto" }}>
        <Skeleton width={80} height={11} borderRadius={2} />
        <div style={{ marginTop: 16 }}>
          <Skeleton height={52} borderRadius={2} />
          <Skeleton width="80%" height={52} borderRadius={2} style={{ marginTop: 8 }} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Skeleton count={2} height={16} borderRadius={2} style={{ marginBottom: 8 }} />
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 24 }}>
          <Skeleton width={80} height={12} borderRadius={2} />
          <Skeleton width={100} height={12} borderRadius={2} />
        </div>
      </div>
      {/* Featured image */}
      <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 24px" }}>
        <Skeleton height={400} borderRadius={3} />
      </div>
      {/* Body */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 5rem" }}>
        {[1, 2, 3].map((para) => (
          <div key={para} style={{ marginBottom: 24 }}>
            <Skeleton count={4} height={16} borderRadius={2} style={{ marginBottom: 8 }} />
          </div>
        ))}
      </div>
    </T>
  )
}

/** About / Team / Contact — generic editorial page */
export function EditorialPageSkeleton() {
  return (
    <T>
      <NavbarShell />
      <PageHeader titleWidth={380} />
      <div style={{ padding: "5rem 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 64 }}>
          <div>
            <Skeleton width={80} height={11} borderRadius={2} />
            <div style={{ marginTop: 12 }}>
              <Skeleton width={240} height={42} borderRadius={2} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Skeleton count={3} height={14} borderRadius={2} style={{ marginBottom: 8 }} />
            </div>
          </div>
          <div>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ padding: "1.5rem 0", borderBottom: "1px solid var(--border)" }}>
                <Skeleton width={200} height={18} borderRadius={2} />
                <div style={{ marginTop: 8 }}>
                  <Skeleton count={2} height={14} borderRadius={2} style={{ marginBottom: 6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </T>
  )
}
