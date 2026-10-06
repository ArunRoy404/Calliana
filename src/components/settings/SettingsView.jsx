"use client";

import Button from "@/components/atoms/Button";
import Switch from "@/components/atoms/Switch";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";
import DetailSection from "@/components/cards/DetailSection";
import InfoTile from "@/components/cards/InfoTile";
import SettingRow from "@/components/cards/SettingRow";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useSettingsStore } from "@/store/admin/useSettingsStore";

/**
 * How dense a settings page is, named by `content.look`:
 * - `standard` — the admin's (Figma 167:52969): 20px section titles, ruled
 *   16px rows, plain "Change" links, the sections lifted.
 * - `large` — the client portal's: 28px titles, unruled 18px rows, 20px
 *   underlined "Change" links, the sections flat.
 */
const LOOKS = {
  standard: {
    titleSize: "md",
    rowSize: "md",
    rows: "divide-y divide-solid divide-border-default",
    elevated: true,
    changeVariant: "link",
  },
  large: {
    titleSize: "lg",
    rowSize: "lg",
    rows: "gap-3",
    elevated: false,
    changeVariant: "underline",
    changeClassName: "text-h4",
  },
};

/**
 * How many tiles a `type: "tiles"` section sets side by side at full width
 * (`section.columns`): two (the client's profile) or three (the agent's
 * general preferences). One column on a phone, two from `sm`.
 */
const TILE_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * Settings — the admin's (Figma 167:52969) and the client portal's are this
 * one view over their own store (`createSettingsStore`): one
 * `DetailSection` per category. A section of `type: "tiles"` shows its
 * rows as `InfoTile`s with a "Change" action (the client's Profile);
 * otherwise each row is a `SettingRow` — a toggle flips locally (there is
 * nowhere to save it yet), a value has a `notFunctional` "Change", and
 * "Change Password" opens the real `ChangePasswordModal`. "Save Changes"
 * is `notFunctional`.
 *
 * `useStore` is the page's settings store — the admin's by default.
 */
export default function SettingsView({ useStore = useSettingsStore }) {
  const content = useStore((state) => state.content);
  const toggles = useStore((state) => state.toggles);
  const toggleSetting = useStore((state) => state.toggleSetting);
  const openChangePassword = useStore((state) => state.openChangePassword);
  const notFunctional = notFunctionalProps(content);
  const look = LOOKS?.[content?.look] ?? LOOKS?.standard;

  const changeLink = (props) => (
    <Button
      variant={look?.changeVariant}
      size="none"
      className={look?.changeClassName}
      {...props}
    >
      {content?.changeLabel}
    </Button>
  );

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {content?.sections?.map((section, sectionIndex) => {
        const sectionDelay = revealDelayAt(0, sectionIndex);

        return (
          <DetailSection
            key={section?.id}
            title={section?.title}
            size="lg"
            titleSize={look?.titleSize}
            elevated={look?.elevated}
            revealDelay={sectionDelay}
          >
            {section?.type === "tiles" ? (
              <div
                className={cn(
                  "grid grid-cols-1 gap-4",
                  TILE_COLUMNS?.[section?.columns] ?? TILE_COLUMNS?.[2],
                )}
              >
                {section?.rows?.map((row, rowIndex) => (
                  <InfoTile
                    key={row?.id}
                    label={row?.label}
                    size="lg"
                    wrap
                    revealDelay={nestedRevealDelayAt(sectionDelay, rowIndex)}
                    action={
                      <Button
                        variant={look?.changeVariant}
                        size="none"
                        className="text-body-lg"
                        {...notFunctional}
                      >
                        {content?.changeLabel}
                      </Button>
                    }
                  >
                    <span className="min-w-0 break-all">{row?.value}</span>
                  </InfoTile>
                ))}
              </div>
            ) : (
              <div className={cn("flex flex-col", look?.rows)}>
                {section?.rows?.map((row, rowIndex) => (
                  <SettingRow
                    key={row?.id}
                    label={row?.label}
                    size={look?.rowSize}
                    value={row?.type === "value" ? row?.value : undefined}
                    revealDelay={nestedRevealDelayAt(sectionDelay, rowIndex)}
                  >
                    {row?.type === "toggle" && (
                      <Switch
                        checked={Boolean(toggles?.[row?.id])}
                        onCheckedChange={() => toggleSetting?.(row?.id)}
                        aria-label={row?.label}
                      />
                    )}
                    {row?.type !== "toggle" &&
                      row?.id === "changePassword" &&
                      changeLink({ onClick: openChangePassword })}
                    {row?.type !== "toggle" &&
                      row?.id !== "changePassword" &&
                      changeLink(notFunctional)}
                  </SettingRow>
                ))}
              </div>
            )}
          </DetailSection>
        );
      })}

      <Reveal
        delay={revealDelayAt(0, content?.sections?.length ?? 0)}
        className="flex justify-end"
      >
        <Button {...notFunctional}>{content?.saveLabel}</Button>
      </Reveal>

      <ChangePasswordModal useStore={useStore} />
    </div>
  );
}
