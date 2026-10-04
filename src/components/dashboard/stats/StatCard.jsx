import AppImage from "@/components/atoms/AppImage";
import AssetIcon from "@/components/atoms/AssetIcon";
import TextureLayer from "@/components/decor/TextureLayer";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_SURFACE, TONE_TEXT } from "@/lib/tones";

/**
 * Headline metric with a trend line — Figma 167:49858.
 *
 * The compact report variant is also used by the reports dashboard: its
 * dimensions and internal offsets follow the supplied 1105px reference.
 *
 * Reveals itself after `revealDelay` seconds; `StatCardGrid` steps the delay
 * per card so a row arrives one card at a time.
 */
const TEXTURE = "/admin/card-texture.png";
const TREND_ARROW = "/admin/trend-arrow.svg";

export default function StatCard({ stat, revealDelay = 0 }) {
  const tone = stat?.tone ?? DEFAULT_TONE;
  const toneSurface = TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE];
  const toneText = TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE];

  // The icon tile and the delta pill are tinted independently in the design —
  // a blue icon can sit above a green delta.
  const deltaTone = stat?.deltaTone ?? tone;
  const deltaText = TONE_TEXT?.[deltaTone] ?? TONE_TEXT?.[DEFAULT_TONE];

  return (
    <Reveal
      as="article"
      delay={revealDelay}
      className="relative isolate flex h-[102px] flex-col overflow-hidden border border-solid border-border-strong bg-surface-base p-[10px]"
    >
      {/* No CSS opacity here: Figma baked the layer's 26% into the PNG's own
          alpha channel, so dimming it again would apply 26% twice. */}
      <TextureLayer src={TEXTURE} />

      <div className="relative flex w-full items-start justify-between">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-8",
            toneSurface,
            toneText,
          )}
        >
          <AssetIcon icon={stat?.icon} className="size-4" />
        </span>
      </div>

      <div className="absolute inset-x-[10px] bottom-[10px] flex items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <p className="text-[16px] font-semibold leading-none text-brand-ink-black">
            {stat?.value}
          </p>
          <p className="truncate text-[9px] leading-[11px] text-text-secondary">
            {stat?.label}
          </p>

          {stat?.delta && (
            <span
              className={cn(
                "inline-flex w-fit items-center gap-0.5 text-[8px] font-semibold leading-[10px]",
                deltaText,
              )}
            >
              {/* The arrow is masked so it inherits the tone rather than
                  shipping one coloured copy per tone. */}
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 bg-current"
                style={{
                  maskImage: `url(${TREND_ARROW})`,
                  WebkitMaskImage: `url(${TREND_ARROW})`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              {stat?.delta}
            </span>
          )}
        </div>

        {stat?.spark?.src && (
          <AppImage
            src={stat?.spark?.src}
            width={90}
            height={54}
            className="pointer-events-none absolute right-[-1px] bottom-[-1px]"
          />
        )}
      </div>
    </Reveal>
  );
}
