"use client";

import AttentionItem from "@/components/dashboard/attention/AttentionItem";
import PanelCard from "@/components/cards/PanelCard";
import { nestedRevealDelayAt } from "@/lib/motion";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/** Attention required — Figma 191:16861. */
export default function AttentionPanel({ revealDelay = 0 }) {
  const panel = useAdminContentStore((state) => state.dashboard?.attention);

  return (
    <PanelCard title={panel?.title} revealDelay={revealDelay}>
      <ul className="flex flex-col gap-3">
        {panel?.items?.map((item, index) => (
          <AttentionItem
            key={item?.id}
            item={item}
            revealDelay={nestedRevealDelayAt(revealDelay, index)}
          />
        ))}
      </ul>
    </PanelCard>
  );
}
