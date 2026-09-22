import { create } from "zustand";

import { adminNotificationsData } from "@/data/admin/admin-notifications.data";

/**
 * Notifications popover — Figma 196:19482.
 *
 * Marking read, dismissing and filtering all work against the dummy list, so
 * the panel behaves for real even though nothing is persisted yet.
 *
 * `unreadCount` and `visibleItems` are held as state rather than computed by
 * the component: a selector returning a function or a freshly-built array
 * would not re-render when the list changes.
 */
function derive(items, activeTab) {
  return {
    unreadCount: items?.filter((item) => !item?.isRead)?.length ?? 0,
    visibleItems:
      activeTab === "unread"
        ? (items?.filter((item) => !item?.isRead) ?? [])
        : (items ?? []),
  };
}

const initialItems = adminNotificationsData?.items ?? [];

export const useNotificationsStore = create((set, get) => ({
  content: adminNotificationsData,
  items: initialItems,
  activeTab: "all",
  isOpen: false,
  ...derive(initialItems, "all"),

  setOpen: (isOpen) => set({ isOpen }),

  setActiveTab: (activeTab) =>
    set((state) => ({ activeTab, ...derive(state?.items, activeTab) })),

  markAllRead: () =>
    set((state) => {
      const items = state?.items?.map((item) => ({ ...item, isRead: true }));
      return { items, ...derive(items, state?.activeTab) };
    }),

  dismiss: (id) =>
    set((state) => {
      const items = state?.items?.filter((item) => item?.id !== id);
      return { items, ...derive(items, state?.activeTab) };
    }),

  reset: () =>
    set((state) => ({
      items: initialItems,
      ...derive(initialItems, state?.activeTab),
    })),

  /** Unread tab label carries its own count in the design. */
  getTabLabel: (tab, unreadCount) =>
    tab?.id === "unread" ? `${tab?.label} (${unreadCount})` : tab?.label,
}));
