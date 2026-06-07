import { serverTimestamp } from "firebase/firestore"
import type { BlogFormValues } from "./blog-form"

export function buildBlogData(values: BlogFormValues) {
  return {
    slug: values.slug.trim(),
    tag: values.tag,
    title: values.title.trim(),
    date: values.date.trim(),
    excerpt: values.excerpt.trim(),
    featuredImage: values.featuredImage?.trim() ?? "",
    content: values.content?.trim() ?? "",
    updatedAt: serverTimestamp(),
  }
}
