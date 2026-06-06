import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/serverAuth";
import { sendContactEmails } from "../../../lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function withSubmittedAt(c) {
  return { ...c, submittedAt: c.createdAt };
}

// GET /api/contacts — admin only
export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res;
  }
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(contacts.map(withSubmittedAt));
}

// POST /api/contacts — public submission
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body?.name?.trim()) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(body?.email || "")) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!body?.message?.trim()) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const contact = await prisma.contact.create({
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone ? String(body.phone) : null,
      enquiryType: body.enquiryType ? String(body.enquiryType) : null,
      enquiryLabel: body.enquiryLabel ? String(body.enquiryLabel) : null,
      subject: body.subject ? String(body.subject) : null,
      message: body.message.trim(),
    },
  });

  sendContactEmails(contact).catch((e) => console.error("[contacts] email error", e));

  return Response.json({ ok: true, id: contact.id }, { status: 201 });
}
