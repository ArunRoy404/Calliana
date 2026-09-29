"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import TextAreaField from "@/components/forms/TextAreaField";
import Reveal from "@/components/motion/Reveal";
import { useClientNoteFormStore } from "@/store/admin/useClientNoteFormStore";

/**
 * The note box on the Support Instructions tab — Figma 202:30951: a bordered
 * card holding the text area, with "Add Note" in its bottom-right corner.
 * The card takes the focus ring, so the whole box reads as one field.
 */
export default function NoteComposer({ revealDelay = 0 }) {
  const content = useClientNoteFormStore((state) => state.content);
  const note = useClientNoteFormStore((state) => state.values?.note);
  const error = useClientNoteFormStore((state) => state.visibleErrors?.note);
  const setField = useClientNoteFormStore((state) => state.setField);
  const touchField = useClientNoteFormStore((state) => state.touchField);
  const submitAndClose = useClientNoteFormStore(
    (state) => state.submitAndClose,
  );

  return (
    <Reveal
      delay={revealDelay}
      className="flex min-h-41 flex-col gap-2.5 rounded-8 border border-solid border-border-strong bg-surface-base p-4 transition-colors duration-200 ease-out focus-within:border-border-focus"
    >
      <TextAreaField
        bare
        rows={3}
        aria-label={content?.label}
        placeholder={content?.placeholder}
        value={note ?? ""}
        onChange={(event) => setField?.("note", event?.target?.value)}
        onBlur={() => touchField?.("note")}
        className="flex-1"
      />

      <div className="flex flex-wrap items-center justify-end gap-4">
        {error && (
          <p className="text-body-sm mr-auto text-status-error">{error}</p>
        )}
        <Button onClick={submitAndClose}>
          <AssetIcon icon={content?.submitIcon} />
          {content?.submitLabel}
        </Button>
      </div>
    </Reveal>
  );
}
