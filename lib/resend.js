// Email delivery via Resend.
// All senders are best-effort: failures are logged but never block a submission.
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || "R-Zone Cargo <onboarding@resend.dev>";
const ADMIN_NOTIFY = process.env.ADMIN_NOTIFY_EMAIL;

const resend = apiKey ? new Resend(apiKey) : null;

const BRAND = "#0818A8";

async function send({ to, subject, html, replyTo }) {
  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set   skipping email:", subject);
    return { skipped: true };
  }
  if (!to) return { skipped: true };
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[resend] send failed:", error);
      return { error };
    }
    return { id: data?.id };
  } catch (err) {
    console.error("[resend] send threw:", err);
    return { error: err };
  }
}

// ─── Layout helpers ─────────────────────────────────────────────────────────
function shell(title, bodyHtml) {
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;padding:32px 0;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <div style="background:${BRAND};padding:20px 28px;">
        <span style="color:#fff;font-weight:800;letter-spacing:.04em;font-size:16px;text-transform:uppercase;">R-Zone Cargo</span>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 16px;font-size:18px;color:#0f172a;">${title}</h1>
        ${bodyHtml}
      </div>
      <div style="padding:16px 28px;border-top:1px solid #f1f5f9;color:#94a3b8;font-size:12px;">
        R-Zone Enterprises · Door-to-door cargo to Nigeria from the UK
      </div>
    </div>
  </div>`;
}

function rows(pairs) {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">${pairs
    .filter(([, v]) => v != null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#64748b;width:40%;vertical-align:top;">${k}</td><td style="padding:6px 0;font-weight:600;">${String(
          v
        )}</td></tr>`
    )
    .join("")}</table>`;
}

// ─── Quote emails ───────────────────────────────────────────────────────────
export async function sendQuoteEmails(q) {
  const name = `${q.firstName} ${q.lastName}`.trim();

  // Admin notification
  await send({
    to: ADMIN_NOTIFY,
    replyTo: q.email,
    subject: `New quote request   ${name}`,
    html: shell(
      "New quote request",
      rows([
        ["Name", name],
        ["Email", q.email],
        ["Phone", q.phone],
        ["Company", q.company],
        ["Service", q.service],
        ["Direction", q.direction],
        ["Cargo type", q.cargoType],
        ["Weight", q.weight ? `${q.weight} kg` : null],
        ["Items", q.items],
        ["Cargo value", q.cargoValue],
        ["From", q.fromCity],
        ["To", q.toState],
        ["Collection", q.collection],
        ["Target date", q.targetDate],
        ["Delivery address", q.deliveryAddress],
        ["Source", q.source],
        ["Notes", q.notes],
      ])
    ),
  });

  // Customer acknowledgement
  await send({
    to: q.email,
    subject: "We've received your quote request   R-Zone Cargo",
    html: shell(
      `Thanks, ${q.firstName}!`,
      `<p style="font-size:14px;color:#334155;line-height:1.6;">
        We've received your cargo quote request and our team will get back to you shortly,
        usually within one business day.</p>
       <p style="font-size:14px;color:#334155;line-height:1.6;">
        Need to reach us sooner? Call <strong>+44 800 772 0864</strong> or reply to this email.</p>`
    ),
  });
}

// ─── Contact emails ─────────────────────────────────────────────────────────
export async function sendContactEmails(c) {
  await send({
    to: ADMIN_NOTIFY,
    replyTo: c.email,
    subject: `New contact message   ${c.name}`,
    html: shell(
      "New contact message",
      rows([
        ["Name", c.name],
        ["Email", c.email],
        ["Phone", c.phone],
        ["Enquiry", c.enquiryLabel || c.enquiryType],
        ["Subject", c.subject],
        ["Message", c.message],
      ])
    ),
  });

  await send({
    to: c.email,
    subject: "We've received your message   R-Zone Cargo",
    html: shell(
      `Thanks for getting in touch, ${c.name}!`,
      `<p style="font-size:14px;color:#334155;line-height:1.6;">
        We've received your message and will reply as soon as possible.</p>
       <p style="font-size:14px;color:#334155;line-height:1.6;">
        For urgent enquiries, call <strong>+44 800 772 0864</strong>.</p>`
    ),
  });
}

// ─── Subscriber welcome ─────────────────────────────────────────────────────
export async function sendSubscriberWelcome(email) {
  // Admin notification   new subscriber
  await send({
    to: ADMIN_NOTIFY,
    replyTo: email,
    subject: `New newsletter subscriber   ${email}`,
    html: shell(
      "New newsletter subscriber",
      rows([
        ["Email", email],
        ["Subscribed", new Date().toLocaleString("en-GB")],
      ])
    ),
  });

  // Subscriber welcome
  await send({
    to: email,
    subject: "You're subscribed   R-Zone Cargo",
    html: shell(
      "Welcome aboard!",
      `<p style="font-size:14px;color:#334155;line-height:1.6;">
        Thanks for subscribing. You'll now receive shipping updates, pricing alerts and
        logistics insights from R-Zone Cargo.</p>`
    ),
  });
}
