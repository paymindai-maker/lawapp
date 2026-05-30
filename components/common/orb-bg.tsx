interface CrosshatchBgProps {
  opacity?: number
  color?: string
}

export function CrosshatchBg({ opacity = 0.03, color = "oklch(0.45 0.06 252)" }: CrosshatchBgProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity,
      }}
    />
  )
}

interface DotGridBgProps {
  opacity?: number
  color?: string
  size?: number
}

export function DotGridBg({
  opacity = 0.07,
  color = "oklch(0.65 0.06 252)",
  size = 24,
}: DotGridBgProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  )
}

interface FloatingShapeProps {
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  color?: string
  opacity?: number
  animationClass?: string
  sides?: number
}

export function FloatingShape({
  size = 120,
  top,
  left,
  right,
  bottom,
  color = "oklch(0.45 0.06 252)",
  opacity = 0.06,
  animationClass = "animate-shape-float",
  sides = 6,
}: FloatingShapeProps) {
  const angle = 360 / sides
  const r = size / 2
  const points = Array.from({ length: sides }, (_, i) => {
    const a = (i * angle - 90) * (Math.PI / 180)
    return `${r + r * Math.cos(a)},${r + r * Math.sin(a)}`
  }).join(" ")

  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none absolute ${animationClass}`}
      style={{ top, left, right, bottom, opacity }}
    >
      <polygon
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

interface HorizontalRulesBgProps {
  opacity?: number
  color?: string
  spacing?: number
}

export function HorizontalRulesBg({
  opacity = 0.05,
  color = "oklch(0.65 0.06 252)",
  spacing = 40,
}: HorizontalRulesBgProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(transparent calc(${spacing}px - 1px), ${color} ${spacing}px)`,
        backgroundSize: `100% ${spacing}px`,
        opacity,
      }}
    />
  )
}
