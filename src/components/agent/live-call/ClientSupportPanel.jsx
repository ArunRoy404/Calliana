import StatusBadge from "@/components/atoms/StatusBadge";
import NoteWell from "@/components/cards/NoteWell";
import RowCard from "@/components/cards/RowCard";
import Reveal from "@/components/motion/Reveal";
import StaggerList from "@/components/lists/StaggerList";

/**
 * The "Support" tab — the client's business-wide rules for this call: the
 * client (type, place, hours, status), then the greeting, appointment rule,
 * emergency protocol (amber) and transfer & billing rule, each a titled
 * card.
 */
export default function ClientSupportPanel({ clientSupport }) {
  const client = clientSupport?.client;

  return (
    <div className="flex flex-col gap-4">
      <Reveal className="flex flex-col gap-1">
        <h3 className="text-h4 text-brand-black">{clientSupport?.title}</h3>
        <p className="text-body-md text-text-secondary">
          {clientSupport?.subtitle}
        </p>
      </Reveal>

      <RowCard
        as="div"
        variant="rounded"
        className="flex-col items-stretch gap-2"
      >
        <span className="flex items-start justify-between gap-2">
          <span className="text-label-lg text-brand-black">{client?.name}</span>
          <StatusBadge
            showDot={false}
            label={client?.status?.label}
            tone={client?.status?.tone}
            className="rounded-6"
          />
        </span>
        <span className="text-body-md text-text-secondary">
          {client?.detail}
        </span>
        <span className="text-body-md text-brand-black">{client?.hours}</span>
      </RowCard>

      <StaggerList items={clientSupport?.items} className="gap-3">
        {(item, delay) => (
          <Reveal as="li" key={item?.id} delay={delay}>
            <NoteWell
              tone={item?.tone ?? "info"}
              className="flex flex-col gap-2 bg-surface-base"
            >
              <span className="text-label-lg text-action-primary">
                {item?.title}
              </span>
              <span className="text-text-primary">{item?.text}</span>
            </NoteWell>
          </Reveal>
        )}
      </StaggerList>
    </div>
  );
}
