import StatCard from "@/components/dashboard/stats/StatCard";
import { cn } from "@/lib/cn";
import { revealDelayAt } from "@/lib/motion";

/**
 * A responsive row of stat cards — Figma 179:69684 / 179:69685.
 * `columns` is the count the design uses at the widest breakpoint.
 *
 * The grid is plain layout and never animates. The cards reveal one after
 * another, the first at `revealDelay` and each next one a step later.
 */
const COLUMN_CLASSES = {
  3: "sm:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
  5: "sm:grid-cols-2 xl:grid-cols-5",
};

export default function StatCardGrid({
  stats = [],
  columns = 4,
  revealDelay = 0,
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", COLUMN_CLASSES?.[columns])}>
      {stats?.map((stat, index) => (
        <StatCard
          key={stat?.id}
          stat={stat}
          revealDelay={revealDelayAt(revealDelay, index)}
        />
      ))}
    </div>
  );
}
