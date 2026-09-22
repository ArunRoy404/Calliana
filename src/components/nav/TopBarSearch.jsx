import Icon from "@/components/atoms/Icon";

/** Search field in the top bar — Figma 42:868. */
export default function TopBarSearch({ search }) {
  return (
    <label className="hidden w-[228px] items-center gap-2 rounded-6 border border-solid border-border-default bg-surface-base px-[13px] py-[9px] backdrop-blur-[30px] focus-within:border-border-focus xl:flex">
      <Icon name="Search" className="text-text-secondary" />
      <span className="sr-only">{search?.label}</span>
      <input
        type="search"
        placeholder={search?.placeholder}
        className="text-body-sm min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-brand-gray-dark"
      />
      <kbd className="text-body-sm rounded-4 border border-solid border-brand-gray bg-surface-base px-[9px] py-[5px] text-brand-gray-dark">
        {search?.shortcut}
      </kbd>
    </label>
  );
}
