"use client";

import Button from "@/components/atoms/Button";
import CardField from "@/components/cards/CardField";
import DetailSection from "@/components/cards/DetailSection";
import RowCard from "@/components/cards/RowCard";
import ContactProfileCard from "@/components/client/contacts/ContactProfileCard";
import StaggerList from "@/components/lists/StaggerList";
import SidePanel from "@/components/overlays/SidePanel";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useClientContactsStore } from "@/store/client/useClientContactsStore";

/**
 * One contact's details — the design's "Contact Details" drawer, on the
 * shared `SidePanel` with its "Close" text button and no rules. The profile
 * card, the amber instruction for agents (when the contact has one),
 * Contact Context (last call, next appointment), Quick Actions and Recent
 * Calls & Appointments, then the footer's note and "Done".
 *
 * The contact is the URL's `?contact=<id>`, so a shared link opens it; the
 * last contact stays on screen while the drawer slides away. Sections
 * reveal in reading order, their delays following the sections shown, so a
 * contact without an instruction leaves no gap.
 */
export default function ContactDetailPanel() {
  const params = useStoreParams(useClientContactsStore);
  const selected = useClientContactsStore((state) =>
    state.selectedContact(params),
  );
  const setOpen = useClientContactsStore((state) => state.setDetailOpen);
  const content = useClientContactsStore((state) => state.detailContent);

  const contact = useRetainedValue(selected);
  const notFunctional = notFunctionalProps(content);
  const context = content?.context;
  const history = content?.history;

  const sections = [
    contact?.instruction && {
      id: "instruction",
      variant: "callout",
      tone: "warning",
      title: content?.instruction?.title,
      body: () => (
        <>
          <p className="text-body-lg font-medium text-text-primary">
            {contact?.instruction}
          </p>
          <p className="text-body-sm text-text-secondary">
            {content?.instruction?.note}
          </p>
        </>
      ),
    },
    {
      id: "context",
      title: context?.title,
      body: () => (
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CardField label={context?.lastCall} meta={contact?.lastCallMeta}>
            <span className="text-label-lg text-brand-black">
              {contact?.lastCallAt}
            </span>
          </CardField>
          <CardField
            label={context?.nextAppointment}
            meta={contact?.nextAppointmentMeta}
          >
            <span className="text-label-lg text-brand-black">
              {contact?.nextAppointmentAt ?? context?.none}
            </span>
          </CardField>
        </dl>
      ),
    },
    {
      id: "actions",
      title: content?.quickActions?.title,
      body: () => (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {content?.quickActions?.actions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              size="sm"
              href={action?.href}
              className="font-semibold"
              {...(!action?.href ? notFunctional : undefined)}
            >
              {action?.label}
            </Button>
          ))}
        </div>
      ),
    },
    {
      id: "history",
      title: history?.title,
      action: (
        <Button
          variant="link"
          size="none"
          href={contact?.historyHref}
          className="text-body-sm"
        >
          {history?.viewAll}
        </Button>
      ),
      body: (delay) => (
        <StaggerList items={contact?.history} revealDelay={delay}>
          {(entry, entryDelay) => (
            <RowCard key={entry?.id} variant="bare" revealDelay={entryDelay}>
              <p className="text-label-md font-semibold text-brand-black">
                {entry?.title}
              </p>
              <p className="text-body-sm text-text-secondary">{entry?.text}</p>
            </RowCard>
          )}
        </StaggerList>
      ),
    },
  ].filter(Boolean);

  return (
    <SidePanel
      open={Boolean(selected)}
      onOpenChange={setOpen}
      title={content?.title}
      subtitle={content?.subtitle}
      closeLabel={content?.closeLabel}
      closeIcon="text"
      ruled={false}
      footer={
        <>
          <p className="text-body-sm min-w-0 flex-1 text-text-secondary">
            {content?.footerNote}
          </p>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
            {content?.doneLabel}
          </Button>
        </>
      }
    >
      <ContactProfileCard contact={contact} revealDelay={revealDelayAt(0, 0)} />

      {sections?.map((section, index) => {
        const delay = revealDelayAt(0, index + 1);

        return (
          <DetailSection
            key={section?.id}
            variant={section?.variant ?? "card"}
            tone={section?.tone}
            title={section?.title}
            action={section?.action}
            revealDelay={delay}
          >
            {section?.body?.(delay)}
          </DetailSection>
        );
      })}
    </SidePanel>
  );
}
