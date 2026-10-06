"use client";

import DialerHeader from "@/components/calls/add/DialerHeader";
import DialOutboundCallFields from "@/components/calls/add/DialOutboundCallFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useCallsStore } from "@/store/admin/useCallsStore";
import { useDialOutboundCallFormStore } from "@/store/admin/useDialOutboundCallFormStore";

/**
 * "Outbound CTI Softphone & Dialer" — the calls toolbar's primary action, on
 * the shared `FormPanel`. The design draws it backdrop-centred, so it opens
 * as a `sectioned` `Modal` rather than a drawer (rule 30): full-width header
 * and footer bands, the body scrolling between them, at the modal's own
 * 700px width. Its own header replaces the plain title/subtitle.
 *
 * `useListStore` is the call list it opens from (the admin's by default) —
 * its `?panel=add` opens it.
 */
export default function DialOutboundCallPanel({
  useListStore = useCallsStore,
}) {
  const content = useDialOutboundCallFormStore((state) => state.content);

  return (
    <FormPanel
      useListStore={useListStore}
      useFormStore={useDialOutboundCallFormStore}
      overlay="modal"
      variant="sectioned"
      header={<DialerHeader content={content} />}
    >
      <DialOutboundCallFields />
    </FormPanel>
  );
}
