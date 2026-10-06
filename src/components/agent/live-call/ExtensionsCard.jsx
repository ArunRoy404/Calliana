import Button from "@/components/atoms/Button";
import DetailSection from "@/components/cards/DetailSection";
import RowCard from "@/components/cards/RowCard";
import StaggerList from "@/components/lists/StaggerList";

/**
 * "Appointment & Extensions" — the people and bookings the agent may need
 * mid-call, each with a small primary-ruled action ("Ext 101" to transfer,
 * "Appt" to open the booking). None is wired yet. Reveals after
 * `revealDelay`; its rows follow it in.
 */
export default function ExtensionsCard({
  extensions,
  notFunctional,
  revealDelay = 0,
}) {
  return (
    <DetailSection
      size="lg"
      title={extensions?.title}
      revealDelay={revealDelay}
    >
      <StaggerList items={extensions?.rows} revealDelay={revealDelay}>
        {(row, delay) => (
          <RowCard
            key={row?.id}
            variant="bare"
            revealDelay={delay}
            className="flex-row items-center justify-between gap-3"
          >
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-body-lg truncate text-status-info">
                {row?.title}
              </span>
              <span className="text-label-sm truncate text-text-secondary">
                {row?.subtitle}
              </span>
            </span>
            <Button variant="outline-primary" size="xs" {...notFunctional}>
              {row?.action}
            </Button>
          </RowCard>
        )}
      </StaggerList>
    </DetailSection>
  );
}
