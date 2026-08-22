// lib/year.js
// ─────────────────────────────────────────────────────────────────────────────
// Evergreen year helper. Keeps marketing copy current ("... 2026" -> "... 2027"
// etc.) WITHOUT touching real dates.
//
// CURRENT_YEAR is evaluated when the page is built/rendered on the server, so it
// updates automatically whenever the site is rebuilt (Hostinger rebuilds on every
// deploy). freshYear() bumps the authored base year (2026) up to the current year
// in DISPLAY text only, and is deliberately conservative:
//   • it is a no-op while the current year is still 2026 (nothing changes now);
//   • it skips ISO dates      (2026-08-22)  via the (?![\d-]) / (?<![\d-]) guards;
//   • it skips slug fragments (christmas-2026) via the same hyphen guards;
//   • it skips publish dates  ("22 August 2026") via the month-name lookbehind.
// Use it ONLY on marketing strings (titles, headings, descriptions, body copy),
// never on datePublished / dateModified / date fields.
// ─────────────────────────────────────────────────────────────────────────────

export const BASE_YEAR = 2026;
export const CURRENT_YEAR = new Date().getFullYear();

const MONTHS =
  "January|February|March|April|May|June|July|August|September|October|November|December";
const YEAR_RE = new RegExp(`(?<![\\d-])(?<!(?:${MONTHS}) )${BASE_YEAR}(?![\\d-])`, "g");

export function freshYear(value) {
  if (CURRENT_YEAR <= BASE_YEAR || typeof value !== "string") return value;
  return value.replace(YEAR_RE, String(CURRENT_YEAR));
}
