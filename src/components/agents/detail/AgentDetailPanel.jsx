"use client";

import Button from "@/components/atoms/Button";
import AgentActivitiesTab from "@/components/agents/detail/AgentActivitiesTab";
import AgentCallsTab from "@/components/agents/detail/AgentCallsTab";
import AgentClientsTab from "@/components/agents/detail/AgentClientsTab";
import AgentDetailActions from "@/components/agents/detail/AgentDetailActions";
import AgentDetailHeader from "@/components/agents/detail/AgentDetailHeader";
import AgentPerformanceTab from "@/components/agents/detail/AgentPerformanceTab";
import AgentProfileTab from "@/components/agents/detail/AgentProfileTab";
import AgentScheduleTab from "@/components/agents/detail/AgentScheduleTab";
import AgentTasksTab from "@/components/agents/detail/AgentTasksTab";
import SidePanel from "@/components/overlays/SidePanel";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useAgentsStore } from "@/store/admin/useAgentsStore";

/**
 * One agent's detail — Figma 198:32695 and the six tab frames after it, on the
 * shared `SidePanel`. The header and action row stay above the tabs; each tab
 * is its own component and reveals its content as it is selected.
 */
export default function AgentDetailPanel() {
  const isOpen = useAgentsStore((state) => state.isDetailOpen);
  const setOpen = useAgentsStore((state) => state.setDetailOpen);
  const agent = useAgentsStore((state) => state.selectedAgent);
  const content = useAgentsStore((state) => state.detailContent);
  const tab = useAgentsStore((state) => state.detailTab);
  const setTab = useAgentsStore((state) => state.setDetailTab);

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
      open={isOpen}
      onOpenChange={setOpen}
      title={agent?.name}
      header={<AgentDetailHeader agent={agent} labels={content?.labels} />}
      footer={
        <Button onClick={() => setOpen?.(false)}>{content?.closeLabel}</Button>
      }
    >
      <AgentDetailActions
        actions={content?.actions}
        notFunctional={notFunctional}
      />

      <UnderlineTabs
        tabs={content?.tabs}
        panels={panels}
        value={tab}
        onValueChange={setTab}
      />
    </SidePanel>
  );
}
