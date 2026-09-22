"use client";

import AppImage from "@/components/atoms/AppImage";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import ProfileMenu from "@/components/nav/ProfileMenu";

/**
 * Signed-in user and role footer — Figma 42:2416.
 *
 * The identity row is the account menu's trigger: this is the only profile
 * entry point in the shell, so the top bar does not repeat it.
 */
export default function SidebarUser({ nav }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <ProfileMenu user={nav?.user} menu={nav?.profileMenu}>
        <button
          type="button"
          aria-label={nav?.user?.name}
          className="relative flex w-full cursor-pointer items-center gap-2 overflow-hidden px-4 py-2 text-left transition-colors duration-200 ease-out hover:bg-surface-subtle"
        >
          {nav?.textures?.user && (
            <AppImage
              src={nav?.textures?.user}
              fill
              sizes="260px"
              className="pointer-events-none object-cover opacity-10 backdrop-blur-[15px]"
            />
          )}

          <AppImage
            src={nav?.user?.avatar?.src}
            width={nav?.user?.avatar?.width}
            height={nav?.user?.avatar?.height}
            alt=""
            className="relative shrink-0 rounded-999 object-cover"
          />

          <span className="relative flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-body-md truncate text-text-primary">
              {nav?.user?.name}
            </span>
            <span className="text-body-sm truncate text-brand-gray-dark">
              {nav?.user?.email}
            </span>
          </span>

          <Icon
            name="ChevronDown"
            size={16}
            className="relative text-text-secondary"
          />
        </button>
      </ProfileMenu>

      <div className="flex w-full items-center justify-between gap-2 px-4 py-2">
        <p className="text-body-sm text-brand-gray-dark">
          {nav?.role?.label}{" "}
          <span className="text-label-md text-status-success">
            {nav?.role?.value}
          </span>
        </p>

        <Button
          variant="link"
          size="none"
          href={nav?.signOut?.href}
          className="text-body-md text-status-error"
        >
          <Icon name="LogOut" />
          {nav?.signOut?.label}
        </Button>
      </div>
    </div>
  );
}
