"use client";

import Button from "@/components/atoms/Button";
import NotificationsList from "@/components/notifications/NotificationsList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { useNotificationsStore } from "@/store/admin/useNotificationsStore";

/**
 * Notifications popover body — Figma 196:19877.
 *
 * The 12px bar the design draws down the right is the global scrollbar style
 * from `globals.css`, so it shows only when the list actually overflows. No
 * gutter is reserved for it: an empty 40px column beside a list that fits reads
 * as a layout bug, so the panel is sized to the content instead.
 */
export default function NotificationsPanel() {
  const content = useNotificationsStore((state) => state.content);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const activeTab = useNotificationsStore((state) => state.activeTab);
  const setActiveTab = useNotificationsStore((state) => state.setActiveTab);
  const markAllRead = useNotificationsStore((state) => state.markAllRead);
  const getTabLabel = useNotificationsStore((state) => state.getTabLabel);

  return (
    <div className="flex max-h-[min(453px,70vh)] w-full flex-col gap-4 overflow-y-auto">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex flex-col justify-center gap-1">
          <p className="text-h4 text-brand-text-black">{content?.title}</p>
          <p className="text-body-md text-brand-gray-dark">
            {content?.unreadTemplate?.replace("{count}", unreadCount)}
          </p>
        </div>

        <Button
          variant="link"
          size="none"
          onClick={() => markAllRead?.()}
          className="text-label-lg shrink-0 text-status-info"
        >
          {content?.markAllLabel}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
        <TabsList className="w-full rounded-8 bg-surface-canvas p-1 px-2 group-data-[orientation=horizontal]/tabs:h-auto">
          {content?.tabs?.map((tab) => (
            <TabsTrigger
              key={tab?.id}
              value={tab?.id}
              className="text-button h-auto rounded-8 border-0 px-4 py-2 font-normal text-text-secondary hover:text-text-primary data-[state=active]:bg-action-primary data-[state=active]:text-text-on-primary group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none"
            >
              {getTabLabel?.(tab, unreadCount)}
            </TabsTrigger>
          ))}
        </TabsList>

        {content?.tabs?.map((tab) => (
          <TabsContent key={tab?.id} value={tab?.id}>
            <NotificationsList />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
