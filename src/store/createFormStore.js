import { gooeyToast } from "goey-toast";
import { create } from "zustand";

import { recordView } from "@/lib/recordView";
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
 *
 * `cancel` resets the form and, for a form in a drawer, calls `closePanel`.
 * `submitAndClose` validates, then — with no backend yet — shows the
 * `notFunctional` (`{ message, description }`) toast and cancels, never
 * pretending the save happened.
 *
 * `fromRecord` makes it an *edit* form: `(record) => values` maps an existing
 * record onto the form. `load(record)` seeds the values from it (and clears
 * any touched/error state), remembering `loadedId` so a drawer reloads only
 * when a different record opens — `useLoadedRecord` does that wiring.
 * `viewOf` (`(record) => view`, usually `recordView(content)`) describes the
 * record for the drawer — its subtitle and summary facts — kept as `view`
 * from the same load, so it stays on screen while the drawer slides away.
 *
 * `content` is the form's copy, kept as `content`. Given it, the not-wired-up
 * toast defaults to its `notFunctionalMessage` / `notFunctionalDescription`,
 * and a record form's `viewOf` to `recordView(content)` — so a drawer's form
 * store is usually just its copy, schema, defaults and `fromRecord`.
 *
 * `onSubmitted(recordId)` runs after a valid submit has closed the drawer —
 * a drawer whose submit moves on to another drawer for the same record (a
 * voicemail's "Call back" opening the return-call drawer).
 */
export function createFormStore({
  content,
  schema,
  defaultValues,
  closePanel,
  notFunctional,
  fromRecord,
  viewOf,
  onSubmitted,
  extend,
}) {
  const toast = notFunctional ?? {
    message: content?.notFunctionalMessage,
    description: content?.notFunctionalDescription,
  };
  const describe =
    viewOf ?? (fromRecord && content ? recordView(content) : undefined);

  return create((set, get, store) => ({
    ...(content && { content }),
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

    /*
     * A record form also forgets which record it loaded, so reopening the
     * same record after a cancel seeds it again instead of showing empty
     * defaults. Its `view` stays, so the closing drawer keeps its subtitle.
     */
    reset: () =>
      set({
        values: defaultValues,
        errors: {},
        touched: {},
        visibleErrors: {},
        isSubmitting: false,
        ...(fromRecord && { loadedId: null }),
      }),

    cancel: () => {
      closePanel?.();
      get()?.reset?.();
    },

    submitAndClose: () => {
      if (!get()?.submit?.()) return false;
      const recordId = get()?.loadedId;

      gooeyToast.info(toast?.message, {
        description: toast?.description,
      });
      get()?.cancel?.();
      onSubmitted?.(recordId);
      return true;
    },

    ...(fromRecord && {
      loadedId: null,
      view: null,

      load: (record) => {
        if (!record?.id) return;
        set({
          loadedId: record?.id,
          view: describe?.(record) ?? null,
          values: { ...defaultValues, ...fromRecord(record) },
          errors: {},
          touched: {},
          visibleErrors: {},
          isSubmitting: false,
        });
      },
    }),

    ...(extend?.(set, get, store) ?? {}),
  }));
}
