import { NavbarClient } from "./navbar-client"
import { getAllCategories, getAllPublishedServices } from "@/lib/firestore/services"

export async function Navbar() {
  const [categories, services] = await Promise.all([
    getAllCategories(),
    getAllPublishedServices(),
  ])
  return <NavbarClient categories={categories} services={services} />
}
