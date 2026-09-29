"use client";

import ClientActivitiesTab from "@/components/clients/detail/ClientActivitiesTab";
import ClientAppointmentsTab from "@/components/clients/detail/ClientAppointmentsTab";
import ClientCallsTab from "@/components/clients/detail/ClientCallsTab";
import ClientContactsTab from "@/components/clients/detail/ClientContactsTab";
import ClientDetailHeader from "@/components/clients/detail/ClientDetailHeader";
import ClientMessagesTab from "@/components/clients/detail/ClientMessagesTab";
import ClientNotesTab from "@/components/clients/detail/ClientNotesTab";
import ClientOverviewTab from "@/components/clients/detail/ClientOverviewTab";
import ClientTasksTab from "@/components/clients/detail/ClientTasksTab";
import TextureLayer from "@/components/decor/TextureLayer";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import { useUrlParams } from "@/hooks/useUrlParams";
import { cn } from "@/lib/cn";
import { MAIN_BLEED } from "@/lib/layout";
import { useClientsStore } from "@/store/admin/useClientsStore";

/**
 * One client's page — Figma 198:30338: a white header band over a textured
 * body that holds the tabs. The page runs edge to edge, cancelling the
 * dashboard's own padding (`MAIN_BLEED`).
 *
 * The active tab is the URL's `?tab=` (rule 26), so a link opens the page on
 * that tab and Back / Forward move between tabs' links. Each tab is its own
 * component and reveals its content as it is selected.
 */
export default function ClientDetailView({ clientId }) {
  const client = useClientsStore((state) => state.clientById(clientId));
  const content = useClientsStore((state) => state.detailContent);
  const schema = useClientsStore((state) => state.detailParamsSchema);
  const params = useUrlParams(schema);
  const tab = useClientsStore((state) => state.detailTab(params));
  const setTab = useClientsStore((state) => state.setDetailTab);

  const tabProps = { client, content };
  const panels = {
    overview: <ClientOverviewTab {...tabProps} />,
    contacts: <ClientContactsTab {...tabProps} />,
    calls: <ClientCallsTab {...tabProps} />,
    messages: <ClientMessagesTab {...tabProps} />,
    appointments: <ClientAppointmentsTab {...tabProps} />,
    tasks: <ClientTasksTab {...tabProps} />,
    instructions: <ClientNotesTab {...tabProps} />,
    activities: <ClientActivitiesTab {...tabProps} />,
  };

  return (
    <div className={cn("flex min-w-0 flex-col", MAIN_BLEED)}>
      <ClientDetailHeader client={client} content={content} />

      <div className="relative isolate flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <TextureLayer src={content?.texture} scrim />
        <UnderlineTabs
          tabs={client?.tabs}
          panels={panels}
          value={tab}
          onValueChange={setTab}
          spacing="wide"
        />
      </div>
    </div>
  );
}
