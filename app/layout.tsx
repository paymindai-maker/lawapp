import type { Metadata } from "next"
import { Libre_Baskerville, Barlow } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

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
    default: "NEXGEN — Legal, Tax & Compliance Firm | Noida, India",
    template: "%s | NEXGEN",
  },
  description:
    "NEXGEN is Noida's integrated legal and tax firm. Advocates, Chartered Accountants, and compliance specialists serving Indian businesses since 2006. Business registration, GST, income tax, litigation, and mutual fund advisory.",
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
    siteName: "NEXGEN",
    title: "NEXGEN — Legal, Tax & Compliance Firm | Noida, India",
    description:
      "Noida's integrated legal and tax firm. Advocates, CAs, and compliance specialists serving Indian businesses since 2006.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "NEXGEN Legal & Tax" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXGEN — Legal, Tax & Compliance Firm | Noida, India",
    description:
      "Noida's integrated legal and tax firm. Advocates, CAs, and compliance specialists serving Indian businesses since 2006.",
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
      <body>{children}</body>
    </html>
  )
}
