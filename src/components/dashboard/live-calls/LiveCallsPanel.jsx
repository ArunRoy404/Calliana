"use client";

import Button from "@/components/atoms/Button";
import LiveCallRow from "@/components/dashboard/live-calls/LiveCallRow";
import PanelCard from "@/components/cards/PanelCard";
import { nestedRevealDelayAt } from "@/lib/motion";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/** Live calls — Figma 191:16818. */
export default function LiveCallsPanel({ revealDelay = 0 }) {
  const panel = useAdminContentStore((state) => state.dashboard?.liveCalls);
  const fallback = useAdminContentStore((state) => state.dashboard);

  return (
    <PanelCard
      title={panel?.title}
      tone={panel?.tone}
      revealDelay={revealDelay}
      action={
        <Button
          variant="link"
          size="none"
          notFunctional
          notFunctionalMessage={fallback?.notFunctionalMessage}
          notFunctionalDescription={fallback?.notFunctionalDescription}
          className="text-body-md"
        >
          {panel?.countLabel}
        </Button>
      }
    >
      <ul className="flex flex-col">
        {panel?.items?.map((call, index) => (
          <LiveCallRow
            key={call?.id}
            call={call}
            revealDelay={nestedRevealDelayAt(revealDelay, index)}
          />
        ))}
      </ul>
    </PanelCard>
  );
}
