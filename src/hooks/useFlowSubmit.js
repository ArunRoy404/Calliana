"use client";

import { useRouter } from "next/navigation";

/**
 * Validate a form, then advance to the next step of its flow.
 *
 * Wired to the form's `onSubmit` rather than the button's `onClick`, so
 * pressing Enter in a field works too. It always blocks the native submit —
 * there is no endpoint to post to, and letting it through would reload the
 * page and wipe the store.
 *
 * There is no backend yet, so a valid form simply routes forward — enough to
 * walk a client through the whole journey. An invalid one stays put and shows
 * its errors, because `submit()` marks every field touched.
 *
 * Sign-in deliberately does not use this: it has nowhere to go until real
 * authentication exists, so its button stays `notFunctional`.
 */
export function useFlowSubmit({ submit, nextHref }) {
  const router = useRouter();

  return function handleFlowSubmit(event) {
    event?.preventDefault?.();
    if (submit?.()) router?.push?.(nextHref);
  };
}
