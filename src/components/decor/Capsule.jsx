import { cn } from "@/lib/cn";

/** Capsule shapes hanging from the panel's top edge — Figma 43:7861–43:7863. */
const VARIANT_CLASSES = {
  filled: "bg-gradient-to-b from-white/25 to-white",
  outlined: "border-r border-b border-l border-solid border-white",
};

export default function Capsule({ variant = "filled", className }) {
  return (
    <div
      className={cn(
        "absolute rounded-b-[99px]",
        VARIANT_CLASSES?.[variant],
        className,
      )}
    />
  );
}
