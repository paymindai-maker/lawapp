import { serverTimestamp } from "firebase/firestore"
import type { CategoryFormValues } from "./category-form"

export function buildCategoryData(values: CategoryFormValues) {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    description: values.description.trim(),
    updatedAt: serverTimestamp(),
  }
}
