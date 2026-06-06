// Server-side admin guard for API route handlers (Node runtime).
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./session";

// Returns the admin session payload, or null when not authenticated.
export async function getAdminFromCookie() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

// Throws a Response (401) when the caller is not an authenticated admin.
// Usage: `const admin = await requireAdmin();`
export async function requireAdmin() {
  const admin = await getAdminFromCookie();
  if (!admin) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return admin;
}
