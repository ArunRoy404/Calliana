import { cn } from "@/lib/cn";

/**
 * The 44px bordered tile the top bar repeats for every control — Figma 42:873.
 * Renders as a button when given an action, otherwise as plain chrome.
 */
export default function TopBarTile({
  as: Tag = "div",
  children,
  label,
  tone,
  className,
  ...props
}) {
  return (
    <Tag
      aria-label={label}
      className={cn(
        "flex h-11 shrink-0 items-center justify-center gap-1 rounded-6 border border-solid border-border-default bg-surface-base backdrop-blur-[30px] transition-colors duration-200 ease-out",
        Tag === "button" && "cursor-pointer hover:bg-surface-subtle",
        !tone && "w-11",
        tone,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
