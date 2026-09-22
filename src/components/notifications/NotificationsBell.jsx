"use client";

import Icon from "@/components/atoms/Icon";
import Scrim from "@/components/decor/Scrim";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import TopBarTile from "@/components/nav/TopBarTile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { useNotificationsStore } from "@/store/admin/useNotificationsStore";

/** Bell with unread badge, opening the notifications popover — Figma 42:873. */
export default function NotificationsBell({ label }) {
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const isOpen = useNotificationsStore((state) => state.isOpen);
  const setOpen = useNotificationsStore((state) => state.setOpen);

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      {isOpen && <Scrim />}

      <PopoverTrigger asChild>
        <TopBarTile as="button" type="button" label={label} className="relative">
          <Icon name="Bell" size={24} className="text-text-primary" />

          {unreadCount > 0 && (
            <span className="text-label-sm absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-999 bg-brand-error text-text-on-primary">
              {unreadCount}
            </span>
          )}
        </TopBarTile>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[min(92vw,489px)] rounded-16 border-0 p-6 shadow-card"
      >
        <NotificationsPanel />
      </PopoverContent>
    </Popover>
  );
}
