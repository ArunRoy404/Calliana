"use client";

import Checkbox from "@/components/atoms/Checkbox";
import DtmfKeypad from "@/components/calls/add/DtmfKeypad";
import QuickContactsPanel from "@/components/calls/add/QuickContactsPanel";
import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import { revealDelayAt } from "@/lib/motion";
import { useDialOutboundCallFormStore } from "@/store/admin/useDialOutboundCallFormStore";

/**
 * The dialer's body: the pill tab strip, then either the DTMF keypad beside
 * the call's context fields, or the quick-contacts directory.
 */
export default function DialOutboundCallFields() {
  const content = useDialOutboundCallFormStore((state) => state.content);
  const phone = useDialOutboundCallFormStore((state) => state.values?.phone);
  const recipientName = useDialOutboundCallFormStore((state) => state.values?.recipientName);
  const autoRecord = useDialOutboundCallFormStore((state) => state.values?.autoRecord);
  const dialerTab = useDialOutboundCallFormStore((state) => state.dialerTab);
  const setDialerTab = useDialOutboundCallFormStore((state) => state.setDialerTab);
  const pressDigit = useDialOutboundCallFormStore((state) => state.pressDigit);
  const backspace = useDialOutboundCallFormStore((state) => state.backspace);
  const selectContact = useDialOutboundCallFormStore((state) => state.selectContact);
  const setField = useDialOutboundCallFormStore((state) => state.setField);
  const store = useDialOutboundCallFormStore;

  const panels = {
    keypad: (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DtmfKeypad
          content={content}
          phone={phone}
          recipientName={recipientName}
          onDigit={pressDigit}
          onBackspace={backspace}
        />

        <div className="flex flex-col gap-4">
          <StoreSelect useStore={store} select={content?.selects?.client} />
          <StoreSelect useStore={store} select={content?.selects?.callerId} />
          <StoreSelect useStore={store} select={content?.selects?.purpose} />
          <StoreField useStore={store} field={content?.notesField} />
          <Checkbox
            label={content?.autoRecord?.label}
            checked={Boolean(autoRecord)}
            onChange={(event) => setField?.("autoRecord", event?.target?.checked)}
          />
        </div>
      </div>
    ),
    contacts: <QuickContactsPanel content={content} onSelect={selectContact} />,
  };

  return (
    <Reveal delay={revealDelayAt(0, 0)}>
      <UnderlineTabs
        variant="pill"
        tabs={content?.tabs}
        panels={panels}
        value={dialerTab}
        onValueChange={setDialerTab}
      />
    </Reveal>
  );
}
