"use client";

import ActionBar from "@/components/actions/ActionBar";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import CallPathStep from "@/components/routing/detail/CallPathStep";
import OperatorRow from "@/components/routing/detail/OperatorRow";
import CardField from "@/components/cards/CardField";
import DetailSection from "@/components/cards/DetailSection";
import Reveal from "@/components/motion/Reveal";
import SidePanel from "@/components/overlays/SidePanel";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useRoutingStore } from "@/store/admin/useRoutingStore";

/**
 * One queue's read-only details — Figma 381:38657, on the shared
 * `SidePanel`. Opened by a queue row (`?queue=<id>`); its "Edit Rules"
 * action swaps this for the separate editable `EditRoutingRulesPanel`
 * (376:28372, `?rules=<id>`) — two panels for one queue, not one panel
 * doing both jobs (rule 30).
 */
export default function QueueDetailPanel() {
  const params = useStoreParams(useRoutingStore);
  const selectedQueue = useRoutingStore((state) => state.selectedQueue(params));
  const setOpen = useRoutingStore((state) => state.setQueueOpen);
  const openRules = useRoutingStore((state) => state.openRules);
  const content = useRoutingStore((state) => state.queueDetailContent);

  const queue = useRetainedValue(selectedQueue);
  const notFunctional = notFunctionalProps(content);
  const labels = content?.labels;

  const headerActions = content?.headerActions?.map((action) =>
    action?.id === "edit" ? { ...action, onClick: () => openRules?.(queue?.id) } : action,
  );

  return (
    <SidePanel
      open={Boolean(selectedQueue)}
      onOpenChange={setOpen}
      title={queue?.name}
      subtitle={labels?.idLine
        ?.replace("{id}", queue?.queueId ?? "")
        ?.replace("{ext}", queue?.extension ?? "")}
      className="sm:max-w-3xl"
      footer={
        <>
          <Button variant="danger" className="mr-auto" {...notFunctional}>
            {content?.footer?.deleteLabel}
          </Button>
          <Button variant="neutral" onClick={() => setOpen?.(false)}>
            {content?.footer?.closeLabel}
          </Button>
          <Button onClick={() => openRules?.(queue?.id)}>{content?.footer?.editLabel}</Button>
        </>
      }
    >
      <Reveal className="flex flex-wrap items-center justify-between gap-4 rounded-8 border border-solid border-border-default bg-surface-canvas p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-label-lg text-brand-black">{labels?.statusHeadline}</p>
            <p className="text-body-sm text-text-tertiary">
              {labels?.algorithmLine?.replace("{strategy}", queue?.algorithm ?? "")}
            </p>
          </div>
          <StatusBadge variant="tag" label={queue?.priority?.label} tone={queue?.priority?.tone} />
        </div>

        <ActionBar
          actions={headerActions}
          buttonProps={{
            notFunctionalMessage: content?.notFunctionalMessage,
            notFunctionalDescription: content?.notFunctionalDescription,
          }}
        />
      </Reveal>

      <DetailSection
        title={labels?.purposeTitle}
        action={
          <Button variant="link" size="none" {...notFunctional}>
            {labels?.editNotes}
          </Button>
        }
        revealDelay={revealDelayAt(0, 1)}
      >
        <p className="text-body-md text-text-secondary">{queue?.purpose}</p>
      </DetailSection>

      <DetailSection
        title={labels?.telemetryTitle}
        action={
          <StatusBadge
            variant="tag"
            label={queue?.telemetryStatus?.label}
            tone={queue?.telemetryStatus?.tone}
          />
        }
        revealDelay={revealDelayAt(0, 2)}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {queue?.stats?.map((stat) => (
            <CardField key={stat?.id} label={stat?.label}>
              <span className="text-body-lg text-brand-black">{stat?.value}</span>
            </CardField>
          ))}
        </dl>
      </DetailSection>

      <DetailSection title={labels?.callPathTitle} revealDelay={revealDelayAt(0, 3)}>
        <ul className="flex flex-col gap-4">
          {queue?.callPath?.map((step, index) => (
            <CallPathStep
              key={step?.id}
              step={step}
              index={index}
              revealDelay={nestedRevealDelayAt(revealDelayAt(0, 3), index)}
            />
          ))}
        </ul>
      </DetailSection>

      <DetailSection
        title={`${labels?.operatorsTitle} (${queue?.operators?.length ?? 0})`}
        action={
          <Button variant="link" size="none" {...notFunctional}>
            {labels?.reassignAgents}
          </Button>
        }
        revealDelay={revealDelayAt(0, 4)}
      >
        <ul className="flex flex-col gap-3">
          {queue?.operators?.map((operator, index) => (
            <OperatorRow
              key={operator?.id}
              operator={operator}
              removeLabel={labels?.remove}
              notFunctional={notFunctional}
              revealDelay={nestedRevealDelayAt(revealDelayAt(0, 4), index)}
            />
          ))}
        </ul>
      </DetailSection>

      <DetailSection
        title={`${labels?.clientsTitle} (${queue?.linkedClients?.length ?? 0})`}
        action={
          <Button variant="link" size="none" {...notFunctional}>
            {labels?.editNotes}
          </Button>
        }
        revealDelay={revealDelayAt(0, 5)}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {queue?.linkedClients?.map((client) => (
            <Button key={client} variant="neutral" {...notFunctional}>
              {client}
            </Button>
          ))}
        </div>
      </DetailSection>
    </SidePanel>
  );
}
