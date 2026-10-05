"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import DetailSection from "@/components/cards/DetailSection";
import TextAreaField from "@/components/forms/TextAreaField";
import { useLiveCallNoteStore } from "@/store/agent/useLiveCallNoteStore";

/**
 * "Call Message / Operational Note" — what the agent writes while the
 * caller speaks: an "Autosaved" tag, the editor (its formatting toolbar has
 * no rich-text backend yet), the character count, and "Quick insert" chips
 * that add a canned client response to the note. The note is the wrap-up
 * form's `note` field. Reveals after `revealDelay`.
 */
export default function CallNoteCard({
  note,
  responses,
  notFunctional,
  revealDelay = 0,
}) {
  const value = useLiveCallNoteStore((state) => state.values?.note);
  const error = useLiveCallNoteStore((state) => state.visibleErrors?.note);
  const setField = useLiveCallNoteStore((state) => state.setField);
  const touchField = useLiveCallNoteStore((state) => state.touchField);
  const insertText = useLiveCallNoteStore((state) => state.insertText);
  const countLabel = useLiveCallNoteStore((state) => state.countLabel);

  return (
    <DetailSection
      size="lg"
      revealDelay={revealDelay}
      title={
        <span className="flex flex-wrap items-center gap-3">
          {note?.title}
          <StatusBadge
            variant="outline"
            showDot={false}
            label={note?.savedLabel}
            tone="success"
          />
        </span>
      }
    >
      <div className="flex min-w-0 flex-col rounded-8 border border-solid border-border-default bg-surface-base shadow-card">
        <div
          role="toolbar"
          aria-label={note?.label}
          className="flex flex-wrap items-center gap-1 border-b border-solid border-border-strong p-3"
        >
          {note?.toolbar?.map((tool) => (
            <Button
              key={tool?.id}
              variant="ghost"
              size="square"
              aria-label={tool?.label}
              {...notFunctional}
            >
              <AssetIcon icon={tool?.icon} />
            </Button>
          ))}
        </div>
        <TextAreaField
          bare
          rows={3}
          aria-label={note?.label}
          placeholder={note?.placeholder}
          maxLength={note?.maxLength}
          value={value ?? ""}
          onChange={(event) => setField?.("note", event.target.value)}
          onBlur={() => touchField?.("note")}
          className="p-4"
        />
        <p className="text-body-lg px-4 pb-3 text-right text-text-secondary">
          {countLabel?.(value)}
        </p>
      </div>
      {error && <p className="text-body-sm text-status-error">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-body-lg text-text-secondary">
          {note?.quickInsertLabel}
        </span>
        {responses?.map((response) => (
          <Button
            key={response?.id}
            variant="secondary"
            size="xs"
            className="text-body-md rounded-4 border border-solid border-border-default"
            onClick={() => insertText?.(response?.text)}
          >
            <AssetIcon icon={note?.insertIcon} />
            {response?.label}
          </Button>
        ))}
      </div>
    </DetailSection>
  );
}
