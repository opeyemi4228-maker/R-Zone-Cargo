// TEMPORARY diagnostic   remove after debugging email delivery on Vercel.
// Reports which env vars the running deployment actually sees, and the raw
// result of a live Resend send. Does NOT leak secret values.
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || "";
  const notify = process.env.ADMIN_NOTIFY_EMAIL || "";

  const env = {
    RESEND_API_KEY_present: !!key,
    RESEND_API_KEY_len: key.length,
    RESEND_API_KEY_prefix: key.slice(0, 3),
    RESEND_FROM: from,
    ADMIN_NOTIFY_EMAIL: notify,
    DATABASE_URL_present: !!process.env.DATABASE_URL,
  };

  let send = { attempted: false };
  if (key && from && notify) {
    try {
      const resend = new Resend(key);
      const { data, error } = await resend.emails.send({
        from,
        to: notify,
        subject: "R-Zone Vercel debug send",
        html: "<p>Debug send from the live Vercel deployment.</p>",
      });
      send = { attempted: true, id: data?.id || null, error: error || null };
    } catch (e) {
      send = { attempted: true, threw: String(e?.message || e) };
    }
  }

  return Response.json({ env, send });
}
