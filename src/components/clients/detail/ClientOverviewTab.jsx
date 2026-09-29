import AccountCallRow from "@/components/clients/detail/AccountCallRow";
import DetailSection from "@/components/cards/DetailSection";
import InfoTile from "@/components/cards/InfoTile";
import InstructionCard from "@/components/cards/InstructionCard";
import StatTile from "@/components/cards/StatTile";
import StaggerList from "@/components/lists/StaggerList";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";

/**
 * Overview tab — Figma 198:31247: three headline figures, the client's
 * contact details, then the recent calls beside the agents' handling
 * instructions. Each block follows the one before it in.
 */
export default function ClientOverviewTab({ client, content }) {
  const stats = content?.stats ?? [];
  const infoStart = revealDelayAt(0, stats.length);
  const callsStart = revealDelayAt(infoStart, 1);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {stats?.map((stat, index) => (
          <StatTile
            key={stat?.id}
            label={stat?.label}
            value={client?.stats?.[stat?.id]}
            tone={stat?.tone}
            texture={content?.statTexture}
            revealDelay={revealDelayAt(0, index)}
          />
        ))}
      </div>

      <DetailSection size="lg" title={content?.infoTitle} revealDelay={infoStart}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content?.infoFields?.map((field, index) => (
            <InfoTile
              key={field?.id}
              icon={field?.icon}
              label={field?.label}
              revealDelay={nestedRevealDelayAt(infoStart, index)}
              className={cn(field?.wide && "sm:col-span-2")}
            >
              <span className="truncate">{client?.[field?.id]}</span>
            </InfoTile>
          ))}
        </div>
      </DetailSection>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <DetailSection
          size="lg"
          title={content?.recentCalls?.title}
          subtitle={content?.recentCalls?.subtitle}
          revealDelay={callsStart}
        >
          <StaggerList items={client?.recentCalls} revealDelay={callsStart}>
            {(call, revealDelay) => (
              <AccountCallRow
                key={call?.id}
                call={call}
                revealDelay={revealDelay}
              />
            )}
          </StaggerList>
        </DetailSection>

        <InstructionCard
          icon={content?.instructions?.icon}
          title={content?.instructions?.title}
          revealDelay={revealDelayAt(callsStart, 1)}
        >
          {client?.instructions}
        </InstructionCard>
      </div>
    </>
  );
}
