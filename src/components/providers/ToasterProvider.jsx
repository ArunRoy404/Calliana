"use client";

import { GooeyToaster } from "goey-toast";

/** Mounted exactly once, in the root layout. */
export default function ToasterProvider() {
  return <GooeyToaster position="bottom-right" theme="light" closeButton />;
}
