"use client";

import Capsule from "@/components/decor/Capsule";
import ConcentricRings from "@/components/decor/ConcentricRings";
import DecorShape from "@/components/decor/DecorShape";
import DotGrid from "@/components/decor/DotGrid";
import SparkleMark from "@/components/decor/SparkleMark";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";

/**
 * The decorative composition over the hero photo — Figma 43:7777.
 * Purely ornamental, so the whole layer is hidden from assistive tech.
 */
export default function HeroDecorLayer() {
  const decor = useAuthContentStore((state) => state.decor);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {decor?.dotGrids?.map((grid) => (
        <DotGrid
          key={grid?.id}
          rows={grid?.rows}
          columns={grid?.columns}
          dot={decor?.dot}
          className={grid?.className}
        />
      ))}

      {decor?.capsules?.map((capsule) => (
        <Capsule
          key={capsule?.id}
          variant={capsule?.variant}
          className={capsule?.className}
        />
      ))}

      {decor?.shapes?.map((shape) => (
        <DecorShape key={shape?.id} {...shape} />
      ))}

      {decor?.sparkles?.map((sparkle) => (
        <SparkleMark
          key={sparkle?.id}
          rotateClassName={sparkle?.rotateClassName}
          className={sparkle?.className}
        />
      ))}

      <ConcentricRings
        shapes={decor?.concentricRings?.shapes}
        className={decor?.concentricRings?.className}
      />
    </div>
  );
}
