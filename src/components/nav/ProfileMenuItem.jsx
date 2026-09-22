import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

/** One row of the profile popover — an icon, a label, and a chevron on hover. */
export default function ProfileMenuItem({ item }) {
  return (
    <Button
      variant="ghost"
      size="none"
      href={item?.href}
      fullWidth
      className="text-body-md group justify-start gap-3 rounded-8 px-3 py-2.5 hover:text-text-primary"
    >
      <Icon name={item?.icon} />
      <span className="min-w-0 flex-1 truncate text-left">{item?.label}</span>
      <Icon
        name="ChevronRight"
        size={16}
        className="opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-60"
      />
    </Button>
  );
}
