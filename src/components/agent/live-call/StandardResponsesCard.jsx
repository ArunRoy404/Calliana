"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import RowCard from "@/components/cards/RowCard";
import Reveal from "@/components/motion/Reveal";
import StaggerList from "@/components/lists/StaggerList";
import { useLiveCallNoteStore } from "@/store/agent/useLiveCallNoteStore";

/**
 * "Standard Client Responses" — the client's canned answers, each a card
 * with its text and an "Insert" that adds it to the call note (the same
 * entries as the note's "Quick insert" chips). Reveals after
 * `revealDelay`; its cards follow it in.
 */
export default function StandardResponsesCard({
  panel,
  responses,
  insertIcon,
  revealDelay = 0,
}) {
  const insertText = useLiveCallNoteStore((state) => state.insertText);

  return (
    <Reveal as="section" delay={revealDelay} className="flex flex-col gap-4">
      <h3 className="text-h4 text-text-secondary">{panel?.title}</h3>
      <StaggerList
        items={responses}
        revealDelay={revealDelay}
        className="gap-4"
      >
        {(response, delay) => (
          <RowCard
            key={response?.id}
            variant="compact"
            revealDelay={delay}
            className="gap-3 p-2"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-body-lg text-brand-black">
                {response?.label}
              </span>
              <Button
                variant="outline-primary"
                size="xs"
                className="text-body-md"
                onClick={() => insertText?.(response?.text)}
              >
                <AssetIcon icon={insertIcon} />
                {panel?.insertLabel}
              </Button>
            </span>
            <span className="text-body-sm text-text-secondary">
              {response?.text}
            </span>
          </RowCard>
        )}
      </StaggerList>
    </Reveal>
  );
}
