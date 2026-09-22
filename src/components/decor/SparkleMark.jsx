import { cn } from "@/lib/cn";

/** One stroke of the four-point sparkle at the panel's bottom edge — 43:7869. */
export default function SparkleMark({ rotateClassName, className }) {
  return (
    <div
      className={cn("absolute flex items-center justify-center", className)}
    >
      <div className={cn("flex-none", rotateClassName)}>
        <div className="h-[17.154px] w-[4.288px] bg-white" />
      </div>
    </div>
  );
}
