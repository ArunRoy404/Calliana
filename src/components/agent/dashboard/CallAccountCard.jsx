import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import IconLabel from "@/components/atoms/IconLabel";

/**
 * The client account the live call belongs to, on a hairline card:
 * "ASSOCIATED CLIENT ACCOUNT" with "View Account ↗", the account's name,
 * then the call's purpose and the agent's note on one line — the purpose
 * whole, the note cut off with an ellipsis (the full note is on the
 * account).
 */
export default function CallAccountCard({ account, separator }) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-8 border border-solid border-border-default bg-surface-base p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-label-sm uppercase text-text-tertiary">
          {account?.label}
        </span>
        <Button
          variant="link"
          size="none"
          href={account?.link?.href}
          className="text-label-lg gap-2"
        >
          {account?.link?.label}
          <AssetIcon icon={account?.link?.icon} />
        </Button>
      </div>

      <IconLabel
        icon={account?.icon}
        className="text-body-lg gap-2 font-semibold text-brand-black"
      >
        {account?.name}
      </IconLabel>

      <p className="text-body-md flex min-w-0 items-center gap-2 text-text-secondary">
        <IconLabel icon={account?.purposeIcon} className="shrink-0">
          {account?.purpose}
        </IconLabel>
        <span aria-hidden>{separator}</span>
        <span className="min-w-0 truncate">{account?.note}</span>
      </p>
    </div>
  );
}
