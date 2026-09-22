"use client";

import HeroDecorLayer from "@/components/decor/HeroDecorLayer";
import PhotoBackdrop from "@/components/decor/PhotoBackdrop";
import AuthHeroCopy from "@/components/auth/AuthHeroCopy";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";

/**
 * Left-hand hero panel of the auth screens — Figma 43:7777.
 * Hidden below `lg`, where the card takes the full width.
 */
export default function AuthHeroPanel() {
  const backdrop = useAuthContentStore((state) => state.hero?.backdrop);

  return (
    <div className="relative hidden flex-1 overflow-hidden rounded-l-12 lg:block">
      <PhotoBackdrop
        src={backdrop?.src}
        imageClassName={backdrop?.imageClassName}
        opacityClassName={backdrop?.opacityClassName}
      />
      <HeroDecorLayer />
      <AuthHeroCopy />
    </div>
  );
}
