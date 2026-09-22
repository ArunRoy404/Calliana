import { create } from "zustand";

import { toFieldErrors } from "@/lib/toFieldErrors";

/**
 * Keep only the errors for fields the user has actually interacted with.
 *
 * Held in state rather than derived in the component so that changing it
 * re-renders subscribers — a selector reading `errors` and `touched`
 * separately would not.
 */
function visibleFrom(errors, touched) {
  const visible = {};

  for (const field of Object.keys(errors ?? {})) {
    if (touched?.[field]) visible[field] = errors?.[field];
  }

  return visible;
}

/**
 * Build a Zustand store for a Zod-validated form.
 *
 * Every auth form needs the same machinery — values, touched, validation,
 * submit, reset — so it lives here once and each form supplies only its schema
 * and defaults. Pass `extend` for actions unique to one form.
 *
 * Validation is live rather than submit-driven: a field validates once it has
 * been blurred, then on every keystroke after. Submitting marks everything
 * touched so any outstanding error becomes visible.
 */
export function createFormStore({ schema, defaultValues, extend }) {
  return create((set, get, store) => ({
    values: defaultValues,
    errors: {},
    touched: {},
    visibleErrors: {},
    isSubmitting: false,

    /**
     * `value` may be an updater, `(previous) => next`. Multi-part inputs need
     * that: typing quickly into a one-time-code field fires several events
     * before React re-renders, so a handler that built the next value from its
     * `value` prop would drop digits. Reading `previous` from the store here is
     * always current.
     */
    setField: (name, value) => {
      set((state) => {
        const previous = state?.values?.[name];
        const next = typeof value === "function" ? value(previous) : value;

        return { values: { ...state?.values, [name]: next } };
      });

      if (get()?.touched?.[name]) get()?.validate?.();
    },

    touchField: (name) => {
      set((state) => ({ touched: { ...state?.touched, [name]: true } }));
      get()?.validate?.();
    },

    validate: () => {
      const result = schema.safeParse(get()?.values);
      const errors = result?.success ? {} : toFieldErrors(result?.error);

      set((state) => ({
        errors,
        visibleErrors: visibleFrom(errors, state?.touched),
      }));

      return Boolean(result?.success);
    },

    submit: () => {
      set((state) => ({
        touched: Object.keys(state?.values ?? {}).reduce(
          (touched, field) => ({ ...touched, [field]: true }),
          {},
        ),
      }));

      const isValid = get()?.validate?.();
      if (!isValid) return false;

      // TODO: call the auth endpoint once the backend exists.
      return true;
    },

    reset: () =>
      set({
        values: defaultValues,
        errors: {},
        touched: {},
        visibleErrors: {},
        isSubmitting: false,
      }),

    ...(extend?.(set, get, store) ?? {}),
  }));
}
