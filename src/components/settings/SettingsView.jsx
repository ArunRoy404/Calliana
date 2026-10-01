"use client";

import Button from "@/components/atoms/Button";
import Switch from "@/components/atoms/Switch";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";
import DetailSection from "@/components/cards/DetailSection";
import SettingRow from "@/components/cards/SettingRow";
import Reveal from "@/components/motion/Reveal";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useSettingsStore } from "@/store/admin/useSettingsStore";

/**
 * Settings — Figma 167:52969: one `DetailSection` per category, each a list
 * of `SettingRow`s. A toggle flips locally (there is nowhere to save it yet);
 * "Save Changes" is `notFunctional`. "Change" is `notFunctional` for every
 * value row except "Change Password", which opens the real
 * `ChangePasswordModal`.
 */
export default function SettingsView() {
  const content = useSettingsStore((state) => state.content);
  const toggles = useSettingsStore((state) => state.toggles);
  const toggleSetting = useSettingsStore((state) => state.toggleSetting);
  const openChangePassword = useSettingsStore((state) => state.openChangePassword);
  const notFunctional = notFunctionalProps(content);

  return (
    <div className="flex flex-col gap-4">
      {content?.sections?.map((section, sectionIndex) => {
        const sectionDelay = revealDelayAt(0, sectionIndex);

        return (
          <DetailSection
            key={section?.id}
            title={section?.title}
            size="lg"
            elevated
            revealDelay={sectionDelay}
          >
            <div className="flex flex-col divide-y divide-solid divide-border-default">
              {section?.rows?.map((row, rowIndex) => (
                <SettingRow
                  key={row?.id}
                  label={row?.label}
                  value={row?.type === "value" ? row?.value : undefined}
                  revealDelay={nestedRevealDelayAt(sectionDelay, rowIndex)}
                >
                  {row?.type === "toggle" && (
                    <Switch
                      checked={Boolean(toggles?.[row?.id])}
                      onCheckedChange={() => toggleSetting?.(row?.id)}
                    />
                  )}
                  {row?.type !== "toggle" && row?.id === "changePassword" && (
                    <Button variant="link" size="none" onClick={openChangePassword}>
                      {content?.changeLabel}
                    </Button>
                  )}
                  {row?.type !== "toggle" && row?.id !== "changePassword" && (
                    <Button variant="link" size="none" {...notFunctional}>
                      {content?.changeLabel}
                    </Button>
                  )}
                </SettingRow>
              ))}
            </div>
          </DetailSection>
        );
      })}

      <Reveal
        delay={revealDelayAt(0, content?.sections?.length ?? 0)}
        className="flex justify-end"
      >
        <Button {...notFunctional}>{content?.saveLabel}</Button>
      </Reveal>

      <ChangePasswordModal />
    </div>
  );
}
