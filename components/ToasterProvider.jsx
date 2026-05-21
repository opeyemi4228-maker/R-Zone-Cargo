"use client";

import dynamic from "next/dynamic";

const ToasterWrapper = dynamic(() => import("./ToasterWrapper"), {
  ssr: false,
});

export default function ToasterProvider() {
  return <ToasterWrapper />;
}
