import type { ReactNode } from "react"
import type { ServiceDoc, ServiceCategoryDoc } from "@/types"
import { ScalesIllustration, LedgerGrowthIllustration } from "@/components/common/bento"

// ─── Columns (company registration) ─────────────────────────────────────────

function ColumnsIllustration() {
  return (
    <svg
      viewBox="0 0 220 170"
      width="100%"
      style={{ maxWidth: "260px", height: "auto", display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Pediment */}
      <path
        d="M 20 50 L 110 18 L 200 50 Z"
        fill="none"
        stroke="var(--fw-navy)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M 36 50 L 110 28 L 184 50" fill="none" stroke="oklch(0.22 0.045 258 / 0.25)" strokeWidth="1" />
      {/* Entablature */}
      <rect x="26" y="50" width="168" height="8" fill="var(--fw-navy)" />
      <rect x="22" y="58" width="176" height="4" fill="oklch(0.22 0.045 258 / 0.3)" />
      {/* Columns */}
      {[40, 80, 130, 170].map((x) => (
        <g key={x}>
          <rect x={x - 7} y="64" width="14" height="78" fill="none" stroke="var(--fw-navy)" strokeWidth="1.2" />
          <line x1={x - 4} y1="68" x2={x - 4} y2="138" stroke="oklch(0.22 0.045 258 / 0.25)" strokeWidth="0.8" />
          <line x1={x + 4} y1="68" x2={x + 4} y2="138" stroke="oklch(0.22 0.045 258 / 0.25)" strokeWidth="0.8" />
        </g>
      ))}
      {/* Capitals */}
      {[40, 80, 130, 170].map((x) => (
        <rect key={`cap-${x}`} x={x - 9} y="62" width="18" height="3" fill="var(--fw-navy)" />
      ))}
      {/* Base */}
      <rect x="14" y="142" width="192" height="6" fill="var(--fw-navy)" />
      <rect x="10" y="148" width="200" height="4" fill="oklch(0.22 0.045 258 / 0.25)" />
      {/* Gold finial */}
      <circle cx="110" cy="14" r="3" fill="var(--fw-gold)" />
    </svg>
  )
}

// ─── Document (contracts / advisory) ────────────────────────────────────────

function DocumentIllustration() {
  return (
    <svg
      viewBox="0 0 220 170"
      width="100%"
      style={{ maxWidth: "260px", height: "auto", display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Back document */}
      <rect
        x="38"
        y="22"
        width="120"
        height="130"
        rx="3"
        fill="oklch(0.97 0.005 258)"
        stroke="oklch(0.22 0.045 258 / 0.25)"
        strokeWidth="1"
      />
      {/* Front document */}
      <rect
        x="58"
        y="34"
        width="120"
        height="130"
        rx="3"
        fill="var(--card)"
        stroke="var(--fw-navy)"
        strokeWidth="1.4"
      />
      {/* Header bar */}
      <rect x="68" y="44" width="60" height="4" rx="1" fill="var(--fw-navy)" />
      {/* Text lines */}
      {[60, 72, 84, 96, 108, 120, 132].map((y) => (
        <line
          key={y}
          x1="68"
          y1={y}
          x2={y === 132 ? 130 : 168}
          y2={y}
          stroke="oklch(0.22 0.045 258 / 0.2)"
          strokeWidth="1"
        />
      ))}
      {/* Signature line */}
      <line x1="68" y1="148" x2="120" y2="148" stroke="var(--fw-navy)" strokeWidth="1.2" />
      {/* Gold seal */}
      <circle cx="150" cy="146" r="10" fill="none" stroke="var(--fw-gold)" strokeWidth="1.5" />
      <circle cx="150" cy="146" r="5" fill="var(--fw-gold)" opacity="0.4" />
      <path
        d="M 144 146 L 148 150 L 156 142"
        fill="none"
        stroke="var(--fw-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Registry resolver ──────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, () => ReactNode> = {
  legal: () => <ScalesIllustration />,
  litigation: () => <ScalesIllustration />,
  advocacy: () => <ScalesIllustration />,
  tax: () => <LedgerGrowthIllustration />,
  gst: () => <LedgerGrowthIllustration />,
  audit: () => <LedgerGrowthIllustration />,
  accounting: () => <LedgerGrowthIllustration />,
  finance: () => <LedgerGrowthIllustration />,
  registration: () => <ColumnsIllustration />,
  incorporation: () => <ColumnsIllustration />,
  company: () => <ColumnsIllustration />,
  licensing: () => <ColumnsIllustration />,
  contract: () => <DocumentIllustration />,
  contracts: () => <DocumentIllustration />,
  advisory: () => <DocumentIllustration />,
  drafting: () => <DocumentIllustration />,
  agreement: () => <DocumentIllustration />,
}

function matchKey(input: string | undefined): (() => ReactNode) | null {
  if (!input) return null
  const k = input.toLowerCase()
  for (const key in CATEGORY_MAP) {
    if (k.includes(key)) return CATEGORY_MAP[key]
  }
  return null
}

export function getServiceSvg(
  category?: ServiceCategoryDoc | null,
  service?: ServiceDoc,
): ReactNode {
  const fromCategory = matchKey(category?.slug) ?? matchKey(category?.name)
  if (fromCategory) return fromCategory()
  const fromService = matchKey(service?.icon) ?? matchKey(service?.title)
  if (fromService) return fromService()
  return <LedgerGrowthIllustration />
}

export { ColumnsIllustration, DocumentIllustration }
