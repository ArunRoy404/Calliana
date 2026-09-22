"use client";

import StatusPill from "@/components/atoms/StatusPill";
import FeatureList from "@/components/features/FeatureList";
import Reveal from "@/components/motion/Reveal";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";

/** Headline, badge and feature list on the hero panel — Figma 43:8163. */
export default function AuthHeroCopy() {
  const hero = useAuthContentStore((state) => state.hero);

  return (
    <Reveal
      stagger
      className="absolute top-1/2 left-[56px] flex w-[456px] max-w-[calc(100%-112px)] -translate-y-1/2 flex-col gap-8"
    >
      <Reveal item>
        <div className="flex flex-col items-start gap-3">
          <StatusPill icon={hero?.badge?.icon} label={hero?.badge?.label} />

          <h1 className="text-display-l text-text-on-primary">
            {hero?.headlineLines?.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="text-body-lg text-text-on-primary">
            {hero?.subheadline}
          </p>
        </div>
      </Reveal>

      <FeatureList features={hero?.features} />
    </Reveal>
  );
}
