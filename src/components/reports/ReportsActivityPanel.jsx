"use client";

import PanelCard from "@/components/cards/PanelCard";
import Timeline from "@/components/timeline/Timeline";
import { useReportsStore } from "@/store/admin/useReportsStore";

export default function ReportsActivityPanel({ revealDelay = 0 }) {
  const activity = useReportsStore((state) => state.content?.activity);

  return (
    <PanelCard
      title={activity?.title}
      revealDelay={revealDelay}
      variant="report"
      className="h-[258px]"
    >
      <Timeline
        events={activity?.events}
        revealDelay={revealDelay}
        emphasis
        compact
      />
    </PanelCard>
  );
}