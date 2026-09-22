import FeatureItem from "@/components/features/FeatureItem";
import { cn } from "@/lib/cn";

/** Feature highlights on the hero panel — Figma 43:8137. */
export default function FeatureList({ features = [], className }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {features?.map((feature) => (
        <FeatureItem
          key={feature?.id}
          icon={feature?.icon}
          title={feature?.title}
          body={feature?.body}
        />
      ))}
    </ul>
  );
}
