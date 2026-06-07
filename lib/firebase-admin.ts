import "server-only"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

function getAdminApp() {
  return (
    getApps().find((a) => a.name === "admin") ||
    initializeApp(
      {
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      },
      "admin"
    )
  )
}

export const adminAuth = {
  verifyIdToken: (...args: Parameters<ReturnType<typeof getAuth>["verifyIdToken"]>) =>
    getAuth(getAdminApp()).verifyIdToken(...args),
  createSessionCookie: (...args: Parameters<ReturnType<typeof getAuth>["createSessionCookie"]>) =>
    getAuth(getAdminApp()).createSessionCookie(...args),
  verifySessionCookie: (...args: Parameters<ReturnType<typeof getAuth>["verifySessionCookie"]>) =>
    getAuth(getAdminApp()).verifySessionCookie(...args),
  setCustomUserClaims: (...args: Parameters<ReturnType<typeof getAuth>["setCustomUserClaims"]>) =>
    getAuth(getAdminApp()).setCustomUserClaims(...args),
}

function getAdminDb() {
  return getFirestore(getAdminApp())
}
