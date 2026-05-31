import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const BASE = "oklch(0.93 0.006 255)"
const HIGHLIGHT = "oklch(0.97 0.003 255)"

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme baseColor={BASE} highlightColor={HIGHLIGHT}>
      {children}
    </SkeletonTheme>
  )
}

export function ServiceRowsSkeleton() {
  return (
    <Wrap>
      <section
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton width={80} height={11} borderRadius={2} />
          <div style={{ marginTop: 12, marginBottom: 64 }}>
            <Skeleton width={280} height={44} borderRadius={2} />
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-6 py-7"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <Skeleton width={40} height={32} borderRadius={2} />
                <div style={{ flex: 1 }}>
                  <Skeleton width={200} height={18} borderRadius={2} />
                  <div style={{ marginTop: 8 }}>
                    <Skeleton width="70%" height={13} borderRadius={2} />
                  </div>
                </div>
                <Skeleton width={20} height={20} circle />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Wrap>
  )
}

export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Wrap>
      <section
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton width={80} height={11} borderRadius={2} />
          <div style={{ marginTop: 12, marginBottom: 40 }}>
            <Skeleton width={300} height={44} borderRadius={2} />
          </div>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                style={{ border: "1px solid var(--border)", borderRadius: 3, overflow: "hidden" }}
              >
                <div style={{ padding: "20px 24px 40px", background: "oklch(0.94 0.008 255)" }}>
                  <Skeleton width="75%" height={18} borderRadius={2} />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <Skeleton count={3} height={13} borderRadius={2} style={{ marginBottom: 6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Wrap>
  )
}

export function BlogCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Wrap>
      <section
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton width={80} height={11} borderRadius={2} />
          <div style={{ marginTop: 12, marginBottom: 40 }}>
            <Skeleton width={260} height={44} borderRadius={2} />
          </div>
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                style={{ border: "1px solid var(--border)", borderRadius: 3, padding: "20px 24px" }}
              >
                <Skeleton width={60} height={11} borderRadius={2} />
                <div style={{ marginTop: 12 }}>
                  <Skeleton height={22} borderRadius={2} />
                  <Skeleton width="80%" height={22} borderRadius={2} style={{ marginTop: 4 }} />
                </div>
                <div style={{ marginTop: 12 }}>
                  <Skeleton count={2} height={13} borderRadius={2} style={{ marginBottom: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Wrap>
  )
}
