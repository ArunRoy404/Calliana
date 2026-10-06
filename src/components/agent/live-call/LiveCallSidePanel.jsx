"use client";

import CallCalendarPanel from "@/components/agent/live-call/CallCalendarPanel";
import ClientSupportPanel from "@/components/agent/live-call/ClientSupportPanel";
import DispositionsPanel from "@/components/agent/live-call/DispositionsPanel";
import ScriptPanel from "@/components/agent/live-call/ScriptPanel";
import Reveal from "@/components/motion/Reveal";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import { useStoreParams } from "@/hooks/useUrlParams";
import { useLiveCallStore } from "@/store/agent/useLiveCallStore";

/**
 * The workspace's side panel — Scripts, Dispositions, Calendar and Support
 * on boxed tabs. The open tab is the URL's `?tab=` (rule 26), so a link
 * reopens the same tab. Reveals after `revealDelay`.
 */
export default function LiveCallSidePanel({ content, revealDelay = 0 }) {
  const params = useStoreParams(useLiveCallStore);
  const tab = useLiveCallStore((state) => state.tab(params));
  const setTab = useLiveCallStore((state) => state.setTab);

  const panels = {
    scripts: <ScriptPanel script={content?.script} />,
    dispositions: <DispositionsPanel dispositions={content?.dispositions} />,
    calendar: <CallCalendarPanel calendar={content?.calendar} />,
    support: <ClientSupportPanel clientSupport={content?.clientSupport} />,
  };

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="min-w-0 rounded-8 border border-solid border-border-default bg-surface-canvas p-4"
    >
      <UnderlineTabs
        variant="boxed"
        tabs={content?.tabs}
        panels={panels}
        value={tab}
        onValueChange={setTab}
      />
    </Reveal>
  );
}
