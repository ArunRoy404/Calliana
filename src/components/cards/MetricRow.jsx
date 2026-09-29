import Reveal from "@/components/motion/Reveal";

/**
 * A label with its figure on the right — Figma 202:22967 ("Appointments
 * booked · 12"). Rows rule off under each other except the last.
 */
export default function MetricRow({ label, value, revealDelay = 0 }) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex items-center gap-4 border-b border-solid border-surface-subtle px-4 py-3 last:border-b-0"
    >
      <p className="text-label-md min-w-0 flex-1 text-text-secondary">
        {label}
      </p>
      <p className="text-label-lg shrink-0 text-right text-text-primary">
        {value}
      </p>
    </Reveal>
  );
}
