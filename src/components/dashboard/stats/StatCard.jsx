import AppImage from "@/components/atoms/AppImage";
import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_SURFACE, TONE_TEXT } from "@/lib/tones";

/**
 * Headline metric with a trend line — Figma 167:49858.
 *
 * Square by design: only the icon tile (12px) and the delta pill (8px) are
 * rounded. The trend line is the design's own SVG rather than a generated
 * polyline, so each card's curve is exactly the one that was drawn.
 */
const TEXTURE = "/admin/card-texture.png";
const TREND_ARROW = "/admin/trend-arrow.svg";

export default function StatCard({ stat }) {
  const tone = stat?.tone ?? DEFAULT_TONE;
  const toneSurface = TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE];
  const toneText = TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE];

  // The icon tile and the delta pill are tinted independently in the design —
  // a blue icon can sit above a green delta.
  const deltaTone = stat?.deltaTone ?? tone;
  const deltaSurface = TONE_SURFACE?.[deltaTone] ?? TONE_SURFACE?.[DEFAULT_TONE];
  const deltaText = TONE_TEXT?.[deltaTone] ?? TONE_TEXT?.[DEFAULT_TONE];

  return (
    <article className="relative flex h-[150px] flex-col items-center gap-2 overflow-hidden border border-solid border-border-strong bg-surface-base p-4">
      {/* No CSS opacity here: Figma baked the layer's 26% into the PNG's own
          alpha channel, so dimming it again would apply 26% twice. */}
      <AppImage
        src={TEXTURE}
        fill
        unoptimized
        className="pointer-events-none object-cover"
      />

      <div className="relative flex w-full items-start justify-between">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-12",
            toneSurface,
            toneText,
          )}
        >
          {stat?.icon?.src ? (
            <AppImage
              src={stat?.icon?.src}
              width={stat?.icon?.width}
              height={stat?.icon?.height}
            />
          ) : (
            <Icon name={stat?.icon?.lucide} />
          )}
        </span>
      </div>

      <div className="relative flex w-full flex-1 items-end gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <p className="text-h3 text-brand-ink-black">{stat?.value}</p>
          <p className="text-body-sm truncate text-text-secondary">
            {stat?.label}
          </p>

          {stat?.delta && (
            <span
              className={cn(
                "mt-1 inline-flex w-fit items-center gap-1 rounded-8 p-1 text-[10px] font-bold",
                deltaSurface,
                deltaText,
              )}
            >
              {/* The arrow is masked so it inherits the tone rather than
                  shipping one coloured copy per tone. */}
              <span
                aria-hidden
                className="h-3 w-3 shrink-0 bg-current"
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

        <AppImage
          src={stat?.spark?.src}
          width={116}
          height={70}
          className="pointer-events-none absolute right-0 bottom-0"
        />
      </div>
    </article>
  );
}
