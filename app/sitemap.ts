import type { MetadataRoute } from "next"
import { getAllServiceSlugs } from "@/lib/firestore/services"
import { getAllBlogSlugs } from "@/lib/firestore/blog"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexgen.in"

const url = (path: string) => `${SITE_URL}${path}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, blogSlugs] = await Promise.all([
    getAllServiceSlugs(),
    getAllBlogSlugs(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: url("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: url("/services"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/blog"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: url("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/team"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: url(`/services/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: url(`/blog/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
