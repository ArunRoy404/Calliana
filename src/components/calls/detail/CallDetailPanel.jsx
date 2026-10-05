"use client";

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
 * `SidePanel`. The info card sits on top, then one
 * outlined `DetailSection` per block: recording, summary, agent notes, and —
 * when the call has them — the amber triage note and the event timeline.
 *
 * The call is the URL's `?call=<id>`, read through the calls store, so the
 * panel opens straight from a shared link; on close the last call is kept on
 * screen while the panel slides away. Sections reveal in reading order and
 * their delays follow the sections actually shown, so an absent triage note
 * leaves no gap in the sequence.
 *
 * `useStore` is the call list it opens from — any `createTableStore` store
 * carrying `callDetailSlice` (the admin calls directory by default, the
 * client portal's Calls & Notes too).
 */
export default function CallDetailPanel({ useStore = useCallsStore }) {
  const params = useStoreParams(useStore);
  const selectedCall = useStore((state) => state.selectedCall(params));
  const setOpen = useStore((state) => state.setDetailOpen);
  const content = useStore((state) => state.detailContent);

  const call = useRetainedValue(selectedCall);
  const notFunctional = notFunctionalProps(content);
  const labels = content?.labels;

  const editNotesAction = (
    <Button
      variant="link"
      size="none"
      className="text-body-md font-semibold"
      {...notFunctional}
    >
      {labels?.editNotes}
    </Button>
  );

  const sections = [
    {
      id: "recording",
      title: labels?.recordingTitle,
      icon: content?.recordingIcon,
      iconTone: "primary",
      action: call?.duration && (
        <span className="text-label-lg text-brand-ink-black">
          {call?.duration}
        </span>
      ),
      render: (delay) => (
        <CallRecordingPlayer
          content={content}
          notFunctional={notFunctional}
          revealDelay={nestedRevealDelayAt(delay, 0)}
        />
      ),
    },
    { id: "summary", title: labels?.summaryTitle, text: call?.summary },
    {
      id: "agentNotes",
      title: labels?.agentNotesTitle,
      action: editNotesAction,
      text: call?.agentNotes,
    },
    call?.triageNote && {
      id: "triage",
      title: labels?.triageNotesTitle,
      icon: content?.lockIcon,
      tone: "warning",
      text: call?.triageNote,
    },
    call?.timeline && {
      id: "timeline",
      title: labels?.timelineTitle,
      render: (delay) => (
        <Timeline events={call?.timeline} emphasis revealDelay={delay} />
      ),
    },
  ].filter(Boolean);

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
            action={section?.action}
            revealDelay={delay}
          >
            {section?.render?.(delay) ?? (
              <p
                className={cn(
                  "text-body-md",
                  TONE_TEXT?.[section?.tone] ?? "text-text-secondary",
                )}
              >
                {section?.text}
              </p>
            )}
          </DetailSection>
        );
      })}
    </SidePanel>
  );
}
