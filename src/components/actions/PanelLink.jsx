import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

/**
 * A panel header's "see all" link — "Inbox ›", "View Calendar ›" on the
 * client home: primary-blue text with a trailing chevron, as a real link.
 * `link` is data: `{ label, href }`.
 */
export default function PanelLink({ link }) {
  return (
    <Button
      variant="link"
      size="none"
      href={link?.href}
      className="text-body-md gap-1 font-medium"
    >
      {link?.label}
      <Icon name="ChevronRight" size={16} />
    </Button>
  );
}
