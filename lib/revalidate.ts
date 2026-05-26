/**
 * Fire-and-forget revalidation after admin saves.
 * Calls /api/revalidate which triggers Next.js ISR cache purge.
 */
export async function revalidateAfterSave(paths: string[]) {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    })
  } catch {
    // Non-blocking — failure here is acceptable; pages will revalidate on timer anyway
  }
}
