import FeatureItem from "@/components/features/FeatureItem";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Feature highlights on the hero panel — Figma 43:8137.
 * Both an item of the hero's cascade and a container for its own rows.
 */
export default function FeatureList({ features = [], className }) {
  return (
    <Reveal
      as="ul"
      item
      stagger
      className={cn("flex flex-col gap-2.5", className)}
    >
      {features?.map((feature) => (
        <FeatureItem
          key={feature?.id}
          icon={feature?.icon}
          title={feature?.title}
          body={feature?.body}
        />
      ))}
    </Reveal>
  );
}
