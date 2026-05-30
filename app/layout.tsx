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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", libreBaskerville.variable, barlow.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
