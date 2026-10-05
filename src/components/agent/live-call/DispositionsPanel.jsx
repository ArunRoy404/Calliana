import StatusBadge from "@/components/atoms/StatusBadge";
import NoteWell from "@/components/cards/NoteWell";
import RowCard from "@/components/cards/RowCard";
import Reveal from "@/components/motion/Reveal";
import StaggerList from "@/components/lists/StaggerList";

/**
 * The "Dispositions" tab — the client's quick operating rules for this
 * call, each a card with its tag ("Common", "Route", "Urgent"), then how to
 * use the panel on a primary-tinted note.
 */
export default function DispositionsPanel({ dispositions }) {
  return (
    <div className="flex flex-col gap-4">
      <Reveal className="flex flex-col gap-1">
        <h3 className="text-h4 text-brand-black">{dispositions?.title}</h3>
        <p className="text-body-md text-text-secondary">
          {dispositions?.subtitle}
        </p>
      </Reveal>

      <StaggerList items={dispositions?.rules} className="gap-2">
        {(rule, delay) => (
          <RowCard
            key={rule?.id}
            variant="rounded"
            revealDelay={delay}
            className="flex-col items-stretch gap-2 p-3"
          >
            <span className="flex items-start justify-between gap-2">
              <span className="text-label-lg text-brand-black">
                {rule?.title}
              </span>
              <StatusBadge
                showDot={false}
                label={rule?.tag?.label}
                tone={rule?.tag?.tone}
                className="rounded-6"
              />
            </span>
            <span className="text-body-md text-text-secondary">
              {rule?.text}
            </span>
          </RowCard>
        )}
      </StaggerList>

      <Reveal className="flex flex-col gap-2">
        <NoteWell tone="info" className="flex flex-col gap-2">
          <span className="text-label-lg text-action-primary">
            {dispositions?.helpTitle}
          </span>
          <span>{dispositions?.help}</span>
        </NoteWell>
      </Reveal>
    </div>
  );
}
