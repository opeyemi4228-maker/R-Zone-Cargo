"use client";
// Inline share row for the editorial hero (Copy link + LinkedIn / Facebook / X).
// Client component so the copy-to-clipboard button works; kept tiny so the rest
// of the landing page stays a static server component.

import { useState, useCallback } from "react";

export default function ShareRow({ url, title }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    try {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  }, [url]);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn =
    "inline-flex items-center justify-center h-9 w-9 border border-white/40 hover:bg-white/15 text-white transition-colors rounded-md";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 border border-white/40 hover:bg-white/15 text-white text-[12px] font-semibold px-3 h-9 rounded-md transition-colors"
        aria-label="Copy link to this page"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? "Copied" : "Copy link"}
      </button>

      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on LinkedIn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.47 4.47-2.47C21.4 7.73 24 10 24 14.6V24h-5v-8.4c0-2-.04-4.6-2.8-4.6-2.8 0-3.23 2.2-3.23 4.45V24h-5V8z" /></svg>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on Facebook">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" /></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26L22.85 21.75h-6.66l-4.71-6.23-5.4 6.23H2.76l7.73-8.84L1.15 2.25h6.83l4.25 5.62 4.01-5.62zm-1.16 17.52h1.83L7.01 4.13H5.06L17.08 19.77z" /></svg>
      </a>
    </div>
  );
}
