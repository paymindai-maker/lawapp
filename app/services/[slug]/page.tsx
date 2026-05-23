import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactSection } from "@/components/sections/home/contact-section"
import { SERVICES } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: `${service.title} | ForLaw`, description: service.description }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  const Icon = service.icon

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-24" style={{ background: "var(--fw-navy)" }}>
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-orb-drift rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--fw-blue), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-6">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 255)" }}
            >
              {service.num} / {SERVICES.length.toString().padStart(2, "0")}
            </p>
            <div className="flex items-start gap-5">
              <div
                className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Icon className="h-7 w-7" style={{ color: "oklch(0.72 0.16 255)" }} />
              </div>
              <h1
                className="text-4xl font-semibold md:text-5xl"
                style={{ fontFamily: "var(--font-heading)", color: "white" }}
              >
                {service.title}
              </h1>
            </div>
            <p
              className="mt-6 max-w-[60ch] text-base leading-relaxed"
              style={{ color: "oklch(0.65 0.05 255)" }}
            >
              {service.description}
            </p>
          </div>
        </section>

        {/* Process + FAQs */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 md:grid-cols-2">
              {/* Process */}
              <div>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--fw-blue)" }}
                >
                  Our Process
                </p>
                <h2
                  className="mb-8 text-2xl font-semibold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  How we work with you
                </h2>
                <ol className="flex flex-col gap-6">
                  {service.process.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: "var(--fw-blue)" }}
                      >
                        {i + 1}
                      </span>
                      <p className="pt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--fw-blue)" }}
                >
                  FAQs
                </p>
                <h2
                  className="mb-8 text-2xl font-semibold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Common questions
                </h2>
                <div className="flex flex-col gap-7">
                  {service.faqs.map((faq, i) => (
                    <div key={i}>
                      <p className="mb-2 font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                        {faq.q}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
