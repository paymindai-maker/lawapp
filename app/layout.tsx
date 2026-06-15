import type { Metadata } from "next"
import { Libre_Baskerville, Barlow } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { MotionProvider } from "@/components/providers/motion-provider"

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexgen.in"
const OG_IMAGE = `${SITE_URL}/og-default.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexGen Associates LLP | Chartered Accountants & Legal Services in India",
    template: "%s | NexGen Associates LLP",
  },
  description:
    "NexGen Associates LLP is a full-service CA and legal advisory firm in India. Expert GST filing, tax planning, audit, company registration, and corporate legal services — all under one roof.",
  keywords: [
    "legal services Noida",
    "CA firm Noida",
    "business registration India",
    "GST compliance India",
    "income tax filing India",
    "litigation advocates Noida",
    "company registration Noida",
    "corporate law firm India",
  ],
  authors: [{ name: "NEXGEN", url: SITE_URL }],
  creator: "NEXGEN",
  publisher: "NEXGEN",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "NexGen Associates LLP",
    title: "NexGen Associates LLP | Chartered Accountants & Legal Services in India",
    description:
      "Full-service CA and legal advisory firm in India. GST, ITR, audit, company registration, contracts, and corporate legal — under one roof.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "NexGen Associates LLP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGen Associates LLP | Chartered Accountants & Legal Services in India",
    description:
      "Full-service CA and legal advisory firm in India. GST, ITR, audit, company registration, contracts, and corporate legal — under one roof.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={cn("antialiased", libreBaskerville.variable, barlow.variable)}
    >
      <body><MotionProvider>{children}</MotionProvider></body>
    </html>
  )
}
