import ActionBar from "@/components/actions/ActionBar";
import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import MetaLine from "@/components/atoms/MetaLine";
import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { notFunctionalProps } from "@/lib/notFunctional";
import { revealDelayAt } from "@/lib/motion";

/**
 * A client page's header band — Figma 198:31038: the breadcrumb, a back
 * button, the business mark, name and status, the specialty and address, the
 * primary contact line, and the record's actions on the right (below it on a
 * narrower screen).
 */
export default function ClientDetailHeader({ client, content }) {
  const labels = content?.labels;

  return (
    <Reveal
      as="header"
      className="flex flex-col gap-4 border-b border-solid border-border-default bg-surface-base p-4 sm:p-6"
    >
      <Breadcrumbs
        items={content?.breadcrumb}
        separator={content?.breadcrumbIcon}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <Button
            href={content?.back?.href}
            variant="neutral"
            size="square"
            aria-label={content?.back?.label}
          >
            <Icon name="ArrowLeft" size={16} className="text-action-primary" />
          </Button>

          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-4 border border-solid border-border-focus bg-status-info-bg">
                  <AssetIcon icon={content?.businessIcon} />
                </span>
                <h2 className="text-h4 truncate text-text-primary">
                  {client?.name}
                </h2>
              </div>
              <StatusBadge
                variant="outline"
                showDot={false}
                label={client?.status?.label}
                tone={client?.status?.tone}
              />
            </div>

            <MetaLine items={client?.summary} separator={labels?.separator} />
            <MetaLine
              separator={labels?.separator}
              items={[
                <span key="contact">
                  {labels?.contact}{" "}
                  <span className="text-text-primary">{client?.contact}</span>
                </span>,
                client?.phone,
                client?.email,
              ]}
            />
          </div>
        </div>

        <ActionBar
          actions={content?.actions}
          buttonProps={notFunctionalProps(content)}
          revealDelay={revealDelayAt(0, 1)}
        />
      </div>
    </Reveal>
  );
}
