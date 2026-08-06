// app/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Server wrapper for the homepage. The interactive homepage lives in
// components/HomeClient.jsx ("use client"), which cannot export `metadata`.
// This server component exists solely to give the homepage an explicit
// self-referential canonical, so Google never treats "/" (or its URL variants)
// as a "Duplicate without user-selected canonical". Title/description are
// inherited from the root layout's default metadata.
// ─────────────────────────────────────────────────────────────────────────────

import HomeClient from "@/components/HomeClient";

export const metadata = {
  alternates: { canonical: "https://r-zoneenterprises.com" },
};

export default function Page() {
  return <HomeClient />;
}
