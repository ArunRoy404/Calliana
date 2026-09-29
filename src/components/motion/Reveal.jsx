"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import {
  REVEAL_DELAY_CHILDREN,
  REVEAL_DISTANCE,
  REVEAL_DURATION,
  REVEAL_EASE,
  REVEAL_STAGGER,
} from "@/lib/motion";

/**
 * Smooth rise-and-fade reveal. One component, three modes:
 *
 * - `<Reveal delay={…}>` — animates itself on mount, after `delay` seconds.
 *   This is how dashboard components reveal: each takes a `revealDelay` prop
 *   and its parent hands out stepped delays (see `revealDelayAt` and
 *   `nestedRevealDelayAt` in `src/lib/motion.js`).
 * - `<Reveal stagger>` — a container whose `item` children cascade.
 * - `<Reveal item>` — a child of a `stagger` container. It deliberately sets
 *   no `initial`/`animate`, because framer-motion only orchestrates children
 *   that inherit their state from the parent.
 *
 * Respects `prefers-reduced-motion`: the movement is dropped and only a short
 * fade remains, with no delay, so the interface never animates at someone who
 * asked it not to.
 *
 * `as` takes a tag name, or a motion component made once at module level
 * (e.g. `MotionTableRow`) — never one created during render.
 */
export default function Reveal({
  children,
  as = "div",
  item = false,
  stagger = false,
  delay = 0,
  distance = REVEAL_DISTANCE,
  className,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const Component =
    typeof as === "string" ? (motion?.[as] ?? motion.div) : (as ?? motion.div);
  const staggerSeconds = typeof stagger === "number" ? stagger : REVEAL_STAGGER;

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : distance,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : REVEAL_DURATION,
        ease: REVEAL_EASE,
        delay: shouldReduceMotion ? 0 : delay,
        ...(stagger
          ? {
              staggerChildren: shouldReduceMotion ? 0 : staggerSeconds,
              delayChildren: shouldReduceMotion ? 0 : REVEAL_DELAY_CHILDREN,
            }
          : {}),
      },
    },
  };

  return (
    <Component
      variants={variants}
      // An item inherits its state from the staggering parent; anything else
      // drives itself.
      {...(item ? {} : { initial: "hidden", animate: "show" })}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}
