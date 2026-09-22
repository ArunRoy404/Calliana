"use client";

import NotificationItem from "@/components/notifications/NotificationItem";
import { useNotificationsStore } from "@/store/admin/useNotificationsStore";

/** The rows under whichever tab is active — Figma 196:19890. */
export default function NotificationsList() {
  const content = useNotificationsStore((state) => state.content);
  const visibleItems = useNotificationsStore((state) => state.visibleItems);
  const dismiss = useNotificationsStore((state) => state.dismiss);

  if (!visibleItems?.length) {
    return (
      <p className="text-body-sm py-8 text-center text-text-secondary">
        {content?.emptyLabel}
      </p>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {visibleItems?.map((item) => (
        <NotificationItem
          key={item?.id}
          item={item}
          dismissLabel={content?.dismissLabel}
          onDismiss={dismiss}
        />
      ))}
    </ul>
  );
}
