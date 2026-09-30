"use client";

import DialerHeader from "@/components/calls/add/DialerHeader";
import DialOutboundCallFields from "@/components/calls/add/DialOutboundCallFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useCallsStore } from "@/store/admin/useCallsStore";
import { useDialOutboundCallFormStore } from "@/store/admin/useDialOutboundCallFormStore";

/**
 * "Outbound CTI Softphone & Dialer" — the calls toolbar's primary action, on
 * the shared `FormPanel`. Wider than the default drawer (`sm:max-w-3xl` is a
 * genuine per-instance layout need, rule 0 — the keypad and context fields
 * sit side by side) and its own header rather than the plain title/subtitle.
 */
export default function DialOutboundCallPanel() {
  const content = useDialOutboundCallFormStore((state) => state.content);

  return (
    <FormPanel
      useListStore={useCallsStore}
      useFormStore={useDialOutboundCallFormStore}
      header={<DialerHeader content={content} />}
      className="sm:max-w-3xl"
    >
      <DialOutboundCallFields />
    </FormPanel>
  );
}
