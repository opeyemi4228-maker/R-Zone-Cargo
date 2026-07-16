// Client-side API helpers for the admin panel and public forms.
// These talk to the /api routes, which persist to Postgres via Prisma and
// send email via Resend. All functions are async and return plain data.

async function jsonOrThrow(res) {
 let data = null;
 try { data = await res.json(); } catch {}
 if (!res.ok) {
 throw new Error(data?.error || `Request failed (${res.status})`);
 }
 return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function adminLogin(email, password) {
 try {
 const res = await fetch("/api/admin/login", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ email, password }),
 });
 const data = await res.json().catch(() => ({}));
 if (!res.ok) return { ok: false, error: data?.error || "Invalid email or password." };
 return { ok: true, email: data.email };
 } catch {
 return { ok: false, error: "Network error please try again." };
 }
}

export async function adminLogout() {
 try {
 await fetch("/api/admin/logout", { method: "POST" });
 } catch {}
}

export async function isAdminAuthenticated() {
 try {
 const res = await fetch("/api/admin/me", { cache: "no-store" });
 return res.ok;
 } catch {
 return false;
 }
}

export async function getAdminSession() {
 try {
 const res = await fetch("/api/admin/me", { cache: "no-store" });
 if (!res.ok) return null;
 return res.json();
 } catch {
 return null;
 }
}

// ─── Newsletter subscribers ───────────────────────────────────────────────────

export async function saveSubscriber(email) {
 const res = await fetch("/api/subscribers", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ email }),
 });
 return jsonOrThrow(res);
}

export async function getSubscribers() {
 try {
 const res = await fetch("/api/subscribers", { cache: "no-store" });
 if (!res.ok) return [];
 return res.json();
 } catch {
 return [];
 }
}

export async function deleteSubscriber(id) {
 const res = await fetch(`/api/subscribers/${id}`, { method: "DELETE" });
 return jsonOrThrow(res);
}

// ─── Quote requests ───────────────────────────────────────────────────────────

export async function saveQuoteRequest(form) {
 const res = await fetch("/api/quotes", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(form),
 });
 return jsonOrThrow(res);
}

export async function getQuoteRequests() {
 try {
 const res = await fetch("/api/quotes", { cache: "no-store" });
 if (!res.ok) return [];
 return res.json();
 } catch {
 return [];
 }
}

export async function updateQuoteStatus(id, status) {
 const res = await fetch(`/api/quotes/${id}`, {
 method: "PATCH",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ status }),
 });
 return jsonOrThrow(res);
}

// ─── Contact messages ─────────────────────────────────────────────────────────

export async function saveContactMessage(form) {
 const res = await fetch("/api/contacts", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(form),
 });
 return jsonOrThrow(res);
}

export async function getContactMessages() {
 try {
 const res = await fetch("/api/contacts", { cache: "no-store" });
 if (!res.ok) return [];
 return res.json();
 } catch {
 return [];
 }
}

export async function markContactRead(id) {
 const res = await fetch(`/api/contacts/${id}`, {
 method: "PATCH",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ status: "Read" }),
 });
 return jsonOrThrow(res);
}
