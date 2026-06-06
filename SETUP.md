# R-Zone Cargo — Backend Setup

The site now stores quotes, contact messages and newsletter subscribers in a
**Postgres** database (via **Prisma**), sends email through **Resend**, and
protects the `/admin` panel with a real server-side session (httpOnly cookie).

Everything is driven by environment variables in `.env`. Below is exactly how to
get each value.

---

## 1. Database — `DATABASE_URL` (Postgres)

You need a Postgres database. The easiest free option is **Neon** (recommended)
or **Supabase**. Both give you a connection string.

### Option A — Neon (recommended, free tier)
1. Go to <https://neon.tech> and sign up.
2. Click **Create Project** → pick a region close to your users (e.g. London).
3. On the project dashboard, find **Connection string** → copy the
   `postgresql://...` URL (use the "Pooled connection" string).
4. Paste it into `.env` as `DATABASE_URL`.

### Option B — Supabase (free tier)
1. Go to <https://supabase.com> → **New project**.
2. Settings → **Database** → **Connection string** → **URI**.
3. Replace `[YOUR-PASSWORD]` with your DB password and paste into `DATABASE_URL`.

### Option C — Local Postgres
If you have Postgres installed locally:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rzonecargo"
```

### Create the tables
Once `DATABASE_URL` is set, run:
```bash
npm run db:push        # creates the Quote / Contact / Subscriber tables
```
(For production with migration history, use `npm run db:migrate` instead.)

You can browse your data anytime with:
```bash
npm run db:studio      # opens Prisma Studio in the browser
```

---

## 2. Email — `RESEND_API_KEY` (Resend)

1. Go to <https://resend.com> and sign up (free tier: 3,000 emails/month).
2. In the dashboard → **API Keys** → **Create API Key** → copy it
   (it starts with `re_...`).
3. Paste into `.env` as `RESEND_API_KEY`.

### The "from" address — `RESEND_FROM`
- **To test immediately:** leave it as the sandbox value
  `R-Zone Cargo <onboarding@resend.dev>`. Note: sandbox emails can only be sent
  to the email you signed up with.
- **For production:** verify your domain in Resend
  (**Domains → Add Domain → add the DNS records** at your domain registrar).
  Once verified, set e.g.
  `RESEND_FROM="R-Zone Cargo <no-reply@r-zoneenterprises.com>"`.

### Where notifications go — `ADMIN_NOTIFY_EMAIL`
Set this to the inbox that should receive every new quote / contact alert, e.g.
`info@r-zoneenterprises.com`.

---

## 3. Admin login

These control who can sign in at `/admin/login`:

| Variable | What to put |
|---|---|
| `ADMIN_EMAIL` | The admin's email, e.g. `admin@rzonecargo.com` |
| `ADMIN_PASSWORD` | A strong password — **change the placeholder** |
| `ADMIN_SESSION_SECRET` | A long random string (one was generated for you in `.env`) |

To regenerate the session secret:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

---

## 4. Run it

```bash
npm install        # installs deps + generates the Prisma client
npm run db:push    # create tables (after DATABASE_URL is set)
npm run dev        # http://localhost:3000
```

Then:
- Submit the **/quote**, **/contact** forms and the footer newsletter — data
  lands in Postgres and emails fire via Resend.
- Sign in at **/admin/login** with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

---

## Deploying (Vercel)

1. Add all the `.env` variables in **Vercel → Project → Settings → Environment Variables**.
2. Use a **pooled** Postgres connection string (Neon/Supabase give you one) —
   serverless functions open many short-lived connections.
3. The build runs `prisma generate` automatically (see `package.json` → `build`).
4. Run `npm run db:push` once against the production database (or use
   `prisma migrate deploy` in your pipeline).

---

## How it fits together

```
Public forms ──POST──► /api/quotes, /api/contacts, /api/subscribers
                          │
                          ├─► Prisma ─► Postgres   (saved)
                          └─► Resend  ─► email      (admin alert + customer ack)

Admin panel  ──fetch──► /api/* (GET/PATCH/DELETE)  ← guarded by session cookie
/admin/*     ──────────► middleware.js verifies the cookie, else → /admin/login
```

Key files:
- `prisma/schema.prisma` — data models
- `lib/prisma.js` — DB client
- `lib/resend.js` — email templates + sending
- `lib/session.js` / `lib/serverAuth.js` — auth
- `middleware.js` — protects `/admin` pages
- `app/api/**` — the endpoints
- `lib/adminAuth.js` — client-side fetch helpers used by the pages
