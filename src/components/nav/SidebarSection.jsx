import SidebarNavItem from "@/components/nav/SidebarNavItem";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/shadcn/sidebar";

/**
 * A labelled group of sidebar rows — Figma 42:2391, refined: a quiet,
 * letter-spaced caption instead of a tinted bar, so the rows carry the weight.
 */
export default function SidebarSection({ section }) {
  return (
    <SidebarGroup className="gap-1 p-0">
      <SidebarGroupLabel className="text-label-sm h-auto rounded-none px-6 pb-1 tracking-[0.14em] text-text-tertiary group-data-[collapsible=icon]:hidden">
        {section?.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {section?.items?.map((item) => (
            <SidebarNavItem key={item?.id} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
