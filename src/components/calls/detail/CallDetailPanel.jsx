"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import CallRecordingPlayer from "@/components/calls/detail/CallRecordingPlayer";
import CardField from "@/components/cards/CardField";
import DetailSection from "@/components/cards/DetailSection";
import Reveal from "@/components/motion/Reveal";
import SidePanel from "@/components/overlays/SidePanel";
import Timeline from "@/components/timeline/Timeline";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { cn } from "@/lib/cn";
import { revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { DEFAULT_TONE, TONE_TEXT } from "@/lib/tones";
import { useCallsStore } from "@/store/admin/useCallsStore";

/**
 * One call's details — Figma 202:38997, on the shared `SidePanel`. Section
 * titles here run at 16px semibold, not `DetailSection`'s 20px `text-h4`
 * default, so every title is passed as a styled node rather than a bare
 * string (rule 30) — `SECTION_TITLE_CLASS` keeps that one override in one
 * place for the five sections below.
 *
 * The call is the URL's `?call=<id>`, read through the calls store, so the
 * panel opens straight from a shared link. On close the last call is kept on
 * screen while the panel slides away.
 */
const SECTION_TITLE_CLASS = "text-body-lg font-semibold text-brand-ink-black";
const EDIT_LINK_CLASS = "text-body-md font-semibold";

export default function CallDetailPanel() {
  const params = useStoreParams(useCallsStore);
  const selectedCall = useCallsStore((state) => state.selectedCall(params));
  const setOpen = useCallsStore((state) => state.setDetailOpen);
  const content = useCallsStore((state) => state.detailContent);

  const call = useRetainedValue(selectedCall);
  const notFunctional = notFunctionalProps(content);
  const labels = content?.labels;

  return (
    <SidePanel
      open={Boolean(selectedCall)}
      onOpenChange={setOpen}
      title={`Call Details: ${call?.caller ?? ""}`}
      subtitle={`${call?.startTime ?? ""} • Duration ${call?.duration ?? ""}`}
      footer={content?.footerActions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant}
          href={action?.hrefField ? call?.[action?.hrefField] : undefined}
          {...(!action?.hrefField ? notFunctional : undefined)}
        >
          {action?.label}
        </Button>
      ))}
    >
      <Reveal className="flex flex-col gap-4 rounded-8 border border-solid border-border-default bg-surface-base p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StatusBadge variant="tag" label={call?.status?.label} tone={call?.status?.tone} />
          <StatusBadge
            variant="tag"
            label={call?.followUp?.label}
            tone={call?.followUp?.tone}
            showDot={false}
          />
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content?.infoFields?.map((field) => (
            <CardField key={field?.id} label={field?.label}>
              <span
                className={cn(
                  "text-body-lg truncate font-semibold",
                  field?.tone ? (TONE_TEXT?.[field?.tone] ?? TONE_TEXT?.[DEFAULT_TONE]) : "text-brand-black",
                )}
              >
                {call?.[field?.id]}
              </span>
            </CardField>
          ))}
        </dl>
      </Reveal>

      <DetailSection
        title={<span className={SECTION_TITLE_CLASS}>{labels?.recordingTitle}</span>}
        action={<span className="text-body-md font-semibold text-text-secondary">{call?.duration}</span>}
        revealDelay={revealDelayAt(0, 1)}
      >
        <CallRecordingPlayer call={call} content={content} notFunctional={notFunctional} />
      </DetailSection>

      <DetailSection
        title={<span className={SECTION_TITLE_CLASS}>{labels?.summaryTitle}</span>}
        action={<span className="text-body-md font-semibold text-text-secondary">{call?.duration}</span>}
        revealDelay={revealDelayAt(0, 2)}
      >
        <p className="text-body-md text-text-secondary">{call?.summary}</p>
      </DetailSection>

      <DetailSection
        title={<span className={SECTION_TITLE_CLASS}>{labels?.agentNotesTitle}</span>}
        action={
          <Button variant="link" size="none" className={EDIT_LINK_CLASS} {...notFunctional}>
            {labels?.editNotes}
          </Button>
        }
        revealDelay={revealDelayAt(0, 3)}
      >
        <p className="text-body-md text-text-secondary">{call?.agentNotes}</p>
      </DetailSection>

      <DetailSection
        title={
          <span className={cn(SECTION_TITLE_CLASS, "inline-flex items-center gap-1.5 text-status-warning")}>
            <AssetIcon icon={content?.lockIcon} />
            {labels?.triageNotesTitle}
          </span>
        }
        action={
          <Button variant="link" size="none" className={EDIT_LINK_CLASS} {...notFunctional}>
            {labels?.editNotes}
          </Button>
        }
        revealDelay={revealDelayAt(0, 4)}
      >
        <p className="text-body-md text-status-warning">{call?.triageNote}</p>
      </DetailSection>

      <DetailSection
        title={<span className={SECTION_TITLE_CLASS}>{labels?.timelineTitle}</span>}
        action={
          <Button variant="link" size="none" className={EDIT_LINK_CLASS} {...notFunctional}>
            {labels?.editNotes}
          </Button>
        }
        revealDelay={revealDelayAt(0, 5)}
      >
        <Timeline events={call?.timeline} emphasis revealDelay={revealDelayAt(0, 5)} />
      </DetailSection>
    </SidePanel>
  );
}
