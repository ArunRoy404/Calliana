"use client";

import Checkbox from "@/components/atoms/Checkbox";
import DtmfKeypad from "@/components/calls/add/DtmfKeypad";
import QuickContactsPanel from "@/components/calls/add/QuickContactsPanel";
import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import { nestedRevealDelayAt } from "@/lib/motion";
import { useDialOutboundCallFormStore } from "@/store/admin/useDialOutboundCallFormStore";

/**
 * The dialer's body: the centred pill tab strip, then either the DTMF keypad
 * card beside the call's context fields, or the quick-contacts directory.
 *
 * The keypad card and then each context field reveal one step apart as the
 * tab opens (rule 14).
 */
export default function DialOutboundCallFields() {
  const content = useDialOutboundCallFormStore((state) => state.content);
  const phone = useDialOutboundCallFormStore((state) => state.values?.phone);
  const recipientName = useDialOutboundCallFormStore(
    (state) => state.values?.recipientName,
  );
  const autoRecord = useDialOutboundCallFormStore(
    (state) => state.values?.autoRecord,
  );
  const dialerTab = useDialOutboundCallFormStore((state) => state.dialerTab);
  const setDialerTab = useDialOutboundCallFormStore(
    (state) => state.setDialerTab,
  );
  const pressDigit = useDialOutboundCallFormStore((state) => state.pressDigit);
  const backspace = useDialOutboundCallFormStore((state) => state.backspace);
  const selectContact = useDialOutboundCallFormStore(
    (state) => state.selectContact,
  );
  const setField = useDialOutboundCallFormStore((state) => state.setField);
  const store = useDialOutboundCallFormStore;

  const contextFields = [
    <StoreSelect
      key="client"
      useStore={store}
      select={content?.selects?.client}
    />,
    <StoreSelect
      key="callerId"
      useStore={store}
      select={content?.selects?.callerId}
    />,
    <StoreSelect
      key="purpose"
      useStore={store}
      select={content?.selects?.purpose}
    />,
    <StoreField key="notes" useStore={store} field={content?.notesField} />,
    <Checkbox
      key="autoRecord"
      variant="row"
      label={content?.autoRecord?.label}
      icon={content?.autoRecord?.icon}
      iconTone={content?.autoRecord?.iconTone}
      checked={Boolean(autoRecord)}
      onChange={(event) =>
        setField?.(content?.autoRecord?.name, event?.target?.checked)
      }
    />,
  ];

  const panels = {
    keypad: (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DtmfKeypad
          content={content}
          phone={phone}
          recipientName={recipientName}
          onDigit={pressDigit}
          onBackspace={backspace}
          revealDelay={nestedRevealDelayAt(0, 0)}
        />

        <div className="flex flex-col gap-4">
          {contextFields?.map((field, index) => (
            <Reveal key={field?.key} delay={nestedRevealDelayAt(0, index + 1)}>
              {field}
            </Reveal>
          ))}
        </div>
      </div>
    ),
    contacts: <QuickContactsPanel content={content} onSelect={selectContact} />,
  };

  return (
    <UnderlineTabs
      variant="pill"
      tabs={content?.tabs}
      panels={panels}
      value={dialerTab}
      onValueChange={setDialerTab}
    />
  );
}
