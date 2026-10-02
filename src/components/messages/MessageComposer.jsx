"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import TextAreaField from "@/components/forms/TextAreaField";
import { useMessageComposerFormStore } from "@/store/admin/useMessageComposerFormStore";

/**
 * The reply box at the foot of a thread — Figma 167:51527: a grey field with
 * the attach button and the primary send square inside it. Enter sends,
 * Shift+Enter adds a line. The form store validates and — with no gateway
 * yet — says so and clears the box (rule 23). An empty reply is simply not
 * sent: no error line is shown under the box. Attaching has no backend
 * either, so it carries `notFunctional`.
 */
export default function MessageComposer({ notFunctional }) {
  const content = useMessageComposerFormStore((state) => state.content);
  const message = useMessageComposerFormStore((state) => state.values?.message);
  const setField = useMessageComposerFormStore((state) => state.setField);
  const submitAndClose = useMessageComposerFormStore(
    (state) => state.submitAndClose,
  );

  function handleSubmit(event) {
    event?.preventDefault?.();
    submitAndClose?.();
  }

  function handleKeyDown(event) {
    if (event?.key !== "Enter" || event?.shiftKey) return;
    event?.preventDefault?.();
    event?.currentTarget?.form?.requestSubmit?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-solid border-border-default p-3"
    >
      <div className="flex items-center gap-2 rounded-8 border border-solid border-border-default bg-brand-track py-1.5 pr-1.5 pl-3 transition-colors duration-200 ease-out focus-within:border-border-focus">
        <TextAreaField
          bare
          bareSize="md"
          rows={1}
          aria-label={content?.label}
          placeholder={content?.placeholder}
          value={message ?? ""}
          onChange={(event) => setField?.("message", event?.target?.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button
          variant="ghost"
          size="none"
          aria-label={content?.attachLabel}
          className="rounded-999 p-1.5"
          {...notFunctional}
        >
          <AssetIcon icon={content?.attachIcon} />
        </Button>
        <Button type="submit" size="icon" aria-label={content?.sendLabel}>
          <AssetIcon icon={content?.sendIcon} />
        </Button>
      </div>
    </form>
  );
}
