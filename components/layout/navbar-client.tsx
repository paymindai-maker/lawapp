"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Scale, Menu, ChevronDown, ChevronRight, Plus, Minus, MessageCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CONTACT_INFO } from "@/lib/data"
import type { ServiceCategoryDoc, ServiceDoc } from "@/types"

const WA_MSG = "Hi NEXGEN, I'd like to discuss your legal, tax, and compliance services. Please share details and the next steps."
const WA_URL = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(WA_MSG)}`

interface NavbarClientProps {
  categories: ServiceCategoryDoc[]
  services: ServiceDoc[]
}

const ABOUT_LINKS = [
  { label: "Our Firm", href: "/about?tab=firm", note: "Who we are" },
  { label: "Why NEXGEN", href: "/about?tab=why", note: "Our advantage" },
  { label: "How We Work", href: "/about?tab=process", note: "The process" },
  { label: "Leadership", href: "/about?tab=team", note: "The people" },
]

export function NavbarClient({ categories, services }: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [activeCatId, setActiveCatId] = useState<string | null>(categories[0]?.id ?? null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Close menus on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false)
        setAboutOpen(false)
      }
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [])

  const servicesByCategory = useMemo(() => {
    const map = new Map<string, ServiceDoc[]>()
    for (const svc of services) {
      const arr = map.get(svc.categoryId) ?? []
      arr.push(svc)
      map.set(svc.categoryId, arr)
    }
    return map
  }, [services])

  const hasMega = categories.length > 0

  function openMenu(which: "services" | "about") {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (which === "services") {
      setServicesOpen(true)
      setAboutOpen(false)
      if (!activeCatId && categories[0]) setActiveCatId(categories[0].id)
    } else {
      setAboutOpen(true)
      setServicesOpen(false)
    }
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setServicesOpen(false)
      setAboutOpen(false)
    }, 180)
  }

  const activeServices = activeCatId ? (servicesByCategory.get(activeCatId) ?? []) : []
  const activeCategory = categories.find((c) => c.id === activeCatId) ?? null

  return (
    <header
      className="sticky top-0 z-50"
      data-scrolled={scrolled.toString()}
      style={{
        background: "var(--background)",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "border-color 200ms ease",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center"
            style={{ background: "var(--fw-navy)", borderRadius: "3px" }}
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
        <nav className="hidden items-center md:flex" style={{ gap: "0.25rem" }}>
          <NavItem href="/">Home</NavItem>

          {/* About — dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openMenu("about")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className="nav-trigger inline-flex items-center gap-1 px-3 py-2 text-sm font-medium"
              style={{ color: aboutOpen ? "var(--foreground)" : "var(--fw-navy-mid)" }}
              aria-expanded={aboutOpen}
            >
              About
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform duration-200"
                style={{ transform: aboutOpen ? "rotate(180deg)" : "none", opacity: 0.6 }}
              />
            </button>
          </div>

          {/* Services — mega menu */}
          <div
            className="relative"
            onMouseEnter={() => hasMega && openMenu("services")}
            onMouseLeave={scheduleClose}
          >
            {hasMega ? (
              <button
                type="button"
                className="nav-trigger inline-flex items-center gap-1 px-3 py-2 text-sm font-medium"
                style={{ color: servicesOpen ? "var(--foreground)" : "var(--fw-navy-mid)" }}
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-200"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "none", opacity: 0.6 }}
                />
              </button>
            ) : (
              <NavItem href="/services">Services</NavItem>
            )}
          </div>

          <NavItem href="/blog">Blog</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--fw-accent)",
              borderRadius: "3px",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 20px -6px oklch(0.55 0.22 258 / 0.45)",
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Talk to Us
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex h-9 w-9 items-center justify-center transition-colors hover:bg-accent"
              style={{ borderRadius: "3px" }}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" style={{ color: "var(--foreground)" }} />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto pt-10">
              <div className="flex flex-col gap-1 p-2">
                <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>

                {/* About accordion */}
                <MobileAccordion
                  label="About"
                  expanded={mobileExpanded === "about"}
                  onToggle={() =>
                    setMobileExpanded(mobileExpanded === "about" ? null : "about")
                  }
                >
                  {ABOUT_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="py-2 text-sm"
                      style={{ color: "var(--fw-navy-mid)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </MobileAccordion>

                {/* Services accordion */}
                {hasMega ? (
                  <MobileAccordion
                    label="Services"
                    expanded={mobileExpanded === "services"}
                    onToggle={() =>
                      setMobileExpanded(mobileExpanded === "services" ? null : "services")
                    }
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/services/${cat.slug}`}
                        className="py-2 text-sm"
                        style={{ color: "var(--fw-navy-mid)" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="py-2 text-sm font-semibold"
                      style={{ color: "var(--fw-blue)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      All practice areas
                    </Link>
                  </MobileAccordion>
                ) : (
                  <MobileLink href="/services" onClick={() => setMobileOpen(false)}>
                    Services
                  </MobileLink>
                )}

                <MobileLink href="/blog" onClick={() => setMobileOpen(false)}>Blog</MobileLink>
                <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>

                <Separator className="my-3" />
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 text-center text-sm font-semibold text-white"
                  style={{ background: "var(--fw-navy)", borderRadius: "3px" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ─── About dropdown panel ─── */}
      {aboutOpen && (
        <div
          className="absolute left-0 right-0 hidden md:block"
          style={{ top: "100%" }}
          onMouseEnter={() => openMenu("about")}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div
              className="dropdown-enter w-72"
              style={{
                marginLeft: "calc(50% - 8rem)",
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                boxShadow: "0 12px 40px -12px oklch(0.13 0.055 264 / 0.18)",
                overflow: "hidden",
              }}
            >
              {ABOUT_LINKS.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setAboutOpen(false)}
                  className="mega-row flex items-center justify-between px-5 py-3.5"
                  style={{
                    borderTop: i > 0 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {l.label}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {l.note}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Services mega-menu panel ─── */}
      {servicesOpen && hasMega && (
        <div
          className="absolute left-0 right-0 hidden md:block"
          style={{ top: "100%" }}
          onMouseEnter={() => openMenu("services")}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div
              className="dropdown-enter"
              style={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                boxShadow: "0 16px 50px -16px oklch(0.13 0.055 264 / 0.20)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "minmax(240px, 280px) 1fr",
                maxWidth: "880px",
              }}
            >
              {/* Left: categories */}
              <div style={{ background: "var(--muted)", padding: "0.75rem" }}>
                <p
                  className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase"
                  style={{ color: "var(--muted-foreground)", letterSpacing: "0.14em" }}
                >
                  Practice Areas
                </p>
                {categories.map((cat) => {
                  const active = cat.id === activeCatId
                  return (
                    <Link
                      key={cat.id}
                      href={`/services/${cat.slug}`}
                      onMouseEnter={() => setActiveCatId(cat.id)}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 text-sm transition-colors"
                      style={{
                        borderRadius: "3px",
                        background: active ? "var(--background)" : "transparent",
                        color: active ? "var(--fw-navy)" : "var(--fw-navy-mid)",
                        fontWeight: active ? 600 : 500,
                      }}
                    >
                      {cat.name}
                      <ChevronRight
                        className="h-3.5 w-3.5"
                        style={{ opacity: active ? 0.9 : 0.3 }}
                      />
                    </Link>
                  )
                })}
              </div>

              {/* Right: services in active category */}
              <div style={{ padding: "1.5rem 1.75rem" }}>
                <div className="mb-4 flex items-baseline justify-between">
                  <h3
                    className="text-sm font-bold"
                    style={{ color: "var(--foreground)", letterSpacing: "0.01em" }}
                  >
                    {activeCategory?.name ?? "Services"}
                  </h3>
                  {activeCategory && (
                    <Link
                      href={`/services/${activeCategory.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-semibold"
                      style={{ color: "var(--fw-blue)" }}
                    >
                      View all →
                    </Link>
                  )}
                </div>

                {activeServices.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "0.25rem 1.5rem",
                    }}
                  >
                    {activeServices.slice(0, 10).map((svc) => (
                      <Link
                        key={svc.id}
                        href={`/services/${svc.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="mega-service py-2 text-sm"
                        style={{ color: "var(--fw-navy-mid)" }}
                      >
                        {svc.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="py-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    Services in this area are being added.
                  </p>
                )}

                {activeCategory?.description && (
                  <p
                    className="mt-5 max-w-[52ch] border-t pt-4 text-xs leading-relaxed"
                    style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}
                  >
                    {activeCategory.description.length > 140
                      ? activeCategory.description.slice(0, 140) + "…"
                      : activeCategory.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="nav-trigger px-3 py-2 text-sm font-medium"
      style={{ color: "var(--fw-navy-mid)" }}
    >
      {children}
    </Link>
  )
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-3 text-base font-medium"
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </Link>
  )
}

function MobileAccordion({
  label,
  expanded,
  onToggle,
  children,
}: {
  label: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-base font-medium"
        style={{ color: "var(--foreground)" }}
      >
        {label}
        {expanded ? (
          <Minus className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        ) : (
          <Plus className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        )}
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 240ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="flex flex-col pb-2 pl-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
