"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import MetaLine from "@/components/atoms/MetaLine";
import StatusBadge from "@/components/atoms/StatusBadge";
import Switch from "@/components/atoms/Switch";
import UserAvatar from "@/components/atoms/UserAvatar";
import WorkingDayRow from "@/components/agents/detail/WorkingDayRow";
import DetailSection from "@/components/cards/DetailSection";
import InfoTile from "@/components/cards/InfoTile";
import NoteWell from "@/components/cards/NoteWell";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useProfileStore } from "@/store/admin/useProfileStore";

/** The header name's size — the admin's 20px, a business's 24px. */
const NAME_SIZES = { md: "text-h4", lg: "text-h3" };

/**
 * A profile page — the admin's Profile (Figma 167:52857) and the client
 * portal's Business Profile are this one view over their own store
 * (`createProfileStore`): the account header, the information tiles (each
 * an `InfoTile`, with an "EDIT" action unless the field says
 * `editable: false`) and working hours, reusing the agent panel's own
 * `WorkingDayRow`. A profile with `instructions` sets its working hours
 * beside "Support Instructions for Agents" (stacked below `lg`); one with
 * `dayToggles` gives each day a `Switch`.
 *
 * Nothing here is wired to a backend yet, so every edit action is
 * `notFunctional`; a day's switch flips in the store but saves nothing.
 *
 * `useStore` is the profile's store — the admin's by default.
 */
export default function ProfileView({ useStore = useProfileStore }) {
  const profile = useStore((state) => state.profile);
  const workingHours = useStore((state) => state.workingHours);
  const toggleDay = useStore((state) => state.toggleDay);
  const notFunctional = notFunctionalProps(profile);
  const user = profile?.user;
  const instructions = profile?.instructions;
  const personalStart = revealDelayAt(0, 1);
  const hoursStart = revealDelayAt(0, 2);
  const instructionsStart = revealDelayAt(0, 3);

  const editAction = (
    <Button
      variant={profile?.editLinkVariant ?? "link"}
      size="none"
      {...notFunctional}
    >
      {profile?.editLabel}
    </Button>
  );

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Reveal
        delay={revealDelayAt(0, 0)}
        className="flex flex-wrap items-center justify-between gap-4 rounded-8 border border-solid border-border-default bg-surface-base p-4"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative shrink-0">
            <UserAvatar
              name={user?.name}
              src={user?.avatar}
              size={user?.avatarSize ?? "xl"}
            />
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

          <div className="flex min-w-0 flex-col gap-2">
            <p
              className={cn(
                NAME_SIZES?.[user?.nameSize] ?? NAME_SIZES?.md,
                "text-brand-black",
              )}
            >
              {user?.name}
            </p>
            {user?.subtitle && (
              <p className="text-body-sm text-text-secondary">
                {user?.subtitle}
              </p>
            )}
            <MetaLine
              size={user?.metaSize}
              items={[
                <StatusBadge
                  key="status"
                  variant="tag"
                  label={user?.status?.label}
                  tone={user?.status?.tone}
                />,
                ...(user?.meta ?? []),
              ]}
            />
          </div>
        </div>

        <Button
          variant={profile?.editProfileVariant ?? "neutral"}
          {...notFunctional}
        >
          {profile?.editProfileLabel}
        </Button>
      </Reveal>

      <DetailSection
        title={profile?.sections?.personalTitle}
        size="lg"
        elevated={profile?.elevatedSections}
        revealDelay={personalStart}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profile?.personalFields?.map((field, index) => (
            <InfoTile
              key={field?.id}
              icon={field?.icon}
              label={field?.label}
              revealDelay={nestedRevealDelayAt(personalStart, index)}
              action={field?.editable !== false && editAction}
              wrap
            >
              <span className="min-w-0 break-words">
                {profile?.values?.[field?.id]}
              </span>
            </InfoTile>
          ))}
        </div>
      </DetailSection>

      <div
        className={cn(
          "grid min-w-0 grid-cols-1 gap-4",
          instructions && "items-start lg:grid-cols-2",
        )}
      >
        <DetailSection
          title={profile?.sections?.hoursTitle}
          size="lg"
          elevated={profile?.elevatedSections}
          revealDelay={hoursStart}
        >
          <ul className="flex flex-col gap-4">
            {workingHours?.map((day, index) => (
              <WorkingDayRow
                key={day?.id}
                day={day}
                hoursIcon={profile?.hoursIcon}
                revealDelay={nestedRevealDelayAt(hoursStart, index)}
                action={
                  profile?.dayToggles && (
                    <Switch
                      checked={day?.isOpen}
                      onCheckedChange={() => toggleDay?.(day?.id)}
                      aria-label={day?.toggleLabel}
                    />
                  )
                }
              />
            ))}
          </ul>
        </DetailSection>

        {instructions && (
          <DetailSection
            title={instructions?.title}
            size="lg"
            revealDelay={instructionsStart}
          >
            <NoteWell>{instructions?.text}</NoteWell>
            <Button
              variant="underline"
              size="none"
              className="self-start text-body-lg"
              {...notFunctional}
            >
              {instructions?.editLabel}
            </Button>
          </DetailSection>
        )}
      </div>
    </div>
  );
}
