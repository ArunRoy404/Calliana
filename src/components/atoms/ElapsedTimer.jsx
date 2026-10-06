"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { formatElapsed } from "@/lib/time";

/**
 * A running "mm:ss" clock — a live call's duration. It starts at
 * `startSeconds` (so the server and the first browser render agree) and
 * counts up once a second. The ticking count is local and visual only —
 * nothing else reads it — so it is component state (rule 2's exception).
 * `label` names it for screen readers, which are not told every tick.
 */
export default function ElapsedTimer({ startSeconds = 0, label, className }) {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    const id = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      role="timer"
      aria-label={label}
      aria-live="off"
      className={cn("tabular-nums", className)}
    >
      {formatElapsed(seconds)}
    </span>
  );
}
