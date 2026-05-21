"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: "var(--font-outfit, sans-serif)",
          fontSize: "13px",
          fontWeight: "500",
        },
      }}
    />
  );
}
