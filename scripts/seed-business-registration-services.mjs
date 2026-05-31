/**
 * Seed the Business Registration service category from the extracted PDF data.
 *
 * Dry run:
 *   node --env-file=.env.local scripts/seed-business-registration-services.mjs
 *
 * Write to Firestore:
 *   node --env-file=.env.local scripts/seed-business-registration-services.mjs --write
 */

import { readFileSync } from "node:fs"
import { cert, initializeApp } from "firebase-admin/app"
import { FieldValue, getFirestore } from "firebase-admin/firestore"

const CATEGORY_SLUG = "business-registration"
const WRITE_ENABLED = process.argv.includes("--write")
const services = JSON.parse(
  readFileSync(new URL("./data/business-registration-services.json", import.meta.url), "utf8"),
)

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function validateService(service, index) {
  const label = `services[${index}]`

  assert(service && typeof service === "object", `${label} must be an object`)
  assert(typeof service.title === "string" && service.title.trim(), `${label}.title is required`)
  assert(
    typeof service.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug),
    `${label}.slug must be a kebab-case slug`,
  )
  assert(typeof service.icon === "string" && service.icon.trim(), `${label}.icon is required`)
  assert(
    typeof service.shortDescription === "string" && service.shortDescription.trim(),
    `${label}.shortDescription is required`,
  )
  assert(
    typeof service.hero?.heading === "string" &&
      typeof service.hero?.subheading === "string" &&
      typeof service.hero?.ctaText === "string",
    `${label}.hero must contain heading, subheading, and ctaText`,
  )
  assert(
    typeof service.quickInfo?.timeline === "string" &&
      typeof service.quickInfo?.consultation === "string" &&
      typeof service.quickInfo?.startingPrice === "string",
    `${label}.quickInfo must contain timeline, consultation, and startingPrice`,
  )

  for (const field of [
    "benefits",
    "eligibility",
    "benefitItems",
    "eligibilityItems",
    "requiredDocuments",
    "processSteps",
    "whyChooseUs",
    "faqs",
    "relatedServices",
  ]) {
    assert(Array.isArray(service[field]), `${label}.${field} must be an array`)
  }

  assert(
    typeof service.seo?.title === "string" &&
      typeof service.seo?.description === "string" &&
      typeof service.seo?.keywords === "string",
    `${label}.seo must contain title, description, and keywords`,
  )
  assert(["draft", "published"].includes(service.status), `${label}.status is invalid`)
}

function validateServices() {
  assert(Array.isArray(services) && services.length > 0, "Seed data must contain at least one service")

  services.forEach(validateService)

  const slugs = services.map((service) => service.slug)
  assert(new Set(slugs).size === slugs.length, "Seed data contains duplicate service slugs")
}

function requireEnvironmentVariable(name) {
  const value = process.env[name]
  assert(value, `Missing required environment variable: ${name}`)
  return value
}

function createFirestore() {
  const app = initializeApp({
    credential: cert({
      projectId: requireEnvironmentVariable("FIREBASE_ADMIN_PROJECT_ID"),
      clientEmail: requireEnvironmentVariable("FIREBASE_ADMIN_CLIENT_EMAIL"),
      privateKey: requireEnvironmentVariable("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n"),
    }),
  })

  return getFirestore(app)
}

async function seed() {
  validateServices()

  console.log(`${WRITE_ENABLED ? "Writing" : "Dry run:"} ${services.length} services`)
  for (const service of services) {
    console.log(`- ${service.slug}`)
  }

  if (!WRITE_ENABLED) {
    console.log("\nNo Firestore writes performed. Re-run with --write to seed the category.")
    return
  }

  const db = createFirestore()
  const categorySnapshot = await db
    .collection("service_categories")
    .where("slug", "==", CATEGORY_SLUG)
    .limit(1)
    .get()

  assert(
    !categorySnapshot.empty,
    `Category "${CATEGORY_SLUG}" was not found in service_categories. Create it in the CMS first.`,
  )

  const categoryId = categorySnapshot.docs[0].id
  const batch = db.batch()

  for (const service of services) {
    batch.set(db.collection("services").doc(service.slug), {
      ...service,
      categoryId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }

  await batch.commit()
  console.log(`\nSeeded ${services.length} services into category "${CATEGORY_SLUG}" (${categoryId}).`)
}

try {
  await seed()
} catch (error) {
  console.error("Seed failed:", error instanceof Error ? error.message : error)
  process.exitCode = 1
}
