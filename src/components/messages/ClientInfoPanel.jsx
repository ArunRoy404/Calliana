import ActionBar from "@/components/actions/ActionBar";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import InfoTile from "@/components/cards/InfoTile";
import StaggerList from "@/components/lists/StaggerList";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * The open conversation's client — Figma 167:51527: the client's picture,
 * name and status, its key facts as compact `InfoTile`s, then the
 * "Contextual Actions" stack. The actions have no backend yet, so they carry
 * `notFunctional`. Reveals after `revealDelay`; its tiles, then its
 * actions, follow it in.
 *
 * `variant`:
 * - `column` (default) — the third column, from `xl` up: its own `CLIENT INFO`
 *   heading, scrolling on its own, inset padding.
 * - `panel` — the body of the phone's client-details drawer (`ClientInfoDrawer`).
 *   No heading (the `SidePanel` already titles it) and no side padding (the
 *   panel body owns that).
 */
const VARIANT_CLASSES = {
  column: {
    as: "aside",
    root: "flex min-h-0 min-w-0 flex-col xl:overflow-x-hidden xl:overflow-y-auto",
    showTitle: true,
    identity: "flex flex-col items-center gap-2 p-4 text-center",
    tiles: "gap-2 px-3",
    actions:
      "mt-4 flex flex-col gap-3 border-t border-solid border-border-default p-3",
  },
  panel: {
    as: "div",
    root: "flex min-w-0 flex-col",
    showTitle: false,
    identity: "flex flex-col items-center gap-2 pb-4 text-center",
    tiles: "gap-2",
    actions:
      "mt-4 flex flex-col gap-3 border-t border-solid border-border-default pt-4",
  },
};

export default function ClientInfoPanel({
  client,
  content,
  notFunctional,
  variant = "column",
  revealDelay = 0,
  className,
}) {
  const info = content?.clientInfo;
  const fieldCount = info?.fields?.length ?? 0;
  const layout = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.column;

  return (
    <Reveal
      as={layout?.as}
      delay={revealDelay}
      className={cn(layout?.root, className)}
    >
      {layout?.showTitle && (
        <p className="text-label-sm border-b border-solid border-border-default px-4 py-3 text-text-tertiary">
          {info?.title}
        </p>
      )}

      <div className={layout?.identity}>
        <UserAvatar name={client?.name} src={client?.avatar} />
        <p className="text-label-lg text-brand-black">{client?.name}</p>
        <StatusBadge
          variant="outline"
          label={client?.status?.label}
          tone={client?.status?.tone}
        />
      </div>

      <StaggerList
        items={info?.fields}
        revealDelay={revealDelay}
        className={layout?.tiles}
      >
        {(field, delay) => (
          <InfoTile
            key={field?.id}
            as="li"
            size="sm"
            label={field?.label}
            revealDelay={delay}
          >
            {client?.[field?.id]}
          </InfoTile>
        )}
      </StaggerList>

      <div className={layout?.actions}>
        <h3 className="text-h4 text-brand-text-black">{info?.actionsTitle}</h3>
        <ActionBar
          layout="stack"
          size="sm"
          actions={info?.actions}
          buttonProps={notFunctional}
          revealDelay={nestedRevealDelayAt(revealDelay, fieldCount)}
        />
      </div>
    </Reveal>
  );
}
