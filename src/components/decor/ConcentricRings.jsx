import DecorShape from "@/components/decor/DecorShape";
import { cn } from "@/lib/cn";

/** Nested ring cluster in the panel's bottom-right corner — Figma 43:7872. */
export default function ConcentricRings({ shapes = [], className }) {
  return (
    <div className={cn("absolute", className)}>
      {shapes?.map((shape) => (
        <DecorShape key={shape?.id} {...shape} />
      ))}
    </div>
  );
}
