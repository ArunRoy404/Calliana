"use client";

import Reveal from "@/components/motion/Reveal";
import StatCard from "@/components/dashboard/stats/StatCard";
import { cn } from "@/lib/cn";

/**
 * A responsive row of stat cards — Figma 179:69684 / 179:69685.
 * `columns` is the count the design uses at the widest breakpoint.
 */
const COLUMN_CLASSES = {
  3: "sm:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
};

export default function StatCardGrid({ stats = [], columns = 4 }) {
  return (
    <Reveal
      item
      stagger
      className={cn("grid grid-cols-1 gap-4", COLUMN_CLASSES?.[columns])}
    >
      {stats?.map((stat) => (
        <Reveal key={stat?.id} item>
          <StatCard stat={stat} />
        </Reveal>
      ))}
    </Reveal>
  );
}
