import { create } from "zustand";

import { fillTemplate } from "@/lib/fillTemplate";

/**
 * Each working day as its row reads it: an open day shows its hours and
 * the "on" status, a closed one `offHours` ("—") and the "off" status;
 * `toggleLabel` names its switch ("Saturday open").
 */
function workingDaysOf(
  days = [],
  open = {},
  { dayStatuses, offHours, dayToggleLabel } = {},
) {
  return days?.map((day) => {
    const isOpen = Boolean(open?.[day?.id]);
    return {
      ...day,
      isOpen,
      hours: isOpen ? day?.hours : offHours,
      status: isOpen ? dayStatuses?.on : dayStatuses?.off,
      toggleLabel: fillTemplate(dayToggleLabel, day),
    };
  });
}

/**
 * A profile page's store — the admin's Profile and the client portal's
 * Business Profile are the same page over their own data (rule 0).
 *
 * `profile` is the page's content. `workingHours` is held in state, rebuilt
 * by `toggleDay(id)` only, so a selector returns the same array between
 * changes. There is no backend yet: a day's switch still flips (so the page
 * feels real to click through, like the settings toggles), but nothing is
 * saved.
 */
export function createProfileStore(data) {
  const open = Object.fromEntries(
    data?.workingHours?.map((day) => [day?.id, Boolean(day?.open)]) ?? [],
  );

  return create((set) => ({
    profile: data,
    openDays: open,
    workingHours: workingDaysOf(data?.workingHours, open, data),

    toggleDay: (id) =>
      set((state) => {
        const openDays = { ...state?.openDays, [id]: !state?.openDays?.[id] };
        return {
          openDays,
          workingHours: workingDaysOf(data?.workingHours, openDays, data),
        };
      }),
  }));
}
