"use client";

import PreviousCallRow from "@/components/agent/live-call/PreviousCallRow";
import StatusBadge from "@/components/atoms/StatusBadge";
import DetailSection from "@/components/cards/DetailSection";
import StaggerList from "@/components/lists/StaggerList";
import { useStoreParams } from "@/hooks/useUrlParams";
import { useLiveCallNoteStore } from "@/store/agent/useLiveCallNoteStore";
import { useLiveCallStore } from "@/store/agent/useLiveCallStore";

/**
 * "Previous Calls From This Caller" — with their count — each a row that
 * opens beneath itself. The open one is the URL's `?call=` (one at a time,
 * none by default); "Copy message into active note" adds its message to
 * the note being written. Reveals after `revealDelay`; its rows follow.
 */
export default function PreviousCallsCard({
  previousCalls,
  separator,
  revealDelay = 0,
}) {
  const params = useStoreParams(useLiveCallStore);
  const openId = useLiveCallStore((state) => state.openCallId(params));
  const toggleCall = useLiveCallStore((state) => state.toggleCall);
  const insertText = useLiveCallNoteStore((state) => state.insertText);

  return (
    <DetailSection
      size="lg"
      revealDelay={revealDelay}
      title={
        <span className="flex flex-wrap items-center gap-3">
          {previousCalls?.title}
          <StatusBadge
            variant="outline"
            showDot={false}
            label={`(${previousCalls?.calls?.length ?? 0})`}
            tone="success"
          />
        </span>
      }
    >
      <StaggerList
        items={previousCalls?.calls}
        revealDelay={revealDelay}
        className="gap-3"
      >
        {(call, delay) => (
          <PreviousCallRow
            key={call?.id}
            call={call}
            labels={previousCalls}
            separator={separator}
            isOpen={openId === call?.id}
            onToggle={() => toggleCall?.(call?.id, openId)}
            onCopy={() => insertText?.(call?.message)}
            revealDelay={delay}
          />
        )}
      </StaggerList>
    </DetailSection>
  );
}
