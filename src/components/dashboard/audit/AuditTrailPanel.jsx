"use client";

import Button from "@/components/atoms/Button";
import AuditEvent from "@/components/dashboard/audit/AuditEvent";
import PanelCard from "@/components/cards/PanelCard";
import Icon from "@/components/atoms/Icon";
import { nestedRevealDelayAt } from "@/lib/motion";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/** System audit trail — Figma 196:18650. */
export default function AuditTrailPanel({ revealDelay = 0 }) {
  const panel = useAdminContentStore((state) => state.dashboard?.auditTrail);

  return (
    <PanelCard
      title={panel?.title}
      subtitle={panel?.subtitle}
      revealDelay={revealDelay}
      action={
        <Button
          variant="link"
          size="none"
          href={panel?.action?.href}
          className="text-label-sm"
        >
          {panel?.action?.label}
          <Icon name="ArrowRight" size={16} />
        </Button>
      }
    >
      <ul className="flex flex-col">
        {panel?.events?.map((event, index) => (
          <AuditEvent
            key={event?.id}
            event={event}
            isLast={index === (panel?.events?.length ?? 0) - 1}
            revealDelay={nestedRevealDelayAt(revealDelay, index)}
          />
        ))}
      </ul>
    </PanelCard>
  );
}
