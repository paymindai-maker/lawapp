/**
 * Run this script ONCE to grant admin access to a Google account.
 * Usage: node scripts/set-admin-claim.mjs <user-email>
 *
 * Requires FIREBASE_ADMIN_* env vars — copy .env.local.example to .env.local first.
 */

import { initializeApp, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const email = process.argv[2]
if (!email) {
  console.error("Usage: node scripts/set-admin-claim.mjs <user-email>")
  process.exit(1)
}

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
})

const auth = getAuth(app)

try {
  const user = await auth.getUserByEmail(email)
  await auth.setCustomUserClaims(user.uid, { admin: true })
  console.log(`✓ Admin claim set for ${email} (uid: ${user.uid})`)
  console.log("  The user must sign out and sign back in for the claim to take effect.")
} catch (err) {
  console.error("Error:", err.message)
  process.exit(1)
}
