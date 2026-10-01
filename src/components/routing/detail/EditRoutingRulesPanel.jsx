"use client";

import { useEffect } from "react";

import Button from "@/components/atoms/Button";
import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import SettingRow from "@/components/cards/SettingRow";
import Switch from "@/components/atoms/Switch";
import SidePanel from "@/components/overlays/SidePanel";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useEditRoutingRulesFormStore } from "@/store/admin/useEditRoutingRulesFormStore";
import { useRoutingStore } from "@/store/admin/useRoutingStore";

/**
 * The section eyebrow Figma runs at 10px semibold uppercase in this panel —
 * far smaller than `DetailSection`'s 20px `text-h4` default, so this panel
 * builds its own section header rather than that component (rule 30).
 */
function SectionLabel({ children }) {
  return (
    <h3 className="text-label-sm font-semibold tracking-wide text-text-secondary uppercase">
      {children}
    </h3>
  );
}

/**
 * One queue's editable routing rules — Figma 376:28372, on the shared
 * `SidePanel`. Every value sits inside a real select or field (rule 30 — the
 * source draws them in select-height bordered boxes, so they are editable,
 * not display text). Opened via `?rules=<id>`; `loadQueue` seeds the form's
 * values from that queue each time the id changes.
 */
export default function EditRoutingRulesPanel() {
  const params = useStoreParams(useRoutingStore);
  const selectedRules = useRoutingStore((state) => state.selectedRules(params));
  const setOpen = useRoutingStore((state) => state.setRulesOpen);
  const loadQueue = useEditRoutingRulesFormStore((state) => state.loadQueue);
  const loadedQueueId = useEditRoutingRulesFormStore((state) => state.loadedQueueId);
  const content = useEditRoutingRulesFormStore((state) => state.content);
  const values = useEditRoutingRulesFormStore((state) => state.values);
  const setField = useEditRoutingRulesFormStore((state) => state.setField);
  const cancel = useEditRoutingRulesFormStore((state) => state.cancel);
  const submitAndClose = useEditRoutingRulesFormStore((state) => state.submitAndClose);
  const store = useEditRoutingRulesFormStore;

  const queue = useRetainedValue(selectedRules);
  const notFunctional = notFunctionalProps(content);
  const labels = content?.labels;

  useEffect(() => {
    if (selectedRules?.id && selectedRules?.id !== loadedQueueId) loadQueue?.(selectedRules);
  }, [selectedRules, loadedQueueId, loadQueue]);

  return (
    <SidePanel
      open={Boolean(selectedRules)}
      onOpenChange={setOpen}
      title="Edit Routing Rules"
      subtitle={queue?.name}
      footer={
        <>
          <Button variant="neutral" onClick={cancel}>
            {content?.footer?.cancelLabel}
          </Button>
          <Button onClick={submitAndClose}>{content?.footer?.submitLabel}</Button>
        </>
      }
    >
      <SectionLabel>{labels?.strategyTitle}</SectionLabel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StoreSelect useStore={store} select={content?.selects?.distributionStrategy} />
        <StoreSelect useStore={store} select={content?.selects?.queuePriority} />
        <StoreSelect useStore={store} select={content?.selects?.maxSla} />
      </div>

      <SectionLabel>{labels?.fallbackTitle}</SectionLabel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StoreSelect useStore={store} select={content?.selects?.ringTimeout} />
        <StoreSelect useStore={store} select={content?.selects?.primaryFallback} />
        <StoreSelect useStore={store} select={content?.selects?.secondFallback} />
      </div>

      <SettingRow label={labels?.simultaneousFallback} description={labels?.simultaneousFallbackHelp}>
        <Switch
          checked={Boolean(values?.simultaneousFallback)}
          onCheckedChange={(checked) => setField?.("simultaneousFallback", checked)}
        />
      </SettingRow>

      <SectionLabel>{labels?.endpointTitle}</SectionLabel>
      <div className="flex flex-col gap-3 rounded-10 border border-solid border-border-default bg-surface-canvas p-3">
        <div className="flex flex-col gap-1">
          <p className="text-label-md font-semibold text-brand-black">{labels?.assignedOperators}</p>
          <p className="text-body-sm text-text-secondary">{queue?.assignedOperators?.join(", ")}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-label-md font-semibold text-brand-black">{labels?.linkedClients}</p>
          <p className="text-body-sm text-text-secondary">{queue?.linkedClients?.join(", ")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="neutral" {...notFunctional}>
            {labels?.manageAgents}
          </Button>
          <Button variant="neutral" {...notFunctional}>
            {labels?.manageClients}
          </Button>
        </div>
      </div>

      <SectionLabel>{labels?.ivrTitle}</SectionLabel>
      <div className="flex flex-col gap-3 rounded-10 border border-solid border-border-default bg-surface-base p-3">
        <StoreField useStore={store} field={content?.ivrGreetingField} />

        <div className="flex flex-col gap-2">
          <p className="text-label-md font-semibold text-brand-black">{labels?.callPathPreview}</p>
          <div className="flex flex-wrap items-center gap-2">
            {queue?.callPath?.map((step, index) => (
              <span key={step} className="flex items-center gap-2">
                <span className="text-label-sm rounded-4 border border-solid border-border-default bg-surface-canvas px-2 py-1 text-text-secondary">
                  {step}
                </span>
                {index < (queue?.callPath?.length ?? 0) - 1 && (
                  <span aria-hidden className="text-text-tertiary">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SettingRow label={labels?.queueActive} description={labels?.queueActiveHelp}>
        <Switch
          checked={Boolean(values?.queueActive)}
          onCheckedChange={(checked) => setField?.("queueActive", checked)}
        />
      </SettingRow>
    </SidePanel>
  );
}
