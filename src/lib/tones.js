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
};

/** Solid fill — status dots. */
export const TONE_DOT = {
  success: "bg-status-success",
  error: "bg-status-error",
  warning: "bg-status-warning",
  info: "bg-status-info",
  primary: "bg-action-primary",
  neutral: "bg-text-disabled",
};

/** Tinted background — badges and attention rows. */
export const TONE_SURFACE = {
  success: "bg-status-success-bg",
  error: "bg-status-error-bg",
  warning: "bg-status-warning-bg",
  info: "bg-status-info-bg",
  primary: "bg-surface-selected",
  neutral: "bg-surface-subtle",
};

/** Hairline that matches a tint. */
export const TONE_BORDER = {
  success: "border-status-success/20",
  error: "border-status-error/20",
  warning: "border-status-warning/20",
  info: "border-status-info/20",
  primary: "border-action-primary/20",
  neutral: "border-border-default",
};

/** Ring colour — the halo around a timeline marker. */
export const TONE_RING = {
  success: "ring-status-success",
  error: "ring-status-error",
  warning: "ring-status-warning",
  info: "ring-status-info",
  primary: "ring-action-primary",
  neutral: "ring-text-disabled",
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
};

export const DEFAULT_TONE = "neutral";
