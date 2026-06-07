import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/serverAuth";
import { sendQuoteEmails } from "../../../lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only persist known fields from the public form.
const FIELDS = [
  "service", "cargoType", "weight", "items", "dimensions", "cargoValue",
  "notes", "direction", "fromCity", "toState", "collection", "targetDate",
  "deliveryAddress", "firstName", "lastName", "email", "phone", "company", "source",
];

function withSubmittedAt(q) {
  return { ...q, submittedAt: q.createdAt };
}

// GET /api/quotes — admin only
export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res;
  }
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(quotes.map(withSubmittedAt));
}

// POST /api/quotes — public submission
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body?.firstName?.trim() || !body?.lastName?.trim()) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(body?.email || "")) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!body?.phone?.trim()) {
    return Response.json({ error: "Phone number is required." }, { status: 400 });
  }

  const data = {};
  for (const f of FIELDS) data[f] = body[f] != null ? String(body[f]) : null;
  data.firstName = body.firstName.trim();
  data.lastName = body.lastName.trim();
  data.email = body.email.trim();
  data.phone = body.phone.trim();

  const quote = await prisma.quote.create({ data });

  // Await email so it completes before the serverless function freezes on
  // return (Vercel kills un-awaited promises). Still best-effort: a failure
  // here is logged but never fails the submission.
  try {
    await sendQuoteEmails(quote);
  } catch (e) {
    console.error("[quotes] email error", e);
  }

  return Response.json({ ok: true, id: quote.id }, { status: 201 });
}
