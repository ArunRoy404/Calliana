import SidebarNavItem from "@/components/nav/SidebarNavItem";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/shadcn/sidebar";

/** A labelled group of sidebar rows — Figma 42:2391. */
export default function SidebarSection({ section }) {
  return (
    <SidebarGroup className="gap-2 p-0">
      <SidebarGroupLabel className="text-body-sm h-auto rounded-none bg-surface-canvas/20 px-4 py-2 text-text-primary backdrop-blur-[10px] group-data-[collapsible=icon]:hidden">
        {section?.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-0">
          {section?.items?.map((item) => (
            <SidebarNavItem key={item?.id} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
