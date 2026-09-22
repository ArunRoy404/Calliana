import { create } from "zustand";

import {
  signInDefaultValues,
  signInSchema,
  toFieldErrors,
} from "@/schemas/auth/sign-in.schema";

/**
 * Keep only the errors for fields the user has actually interacted with.
 *
 * This is held in state rather than computed in the component so that changing
 * it re-renders subscribers — a selector reading `errors` and `touched`
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
 * Sign-in form state and operations.
 *
 * The component renders; this store holds the values, runs validation through
 * the Zod schema, and owns submission.
 *
 * Validation is live rather than submit-driven: the submit button is marked
 * `notFunctional` while there is no backend, so it deliberately never submits.
 * A field validates once it has been blurred, then on every keystroke after.
 */
export const useSignInFormStore = create((set, get) => ({
  values: signInDefaultValues,
  errors: {},
  touched: {},
  visibleErrors: {},
  isSubmitting: false,

  setField: (name, value) => {
    set((state) => ({ values: { ...state?.values, [name]: value } }));
    if (get()?.touched?.[name]) get()?.validate?.();
  },

  touchField: (name) => {
    set((state) => ({ touched: { ...state?.touched, [name]: true } }));
    get()?.validate?.();
  },

  validate: () => {
    const result = signInSchema.safeParse(get()?.values);
    const errors = result?.success ? {} : toFieldErrors(result?.error);

    set((state) => ({
      errors,
      visibleErrors: visibleFrom(errors, state?.touched),
    }));

    return Boolean(result?.success);
  },

  submit: () => {
    // Mark everything touched so any outstanding error becomes visible.
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
      values: signInDefaultValues,
      errors: {},
      touched: {},
      visibleErrors: {},
      isSubmitting: false,
    }),
}));
