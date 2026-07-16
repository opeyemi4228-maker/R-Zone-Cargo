import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/serverAuth";

const VALID_STATUS = ["Unread", "Read"];

// PATCH /api/contacts/[id]   update status (admin only)
export async function PATCH(req, { params }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res;
  }
  const { id } = await params;

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!VALID_STATUS.includes(body?.status)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { status: body.status },
    });
    return Response.json({ ok: true, status: contact.status });
  } catch {
    return Response.json({ error: "Message not found." }, { status: 404 });
  }
}

// DELETE /api/contacts/[id]   admin only
export async function DELETE(_req, { params }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res;
  }
  const { id } = await params;
  try {
    await prisma.contact.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Message not found." }, { status: 404 });
  }
}
