"use client";

import Button from "@/components/atoms/Button";
import AddAgentFields from "@/components/agents/add/AddAgentFields";
import SidePanel from "@/components/overlays/SidePanel";
import { useAddAgentFormStore } from "@/store/admin/useAddAgentFormStore";
import { useAgentsStore } from "@/store/admin/useAgentsStore";

/**
 * "Add new agent account" — Figma 198:32312, on the shared `SidePanel`.
 * The panel's open state lives in the agents store; the form's in its own.
 */
export default function AddAgentPanel() {
  const isOpen = useAgentsStore((state) => state.isAddOpen);
  const setOpen = useAgentsStore((state) => state.setAddOpen);
  const content = useAddAgentFormStore((state) => state.content);
  const cancel = useAddAgentFormStore((state) => state.cancel);
  const submitInvite = useAddAgentFormStore((state) => state.submitInvite);

  return (
    <SidePanel
      open={isOpen}
      onOpenChange={setOpen}
      title={content?.title}
      subtitle={content?.subtitle}
      footer={
        <>
          <p className="text-body-sm mr-auto text-text-secondary">
            <span className="text-status-error">
              {content?.footer?.requiredMark}
            </span>{" "}
            {content?.footer?.requiredNote}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="neutral" onClick={cancel}>
              {content?.footer?.cancelLabel}
            </Button>
            <Button onClick={submitInvite}>
              {content?.footer?.submitLabel}
            </Button>
          </div>
        </>
      }
    >
      <AddAgentFields />
    </SidePanel>
  );
}
