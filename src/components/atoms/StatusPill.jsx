import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/** Frosted status badge on the hero panel — Figma 43:8132. */
export default function StatusPill({ icon, label, className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-999 border border-solid border-border-strong bg-white/20 px-3 py-1.5 backdrop-blur-[30px]",
        className,
      )}
    >
      {icon && (
        <AppImage
          src={icon?.src}
          width={icon?.width}
          height={icon?.height}
          className="shrink-0"
        />
      )}
      <span className="text-label-sm whitespace-nowrap text-text-on-primary">
        {label}
      </span>
    </div>
  );
}
