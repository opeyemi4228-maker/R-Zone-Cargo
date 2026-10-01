// lib/fonts.js
// ─────────────────────────────────────────────────────────────────────────────
// SELF-HOSTED FONTS single source for Montserrat and Outfit.
//
// These were previously loaded per-file with next/font/google, which fetches
// the font CSS and files from fonts.googleapis.com AT BUILD TIME. The shared
// host has no outbound access to Google during a build, so the loader got an
// empty response and the build died with:
//   "An error occurred in `next/font`. TypeError: Cannot read properties of
//    null (reading '1')"  (next/dist/compiled/@next/font/dist/google/loader.js)
//
// The woff2 files in ./fonts are the same variable fonts Google serves (latin
// subset, SIL Open Font License), committed to the repo so a build needs no
// network at all. Import the instances from here instead of calling a font
// loader in each file: one @font-face per family instead of 47.
//
// Both are VARIABLE fonts, so a weight RANGE is declared and every weight in
// that range renders from the single file.
// ─────────────────────────────────────────────────────────────────────────────

import localFont from "next/font/local";

export const montserrat = localFont({
 src: "./fonts/Montserrat-latin.woff2",
 weight: "300 900",
 style: "normal",
 display: "swap",
 variable: "--font-montserrat",
 preload: true,
 fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const outfit = localFont({
 src: "./fonts/Outfit-latin.woff2",
 weight: "300 600",
 style: "normal",
 display: "swap",
 variable: "--font-outfit",
 preload: true,
 fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});
