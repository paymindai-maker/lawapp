"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Scale, Menu } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { NAV_LINKS } from "@/lib/data"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 navbar-bg"
      data-scrolled={scrolled.toString()}
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "var(--fw-blue)" }}
          >
            <Scale className="h-[18px] w-[18px] text-white" />
          </div>
          <span
            className="text-xl tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--foreground)" }}
          >
            NEX<span style={{ color: "var(--fw-blue)" }}>GEN</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-link text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Theme toggle */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "var(--fw-blue)" }}
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" style={{ color: "var(--foreground)" }} />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-10">
              <div className="flex flex-col gap-7 p-2">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-base font-medium"
                    style={{ color: "var(--foreground)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Separator />
                <Link
                  href="/contact"
                  className="btn-primary rounded-full py-2.5 text-center text-sm font-semibold text-white"
                  style={{ background: "var(--fw-blue)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get in touch
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
