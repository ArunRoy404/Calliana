import StatusBadge from "@/components/atoms/StatusBadge";

/**
 * Status tag — Figma 198:22881. The row field holds `{ label, tone }`;
 * `column.showDot: false` drops the dot (the clients' status, 198:26132).
 * A status may name its own `variant` — the client contacts' "Inactive" is
 * a bare dot and label beside the tinted "Active" tag — and its own
 * `showDot` (the voicemail list's "• Pending" beside a dot-less "Resolved").
 */
export default function BadgeCell({ column, row }) {
  const status = row?.[column?.field];

  return (
    <StatusBadge
      variant={status?.variant ?? "tag"}
      label={status?.label}
      tone={status?.tone}
      showDot={status?.showDot ?? column?.showDot ?? true}
    />
  );
}
