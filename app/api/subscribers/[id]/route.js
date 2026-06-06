import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/serverAuth";

// DELETE /api/subscribers/[id] — admin only
export async function DELETE(_req, { params }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res;
  }
  const { id } = await params;
  try {
    await prisma.subscriber.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Subscriber not found." }, { status: 404 });
  }
}
