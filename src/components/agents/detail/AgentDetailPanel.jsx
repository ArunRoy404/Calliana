"use client";

import ActionBar from "@/components/actions/ActionBar";
import Button from "@/components/atoms/Button";
import AgentActivitiesTab from "@/components/agents/detail/AgentActivitiesTab";
import AgentCallsTab from "@/components/agents/detail/AgentCallsTab";
import AgentClientsTab from "@/components/agents/detail/AgentClientsTab";
import AgentDetailHeader from "@/components/agents/detail/AgentDetailHeader";
import AgentPerformanceTab from "@/components/agents/detail/AgentPerformanceTab";
import AgentProfileTab from "@/components/agents/detail/AgentProfileTab";
import AgentScheduleTab from "@/components/agents/detail/AgentScheduleTab";
import AgentTasksTab from "@/components/agents/detail/AgentTasksTab";
import SidePanel from "@/components/overlays/SidePanel";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useAgentsStore } from "@/store/admin/useAgentsStore";

/**
 * One agent's detail — Figma 198:32695 and the six tab frames after it, on the
 * shared `SidePanel`. The header and action row stay above the tabs; each tab
 * is its own component and reveals its content as it is selected.
 *
 * The agent and tab are the URL's `?agent=<id>&tab=<tab>`, read through the
 * agents store, so the panel opens straight from a shared link. On close the
 * last agent is kept on screen while the panel slides away.
 */
export default function AgentDetailPanel() {
  const params = useStoreParams(useAgentsStore);
  const selectedAgent = useAgentsStore((state) => state.selectedAgent(params));
  const tab = useAgentsStore((state) => state.detailTab(params));
  const setOpen = useAgentsStore((state) => state.setDetailOpen);
  const content = useAgentsStore((state) => state.detailContent);
  const setTab = useAgentsStore((state) => state.setDetailTab);

  const agent = useRetainedValue(selectedAgent);
  const notFunctional = notFunctionalProps(content);

  const panels = {
    profile: <AgentProfileTab agent={agent} content={content} />,
    performance: <AgentPerformanceTab agent={agent} content={content} />,
    clients: (
      <AgentClientsTab
        agent={agent}
        content={content}
        notFunctional={notFunctional}
      />
    ),
    calls: <AgentCallsTab agent={agent} />,
    tasks: <AgentTasksTab agent={agent} />,
    schedule: (
      <AgentScheduleTab
        agent={agent}
        content={content}
        notFunctional={notFunctional}
      />
    ),
    activities: <AgentActivitiesTab agent={agent} />,
  };

  return (
    <SidePanel
      open={Boolean(selectedAgent)}
      onOpenChange={setOpen}
      title={agent?.name}
      header={<AgentDetailHeader agent={agent} labels={content?.labels} />}
      footer={
        <Button onClick={() => setOpen?.(false)}>{content?.closeLabel}</Button>
      }
    >
      <ActionBar actions={content?.actions} buttonProps={notFunctional} />

      <UnderlineTabs
        tabs={content?.tabs}
        panels={panels}
        value={tab}
        onValueChange={setTab}
      />
    </SidePanel>
  );
}
