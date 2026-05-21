"use client";

import { useEffect } from "react";

export default function BodyCleanup() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.removeAttribute("cz-shortcut-listen");
    }
  }, []);
  return null;
}
