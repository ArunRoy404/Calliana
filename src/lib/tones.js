/**
 * Semantic tones.
 *
 * Every status dot, badge, tinted row, sparkline and stat icon in the app
 * resolves its colour from here, so `tone: "error"` in a data file means the
 * same red everywhere and no component hardcodes a token.
 */

/** Solid foreground — dots, icons, emphasised labels. */
export const TONE_TEXT = {
  success: "text-status-success",
  error: "text-status-error",
  warning: "text-status-warning",
  info: "text-status-info",
  primary: "text-action-primary",
  neutral: "text-text-tertiary",
  accent: "text-action-accent",
  /** Quiet figures — a zero count. */
  muted: "text-text-disabled",
};

/** Solid fill — status dots. */
export const TONE_DOT = {
  success: "bg-status-success",
  error: "bg-status-error",
  warning: "bg-status-warning",
  info: "bg-status-info",
  primary: "bg-action-primary",
  neutral: "bg-text-disabled",
  accent: "bg-action-accent",
};

/**
 * Dots inside a tag badge — Figma 198:22881. The table's badges pair each
 * tinted label with a dot of a *different* shade (a teal dot on green text, a
 * primary-blue dot on info-blue text), so they get their own map.
 */
export const TONE_TAG_DOT = {
  success: "bg-action-accent",
  error: "bg-status-error",
  warning: "bg-status-warning",
  info: "bg-action-primary",
  primary: "bg-action-primary",
  neutral: "bg-text-secondary",
  accent: "bg-action-accent",
};

/** Tinted background — badges and attention rows. */
export const TONE_SURFACE = {
  success: "bg-status-success-bg",
  error: "bg-status-error-bg",
  warning: "bg-status-warning-bg",
  info: "bg-status-info-bg",
  primary: "bg-surface-selected",
  neutral: "bg-surface-subtle",
  accent: "bg-teal-50",
};

/** Hairline that matches a tint. */
export const TONE_BORDER = {
  success: "border-status-success/20",
  error: "border-status-error/20",
  warning: "border-status-warning/20",
  info: "border-status-info/20",
  primary: "border-action-primary/20",
  neutral: "border-border-default",
  accent: "border-action-accent/20",
};

/** Full-strength outline — the bordered "Status" pill, Figma 198:34761. */
export const TONE_OUTLINE = {
  success: "border-status-success",
  error: "border-status-error",
  warning: "border-status-warning",
  info: "border-status-info",
  primary: "border-action-primary",
  neutral: "border-border-strong",
  accent: "border-action-accent",
};

/** Ring colour — the halo around a timeline marker. */
export const TONE_RING = {
  success: "ring-status-success",
  error: "ring-status-error",
  warning: "ring-status-warning",
  info: "ring-status-info",
  primary: "ring-action-primary",
  neutral: "ring-text-disabled",
  accent: "ring-action-accent",
};

/**
 * Stroke colours for sparklines. SVG needs a real colour, not a class, so
 * these read the same custom properties the Tailwind utilities do.
 */
export const TONE_STROKE = {
  success: "var(--status-success)",
  error: "var(--status-error)",
  warning: "var(--status-warning)",
  info: "var(--action-primary)",
  primary: "var(--action-primary)",
  neutral: "var(--text-tertiary)",
  accent: "var(--action-accent)",
};

export const DEFAULT_TONE = "neutral";
