"use client";

import AppImage from "@/components/atoms/AppImage";
import ProfileMenuItem from "@/components/nav/ProfileMenuItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

/**
 * The signed-in user's account menu.
 *
 * A popover rather than a menu: the panel leads with an identity card, which is
 * content rather than a list of commands. The caller supplies the trigger, so
 * the same menu can hang off any chrome — today the sidebar footer, tomorrow
 * whatever a role's shell needs.
 *
 * Role and sign-out are deliberately absent: the sidebar footer the trigger
 * sits in already shows both, and repeating them would be two sign-outs.
 */
export default function ProfileMenu({
  user,
  menu,
  align = "start",
  side = "top",
  children,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        align={align}
        side={side}
        sideOffset={12}
        className="w-[min(92vw,280px)] rounded-16 border-0 p-2 shadow-card"
      >
        <div className="flex items-center gap-3 rounded-8 bg-surface-canvas p-3">
          <AppImage
            src={user?.avatar?.src}
            width={user?.avatar?.width}
            height={user?.avatar?.height}
            alt=""
            className="rounded-999 object-cover"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-body-md truncate text-text-primary">
              {user?.name}
            </p>
            <p className="text-body-sm truncate text-brand-gray-dark">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col pt-2">
          {menu?.map((item) => (
            <ProfileMenuItem key={item?.id} item={item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
