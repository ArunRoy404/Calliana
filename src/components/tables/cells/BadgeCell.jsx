import StatusBadge from "@/components/atoms/StatusBadge";

/**
 * Status tag — Figma 198:22881. The row field holds `{ label, tone }`;
 * `column.showDot: false` drops the dot (the clients' status, 198:26132).
 */
export default function BadgeCell({ column, row }) {
  const status = row?.[column?.field];

  return (
    <StatusBadge
      variant="tag"
      label={status?.label}
      tone={status?.tone}
      showDot={column?.showDot ?? true}
    />
  );
}
