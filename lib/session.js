// Admin session — signed JWT stored in an httpOnly cookie.
// Works on both the Node and Edge (middleware) runtimes via `jose`.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "rzone_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short — set a long random string in .env"
    );
  }
  return new TextEncoder().encode(s);
}

// Create a signed session token for the given admin email.
export async function createSessionToken(email) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

// Verify a token and return its payload, or null if invalid/expired.
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload?.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

// Cookie options shared between login (set) and logout (clear).
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  };
}
