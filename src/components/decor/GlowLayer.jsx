"use client";

import DecorShape from "@/components/decor/DecorShape";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";

/** Soft glows behind the auth card — Figma 43:8215 / 43:8216. */
export default function GlowLayer() {
  const glows = useAuthContentStore((state) => state.decor?.glows);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {glows?.map((glow) => (
        <DecorShape key={glow?.id} {...glow} />
      ))}
    </div>
  );
}
