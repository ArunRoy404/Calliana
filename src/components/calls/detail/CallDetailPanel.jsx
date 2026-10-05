"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import CallInfoCard from "@/components/calls/detail/CallInfoCard";
import CallRecordingPlayer from "@/components/calls/detail/CallRecordingPlayer";
import DetailSection from "@/components/cards/DetailSection";
import SidePanel from "@/components/overlays/SidePanel";
import Timeline from "@/components/timeline/Timeline";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { TONE_TEXT } from "@/lib/tones";
import { useCallsStore } from "@/store/admin/useCallsStore";

/**
 * One call's details — Figma 202:38997 / 202:39212, on the shared
 * `SidePanel` — and, with its own content, one voicemail's (the agent's
 * "Voicemail Details"). The info card sits on top, then one outlined
 * `DetailSection` per entry in `content.sections`: the recording player,
 * a text block (summary, agent notes, the amber triage note, a voicemail's
 * transcription) or the event timeline. A text or timeline section the
 * record has nothing for is left out.
 *
 * The record is the URL's `?call=<id>`, read through the store, so the
 * panel opens straight from a shared link; on close the last record is
 * kept on screen while the panel slides away. Sections reveal in reading
 * order and their delays follow the sections actually shown, so an absent
 * one leaves no gap in the sequence.
 *
 * `useStore` is the list it opens from — any `createTableStore` store
 * carrying `callDetailSlice` (the admin calls directory by default, the
 * client portal's Calls & Notes and the agent's calls and voicemail too).
 */
export default function CallDetailPanel({ useStore = useCallsStore }) {
  const params = useStoreParams(useStore);
  const selectedCall = useStore((state) => state.selectedCall(params));
  const setOpen = useStore((state) => state.setDetailOpen);
  const content = useStore((state) => state.detailContent);

  const call = useRetainedValue(selectedCall);
  const notFunctional = notFunctionalProps(content);
  const labels = content?.labels;

  /** What sits at the right of a section's header, by section kind. */
  function asideOf(section) {
    if (section?.editable) {
      return (
        <Button
          variant="link"
          size="none"
          className="text-body-md font-semibold"
          {...notFunctional}
        >
          {labels?.editNotes}
        </Button>
      );
    }
    if (section?.kind !== "recording" || !call?.recordingAside) return null;

    return (
      <span className="flex items-center gap-3">
        <span className="text-label-lg text-brand-ink-black">
          {call?.recordingAside}
        </span>
        {content?.downloadIcon && (
          <Button
            variant="ghost"
            size="square"
            aria-label={labels?.downloadLabel}
            {...notFunctional}
          >
            <AssetIcon icon={content?.downloadIcon} />
          </Button>
        )}
      </span>
    );
  }

  /** A section's body, by section kind. */
  function bodyOf(section, delay) {
    if (section?.kind === "recording") {
      return (
        <CallRecordingPlayer
          content={content}
          notFunctional={notFunctional}
          revealDelay={nestedRevealDelayAt(delay, 0)}
        />
      );
    }
    if (section?.kind === "timeline") {
      return (
        <Timeline
          events={call?.[section?.field]}
          emphasis
          revealDelay={delay}
        />
      );
    }
    return (
      <p
        className={cn(
          "text-body-md",
          TONE_TEXT?.[section?.tone] ?? "text-text-secondary",
        )}
      >
        {call?.[section?.field]}
      </p>
    );
  }

  const sections =
    content?.sections?.filter(
      (section) => section?.kind === "recording" || call?.[section?.field],
    ) ?? [];

  return (
    <SidePanel
      open={Boolean(selectedCall)}
      onOpenChange={setOpen}
      title={call?.panelTitle}
      subtitle={call?.panelSubtitle}
      footer={content?.footerActions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant}
          className={action?.className}
          href={action?.hrefField ? call?.[action?.hrefField] : undefined}
          {...(!action?.hrefField ? notFunctional : undefined)}
        >
          {action?.icon && <AssetIcon icon={action?.icon} />}
          {action?.label}
        </Button>
      ))}
    >
      <CallInfoCard
        call={call}
        fields={content?.infoFields}
        revealDelay={revealDelayAt(0, 0)}
      />

      {sections?.map((section, index) => {
        const delay = revealDelayAt(0, index + 1);

        return (
          <DetailSection
            key={section?.id}
            variant="outlined"
            title={section?.title}
            icon={section?.icon}
            iconTone={section?.iconTone}
            tone={section?.tone}
            action={asideOf(section)}
            revealDelay={delay}
          >
            {bodyOf(section, delay)}
          </DetailSection>
        );
      })}
    </SidePanel>
  );
}
