"use client";

import ClientInfoDetails from "@/components/messages/ClientInfoDetails";
import SidePanel from "@/components/overlays/SidePanel";
import { useRetainedValue } from "@/hooks/useRetainedValue";

/**
 * The client's details on the shared `SidePanel` — for the widths between
 * `md` and `xl`, where the inbox drops its client-info column. Opened by the
 * thread header's "Client info" button (`?panel=client`, rule 20); the last
 * client stays on screen while the panel slides away.
 */
export default function ClientInfoDrawer({
  open,
  onOpenChange,
  client,
  content,
  notFunctional,
}) {
  const shown = useRetainedValue(open ? client : null);
  const info = content?.clientInfo;

  return (
    <SidePanel
      open={open}
      onOpenChange={onOpenChange}
      title={info?.title}
      subtitle={shown?.name}
    >
      <ClientInfoDetails
        client={shown}
        info={info}
        notFunctional={notFunctional}
      />
    </SidePanel>
  );
}
