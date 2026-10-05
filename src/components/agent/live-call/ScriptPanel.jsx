"use client";

import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";
import StaggerList from "@/components/lists/StaggerList";
import { useStoreParams } from "@/hooks/useUrlParams";
import { useLiveCallStore } from "@/store/agent/useLiveCallStore";

/**
 * The "Scripts" tab — the client's call script: its title and version,
 * then the current interactive decision step (the question to ask and how)
 * and the caller responses to choose from, each a card, some tagged ("High
 * Frequency", "Urgent"). The chosen response is the URL's `?intent=`.
 */
export default function ScriptPanel({ script }) {
  const params = useStoreParams(useLiveCallStore);
  const intent = useLiveCallStore((state) => state.intent(params));
  const chooseIntent = useLiveCallStore((state) => state.chooseIntent);

  return (
    <div className="flex flex-col gap-4">
      <Reveal className="flex items-start justify-between gap-3">
        <h3 className="text-label-lg text-brand-black">{script?.title}</h3>
        <StatusBadge
          variant="outline"
          showDot={false}
          label={script?.version}
          tone="primary"
        />
      </Reveal>

      <Reveal className="flex flex-col gap-3 bg-surface-base pb-1">
        <p className="text-label-lg border-b border-solid border-border-strong px-4 py-3 text-action-primary">
          {script?.stepLabel}
        </p>
        <div className="flex flex-col gap-1 border-b border-solid border-brand-track px-2 pb-3">
          <p className="text-label-lg text-brand-black">{script?.question}</p>
          <p className="text-body-sm text-text-secondary">{script?.hint}</p>
        </div>
        <p className="text-body-lg px-2 text-text-secondary">
          {script?.responsesLabel}
        </p>
        <StaggerList items={script?.responses} className="gap-2 px-2">
          {(response, delay) => (
            <Reveal as="li" key={response?.id} delay={delay}>
              <Button
                variant="choice"
                size="card"
                aria-pressed={intent === response?.id}
                onClick={() => chooseIntent?.(response?.id)}
                className="flex-row items-center justify-between bg-surface-selected text-status-info"
              >
                <span className="text-body-lg">{response?.label}</span>
                {response?.tag && (
                  <span className="text-body-md shrink-0 border border-solid border-border-strong bg-action-secondary px-2 py-1 text-text-primary">
                    {response?.tag}
                  </span>
                )}
              </Button>
            </Reveal>
          )}
        </StaggerList>
      </Reveal>
    </div>
  );
}
