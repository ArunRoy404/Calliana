import AppImage from "@/components/atoms/AppImage";

/**
 * Value led by a small icon — Figma 198:22888 (clock + duration).
 * `column.icon` is `{ src, width, height }`.
 */
export default function IconTextCell({ column, row }) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <AppImage
        src={column?.icon?.src}
        width={column?.icon?.width}
        height={column?.icon?.height}
        className="shrink-0"
      />
      <span className="text-label-md min-w-0 flex-1 truncate text-brand-black">
        {row?.[column?.field]}
      </span>
    </span>
  );
}
