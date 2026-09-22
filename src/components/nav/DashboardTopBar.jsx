"use client";

import AppImage from "@/components/atoms/AppImage";
import Icon from "@/components/atoms/Icon";
import TopBarSearch from "@/components/nav/TopBarSearch";
import TopBarTile from "@/components/nav/TopBarTile";
import NotificationsBell from "@/components/notifications/NotificationsBell";
import { SidebarTrigger } from "@/components/shadcn/sidebar";
import { useDashboardStore } from "@/store/dashboard/useDashboardStore";

/**
 * Dashboard top bar — Figma 167:49829. Shared by every role; only the heading
 * differs, and that comes from the role's bundle.
 *
 * Controls drop away as the viewport narrows, in order of how much they matter:
 * search below `xl`, and the language, status and appearance tiles below `md` —
 * leaving the title and the bell on a phone. The account menu is not here: it
 * lives in the sidebar footer, which is one tap away on every size.
 */
export default function DashboardTopBar({ role }) {
  const topBar = useDashboardStore((state) => state.topBar?.[role]);

  return (
    <header className="relative z-10 flex min-h-[78px] items-center gap-3 overflow-hidden border-b border-solid border-border-default bg-surface-elevated px-4 py-3 sm:px-6">
      {topBar?.texture && (
        <AppImage
          src={topBar?.texture}
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-10"
        />
      )}

      <SidebarTrigger className="relative size-11 shrink-0 rounded-6 border border-solid border-border-default bg-surface-base text-text-primary hover:bg-surface-subtle [&_svg]:size-6" />

      <div className="relative flex min-w-0 flex-1 flex-col gap-1">
        <h1 className="text-h4 truncate text-text-primary">{topBar?.title}</h1>
        <p className="text-body-sm truncate text-text-secondary">
          {topBar?.subtitle}
        </p>
      </div>

      <div className="relative flex shrink-0 items-center gap-2 sm:gap-3 xl:gap-4">
        <TopBarSearch search={topBar?.search} />

        <NotificationsBell label={topBar?.notifications?.label} />

        <TopBarTile
          as="button"
          type="button"
          label={topBar?.language?.label}
          tone="hidden md:flex px-4"
        >
          <AppImage
            src={topBar?.language?.flag?.src}
            width={topBar?.language?.flag?.width}
            height={topBar?.language?.flag?.height}
            alt=""
            className="rounded-999 object-cover"
          />
          <span className="text-body-md text-text-primary">
            {topBar?.language?.label}
          </span>
          <Icon name="ChevronDown" size={16} className="text-text-secondary" />
        </TopBarTile>

        <TopBarTile
          label={topBar?.connection?.label}
          className="hidden bg-status-success-bg md:flex"
        >
          <AppImage
            src={topBar?.connection?.icon?.src}
            width={topBar?.connection?.icon?.width}
            height={topBar?.connection?.icon?.height}
            alt=""
          />
        </TopBarTile>

        <TopBarTile
          as="button"
          type="button"
          label={topBar?.appearance?.label}
          className="hidden border-border-strong md:flex"
        >
          <Icon name="Sun" size={24} className="text-action-primary" />
        </TopBarTile>
      </div>
    </header>
  );
}
