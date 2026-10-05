"use client";

import Button from "@/components/atoms/Button";
import DetailSection from "@/components/cards/DetailSection";
import MultiSelectChips from "@/components/forms/MultiSelectChips";
import { useLiveCallNoteStore } from "@/store/agent/useLiveCallNoteStore";

/**
 * "Call Categories & Call Outcome" — the call's categories as toggle tags
 * (any number) and how it ended as four cards (one), both fields of the
 * wrap-up form. Reveals after `revealDelay`.
 */
export default function CallOutcomeCard({ outcome, revealDelay = 0 }) {
  const categories = useLiveCallNoteStore((state) => state.values?.categories);
  const chosen = useLiveCallNoteStore((state) => state.values?.outcome);
  const error = useLiveCallNoteStore((state) => state.visibleErrors?.outcome);
  const setField = useLiveCallNoteStore((state) => state.setField);

  return (
    <DetailSection size="lg" title={outcome?.title} revealDelay={revealDelay}>
      <MultiSelectChips
        variant="tag"
        showCount={false}
        label={outcome?.categoriesLabel}
        options={outcome?.categories}
        value={categories}
        onChange={(next) => setField?.("categories", next)}
      />

      <div className="flex flex-col gap-3">
        <p className="text-body-lg text-text-secondary">
          {outcome?.outcomesLabel}
        </p>
        <div
          role="group"
          aria-label={outcome?.outcomesLabel}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-4"
        >
          {outcome?.outcomes?.map((option) => (
            <Button
              key={option?.value}
              variant="choice"
              size="card"
              aria-pressed={chosen === option?.value}
              onClick={() => setField?.("outcome", option?.value)}
            >
              <span className="text-body-md">{option?.label}</span>
              <span className="text-label-sm text-text-secondary">
                {option?.hint}
              </span>
            </Button>
          ))}
        </div>
        {error && <p className="text-body-sm text-status-error">{error}</p>}
      </div>
    </DetailSection>
  );
}
