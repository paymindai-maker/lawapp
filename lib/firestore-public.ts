/**
 * Public Firestore reads — uses firebase/firestore/lite with NEXT_PUBLIC_* config.
 * No admin credentials needed. Safe at build time, on edge, everywhere.
 *
 * Use this for ALL public-facing data fetches (services, blog, categories).
 * Keep firebase-admin ONLY for: proxy.ts auth, admin API routes, admin saves.
 */
import { initializeApp, getApps } from "firebase/app"
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type DocumentData,
} from "firebase/firestore/lite"

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

function getPublicApp() {
  return (
    getApps().find((a) => a.name === "public") ??
    initializeApp(config, "public")
  )
}

export function getPublicDb() {
  return getFirestore(getPublicApp())
}

/**
 * Converts a Firestore document snapshot to a plain serializable object.
 * Turns Timestamp fields into ISO strings so they're safe to pass to Client Components.
 */
export function toPlain<T>(id: string, data: DocumentData): T {
  const out: Record<string, unknown> = { id }
  for (const [key, val] of Object.entries(data)) {
    out[key] = val instanceof Timestamp ? val.toDate().toISOString() : val
  }
  return out as T
}

export { collection, doc, getDoc, getDocs, query, where, orderBy, limit }
