import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import DetailSection from "@/components/cards/DetailSection";
import ContactCard from "@/components/clients/detail/ContactCard";
import { nestedRevealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";

/**
 * Contacts tab — Figma 202:30410: the direct-contacts directory, three across
 * on a wide screen, with "Add Contact" in the header.
 */
export default function ClientContactsTab({ client, content }) {
  const labels = content?.contacts;
  const buttonProps = notFunctionalProps(content);

  return (
    <DetailSection
      size="lg"
      title={labels?.title}
      action={
        <Button {...buttonProps}>
          <AssetIcon icon={labels?.addIcon} />
          {labels?.addLabel}
        </Button>
      }
    >
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {client?.contacts?.map((contact, index) => (
          <ContactCard
            key={contact?.id}
            contact={contact}
            labels={labels}
            buttonProps={buttonProps}
            revealDelay={nestedRevealDelayAt(0, index)}
          />
        ))}
      </ul>
    </DetailSection>
  );
}
