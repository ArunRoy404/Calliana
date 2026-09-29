"use client";

import { motion, useReducedMotion } from "framer-motion";

import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { REVEAL_DURATION, REVEAL_EASE } from "@/lib/motion";
import { DEFAULT_TONE, TONE_DOT, TONE_SURFACE } from "@/lib/tones";

/**
 * A labelled horizontal meter — Figma 202:22941 ("Inbound calls ▬▬▬ 38").
 * `percent` (0–100) sets the fill; the track is the tone's tint and the fill
 * its solid colour. The fill grows in as the row reveals.
 */
export default function MeterRow({
  label,
  value,
  percent = 0,
  tone = DEFAULT_TONE,
  revealDelay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();
  const width = `${Math.min(Math.max(percent ?? 0, 0), 100)}%`;

  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex items-center gap-4 border-b border-solid border-surface-subtle px-4 py-3 last:border-b-0"
    >
      <p className="text-label-md w-24 shrink-0 text-text-secondary sm:w-32">
        {label}
      </p>

      <div
        className={cn(
          "h-2 min-w-0 flex-1 overflow-hidden rounded-999",
          TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE],
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-999",
            TONE_DOT?.[tone] ?? TONE_DOT?.[DEFAULT_TONE],
          )}
          initial={{ width: shouldReduceMotion ? width : 0 }}
          animate={{ width }}
          transition={{
            duration: shouldReduceMotion ? 0 : REVEAL_DURATION * 1.6,
            ease: REVEAL_EASE,
            delay: shouldReduceMotion ? 0 : revealDelay,
          }}
        />
      </div>

      <p className="text-label-md shrink-0 text-right text-text-primary">
        {value}
      </p>
    </Reveal>
  );
}
