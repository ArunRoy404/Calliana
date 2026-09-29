"use client";

import Button from "@/components/atoms/Button";
import PanelCard from "@/components/cards/PanelCard";
import Icon from "@/components/atoms/Icon";
import Timeline from "@/components/timeline/Timeline";
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
      <Timeline events={panel?.events} revealDelay={revealDelay} />
    </PanelCard>
  );
}
