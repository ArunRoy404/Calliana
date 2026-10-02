import ActionBar from "@/components/actions/ActionBar";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import InfoTile from "@/components/cards/InfoTile";
import StaggerList from "@/components/lists/StaggerList";
import Reveal from "@/components/motion/Reveal";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * A conversation's client — Figma 167:51527: picture, name and status, its
 * key facts as compact `InfoTile`s, then the "Contextual Actions" stack. One
 * body for both places it shows: the inbox's right column
 * (`ClientInfoPanel`) and, where that column has no room, the drawer
 * (`ClientInfoDrawer`).
 *
 * The actions have no backend yet, so they carry `notFunctional`. Reveals
 * after `revealDelay`; its tiles, then its actions, follow it in.
 */
export default function ClientInfoDetails({
  client,
  info,
  notFunctional,
  revealDelay = 0,
}) {
  const fieldCount = info?.fields?.length ?? 0;

  return (
    <>
      <Reveal
        delay={revealDelay}
        className="flex flex-col items-center gap-2 p-4 text-center"
      >
        <UserAvatar name={client?.name} src={client?.avatar} />
        <p className="text-label-lg text-brand-black">{client?.name}</p>
        <StatusBadge
          variant="outline"
          label={client?.status?.label}
          tone={client?.status?.tone}
        />
      </Reveal>

      <StaggerList
        items={info?.fields}
        revealDelay={revealDelay}
        className="gap-2 px-3"
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

      <div className="mt-4 flex flex-col gap-3 border-t border-solid border-border-default p-3">
        <h3 className="text-h4 text-brand-text-black">{info?.actionsTitle}</h3>
        <ActionBar
          layout="stack"
          size="sm"
          actions={info?.actions}
          buttonProps={notFunctional}
          revealDelay={nestedRevealDelayAt(revealDelay, fieldCount)}
        />
      </div>
    </>
  );
}
