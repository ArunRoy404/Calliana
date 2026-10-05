"use client";

import AppImage from "@/components/atoms/AppImage";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import ProfileMenu from "@/components/nav/ProfileMenu";
import { SIDEBAR_IMAGE_SIZES } from "@/lib/sidebar";

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
          className="relative mx-3 flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-8 border border-solid border-border-default bg-surface-base/60 px-3 py-2.5 text-left backdrop-blur-sm transition-colors duration-200 ease-out hover:border-border-strong hover:bg-surface-subtle"
        >
          {nav?.textures?.user && (
            <AppImage
              src={nav?.textures?.user}
              fill
              sizes={SIDEBAR_IMAGE_SIZES}
              className="texture-image pointer-events-none object-cover opacity-10 backdrop-blur-[15px]"
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

      <div className="flex w-full items-center justify-between gap-2 px-4 py-1">
        <p className="text-body-sm whitespace-nowrap text-brand-gray-dark">
          {nav?.role?.label}{" "}
          <span className="text-label-md text-status-success">
            {nav?.role?.value}
          </span>
        </p>

        <Button
          variant="link"
          size="none"
          href={nav?.signOut?.href}
          className="text-body-sm gap-1.5 whitespace-nowrap text-status-error"
        >
          <Icon name="LogOut" size={16} />
          {nav?.signOut?.label}
        </Button>
      </div>
    </div>
  );
}
