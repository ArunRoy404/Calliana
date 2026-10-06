"use client";

import CallNoteCard from "@/components/agent/live-call/CallNoteCard";
import CallOutcomeCard from "@/components/agent/live-call/CallOutcomeCard";
import CriticalInstructionCard from "@/components/agent/live-call/CriticalInstructionCard";
import ExtensionsCard from "@/components/agent/live-call/ExtensionsCard";
import LiveCallBanner from "@/components/agent/live-call/LiveCallBanner";
import LiveCallSidePanel from "@/components/agent/live-call/LiveCallSidePanel";
import PreviousCallsCard from "@/components/agent/live-call/PreviousCallsCard";
import StandardResponsesCard from "@/components/agent/live-call/StandardResponsesCard";
import SupportInstructionsCard from "@/components/agent/live-call/SupportInstructionsCard";
import DetailSection from "@/components/cards/DetailSection";
import FactList from "@/components/cards/FactList";
import { revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useLiveCallStore } from "@/store/agent/useLiveCallStore";

/**
 * The agent's Live Call Workspace: the call banner over three columns —
 * the caller's critical instruction, profile, the client's support
 * instructions and extensions; the call note, its categories and outcome,
 * and the caller's previous calls; the scripts / dispositions / calendar /
 * support side panel and the standard client responses.
 *
 * Below `xl` the columns stack, the critical instruction and the note
 * first (CSS `order`), so on a phone the agent sees the rule and can write
 * straight away. The page hands out the reveal order, column by column.
 */
export default function LiveCallWorkspace() {
  const content = useLiveCallStore((state) => state.content);
  const notFunctional = notFunctionalProps(content);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <LiveCallBanner content={content} revealDelay={revealDelayAt(0, 0)} />

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,368px)_minmax(0,1fr)_minmax(0,400px)]">
        <div className="contents xl:flex xl:min-w-0 xl:flex-col xl:gap-4">
          <div className="order-1 min-w-0 xl:order-none">
            <CriticalInstructionCard
              critical={content?.critical}
              revealDelay={revealDelayAt(0, 1)}
            />
          </div>
          <div className="order-4 flex min-w-0 flex-col gap-4 xl:order-none">
            <DetailSection
              size="lg"
              title={content?.callerProfile?.title}
              revealDelay={revealDelayAt(0, 2)}
            >
              <FactList facts={content?.callerProfile?.facts} />
            </DetailSection>
            <SupportInstructionsCard
              support={content?.support}
              revealDelay={revealDelayAt(0, 3)}
            />
            <ExtensionsCard
              extensions={content?.extensions}
              notFunctional={notFunctional}
              revealDelay={revealDelayAt(0, 4)}
            />
          </div>
        </div>

        <div className="order-2 flex min-w-0 flex-col gap-4 xl:order-none">
          <CallNoteCard
            note={content?.note}
            responses={content?.responses}
            notFunctional={notFunctional}
            revealDelay={revealDelayAt(0, 2)}
          />
          <CallOutcomeCard
            outcome={content?.outcome}
            revealDelay={revealDelayAt(0, 3)}
          />
          <PreviousCallsCard
            previousCalls={content?.previousCalls}
            separator={content?.separator}
            revealDelay={revealDelayAt(0, 4)}
          />
        </div>

        <div className="order-3 flex min-w-0 flex-col gap-4 xl:order-none">
          <LiveCallSidePanel
            content={content}
            revealDelay={revealDelayAt(0, 3)}
          />
          <StandardResponsesCard
            panel={content?.responsesPanel}
            responses={content?.responses}
            insertIcon={content?.note?.insertIcon}
            revealDelay={revealDelayAt(0, 4)}
          />
        </div>
      </div>
    </div>
  );
}
