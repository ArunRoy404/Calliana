"use client";

import AttentionItem from "@/components/dashboard/attention/AttentionItem";
import PanelCard from "@/components/cards/PanelCard";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/** Attention required — Figma 191:16861. */
export default function AttentionPanel() {
  const panel = useAdminContentStore((state) => state.dashboard?.attention);

  return (
    <PanelCard title={panel?.title}>
      <ul className="flex flex-col gap-3">
        {panel?.items?.map((item) => (
          <AttentionItem key={item?.id} item={item} />
        ))}
      </ul>
    </PanelCard>
  );
}
