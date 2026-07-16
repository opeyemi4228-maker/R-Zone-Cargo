import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/serverAuth";
import { sendSubscriberWelcome } from "../../../lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function withSubscribedAt(s) {
  return { ...s, subscribedAt: s.createdAt };
}

// GET /api/subscribers   admin only
export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res;
  }
  const subs = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(subs.map(withSubscribedAt));
}

// POST /api/subscribers   public newsletter sign-up
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body?.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  // Allow the same email to subscribe multiple times   each is its own entry.
  await prisma.subscriber.create({ data: { email } });

  // Await email so it completes before the serverless function freezes on
  // return (Vercel kills un-awaited promises). Still best-effort.
  try {
    await sendSubscriberWelcome(email);
  } catch (e) {
    console.error("[subscribers] email error", e);
  }

  return Response.json({ ok: true }, { status: 201 });
}
