"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import WorkingDayRow from "@/components/agents/detail/WorkingDayRow";
import DetailSection from "@/components/cards/DetailSection";
import InfoTile from "@/components/cards/InfoTile";
import Reveal from "@/components/motion/Reveal";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useProfileStore } from "@/store/admin/useProfileStore";

/**
 * Profile — Figma 167:52857: the account header, personal information (each
 * field an `InfoTile` with an "EDIT" action) and working hours, reusing the
 * agent panel's own `WorkingDayRow`. Nothing here is wired to a backend yet,
 * so every edit action is `notFunctional`.
 */
export default function ProfileView() {
  const profile = useProfileStore((state) => state.profile);
  const notFunctional = notFunctionalProps(profile);
  const personalStart = revealDelayAt(0, 1);
  const hoursStart = revealDelayAt(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <Reveal
        delay={revealDelayAt(0, 0)}
        className="flex flex-wrap items-center justify-between gap-4 rounded-8 border border-solid border-border-default bg-surface-base p-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <UserAvatar name={profile?.user?.name} size="xl" />
            <Button
              variant="neutral"
              size="square"
              aria-label={profile?.changeAvatarLabel}
              className="absolute -right-1 -bottom-1 rounded-999"
              {...notFunctional}
            >
              <AssetIcon icon={profile?.changeAvatarIcon} />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-h4 text-brand-black">{profile?.user?.name}</p>
            <div className="flex items-center gap-2">
              <StatusBadge
                variant="tag"
                label={profile?.user?.status?.label}
                tone={profile?.user?.status?.tone}
              />
              <span aria-hidden className="text-text-tertiary">
                •
              </span>
              <span className="text-body-md text-text-secondary">{profile?.user?.role}</span>
            </div>
          </div>
        </div>

        <Button variant="neutral" {...notFunctional}>
          {profile?.editProfileLabel}
        </Button>
      </Reveal>

      <DetailSection
        title={profile?.sections?.personalTitle}
        size="lg"
        elevated
        revealDelay={personalStart}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profile?.personalFields?.map((field, index) => (
            <InfoTile
              key={field?.id}
              icon={field?.icon}
              label={field?.label}
              revealDelay={nestedRevealDelayAt(personalStart, index)}
              action={
                <Button variant="link" size="none" {...notFunctional}>
                  {profile?.editLabel}
                </Button>
              }
            >
              <span className="truncate">{profile?.values?.[field?.id]}</span>
            </InfoTile>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={profile?.sections?.hoursTitle} size="lg" elevated revealDelay={hoursStart}>
        <ul className="flex flex-col gap-4">
          {profile?.workingHours?.map((day, index) => (
            <WorkingDayRow
              key={day?.id}
              day={day}
              revealDelay={nestedRevealDelayAt(hoursStart, index)}
            />
          ))}
        </ul>
      </DetailSection>
    </div>
  );
}
