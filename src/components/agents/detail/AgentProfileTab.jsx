import StatusBadge from "@/components/atoms/StatusBadge";
import WorkingDayRow from "@/components/agents/detail/WorkingDayRow";
import DetailSection from "@/components/cards/DetailSection";
import InfoTile from "@/components/cards/InfoTile";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";

/**
 * Profile tab — Figma 198:34932: personal information, working hours and the
 * account, each a `DetailSection` of tiles or rows that follow it in.
 */
export default function AgentProfileTab({ agent, content }) {
  const labels = content?.labels;
  const hoursStart = revealDelayAt(0, 1);
  const accountStart = revealDelayAt(0, 2);

  return (
    <>
      <DetailSection title={labels?.personalTitle}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content?.personalFields?.map((field, index) => (
            <InfoTile
              key={field?.id}
              icon={field?.icon}
              label={field?.label}
              revealDelay={nestedRevealDelayAt(0, index)}
            >
              <span className="truncate">{agent?.[field?.id]}</span>
            </InfoTile>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={labels?.hoursTitle} revealDelay={hoursStart}>
        <ul className="flex flex-col gap-4">
          {agent?.workingHours?.map((day, index) => (
            <WorkingDayRow
              key={day?.id}
              day={day}
              revealDelay={nestedRevealDelayAt(hoursStart, index)}
            />
          ))}
        </ul>
      </DetailSection>

      <DetailSection title={labels?.accountTitle} revealDelay={accountStart}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content?.accountFields?.map((field, index) => (
            <InfoTile
              key={field?.id}
              label={field?.label}
              revealDelay={nestedRevealDelayAt(accountStart, index)}
            >
              {field?.type === "status" ? (
                <StatusBadge
                  variant="outline"
                  showDot={false}
                  label={agent?.[field?.id]?.label}
                  tone={agent?.[field?.id]?.tone}
                />
              ) : (
                <span className="truncate">{agent?.[field?.id]}</span>
              )}
            </InfoTile>
          ))}
        </div>
      </DetailSection>
    </>
  );
}
