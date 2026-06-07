import { serverTimestamp } from "firebase/firestore"
import type { ServiceFormValues } from "./service-form"

function compactList(values: { value: string }[]) {
  return values.reduce<string[]>((acc, item) => {
    const v = item.value.trim()
    if (v) acc.push(v)
    return acc
  }, [])
}

function compactFaqs(values: { q: string; a: string }[]) {
  return values.reduce<{ q: string; a: string }[]>((acc, f) => {
    const q = f.q.trim(), a = f.a.trim()
    if (q && a) acc.push({ q, a })
    return acc
  }, [])
}

export function buildServiceData(values: ServiceFormValues) {
  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    categoryId: values.categoryId,
    icon: values.icon,
    shortDescription: values.shortDescription.trim(),
    hero: {
      heading: values.hero.heading.trim(),
      subheading: values.hero.subheading.trim(),
      ctaText: values.hero.ctaText.trim(),
    },
    quickInfo: {
      timeline: values.quickInfo.timeline.trim(),
      consultation: values.quickInfo.consultation.trim(),
      startingPrice: values.quickInfo.startingPrice.trim(),
    },
    benefitItems: values.benefitItems.reduce<{ title: string; description: string; icon?: string }[]>((acc, b) => {
      const title = b.title.trim(), description = b.description.trim()
      if (title && description) acc.push({ title, description, ...(b.icon?.trim() ? { icon: b.icon.trim() } : {}) })
      return acc
    }, []),
    eligibilityItems: values.eligibilityItems.reduce<{ audience: string; note?: string }[]>((acc, e) => {
      const audience = e.audience.trim()
      if (audience) acc.push({ audience, ...(e.note?.trim() ? { note: e.note.trim() } : {}) })
      return acc
    }, []),
    // legacy fields cleared — kept in schema for backward compat reads
    benefits: [] as string[],
    eligibility: [] as string[],
    requiredDocuments: compactList(values.requiredDocuments),
    processSteps: compactList(values.processSteps),
    whyChooseUs: compactList(values.whyChooseUs),
    faqs: compactFaqs(values.faqs),
    relatedServices: compactList(values.relatedServices),
    seo: {
      title: values.seo.title.trim(),
      description: values.seo.description.trim(),
      keywords: values.seo.keywords.trim(),
    },
    content: values.content.trim(),
    featuredImage: values.featuredImage.trim(),
    status: values.status,
    updatedAt: serverTimestamp(),
  }
}
