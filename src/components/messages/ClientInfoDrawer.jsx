"use client";

import ClientInfoPanel from "@/components/messages/ClientInfoPanel";
import SidePanel from "@/components/overlays/SidePanel";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useMessagesStore } from "@/store/admin/useMessagesStore";

/**
 * The open conversation's client, as a drawer — Figma 167:51527. On a phone
 * the three columns cannot sit side by side, so the client info that is the
 * third column from `xl` up is reached here instead, from the thread header's
 * details button (`?panel=info`, rule 20). Built on the shared `SidePanel`,
 * with the column's own `ClientInfoPanel` in its `panel` variant, and the
 * last client kept on screen while it slides away.
 */
export default function ClientInfoDrawer() {
  const params = useStoreParams(useMessagesStore);
  const conversation = useMessagesStore((state) =>
    state.selectedConversation(params),
  );
  const isOpen = useMessagesStore((state) => state.isClientInfoOpen(params));
  const setOpen = useMessagesStore((state) => state.setClientInfoOpen);
  const content = useMessagesStore((state) => state.content);

  const client = useRetainedValue(conversation?.client);
  const notFunctional = notFunctionalProps(content);

  return (
    <SidePanel
      open={isOpen && Boolean(conversation)}
      onOpenChange={setOpen}
      title={content?.clientInfo?.title}
    >
      <ClientInfoPanel
        variant="panel"
        client={client}
        content={content}
        notFunctional={notFunctional}
      />
    </SidePanel>
  );
}
