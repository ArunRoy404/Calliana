import ClientInfoDetails from "@/components/messages/ClientInfoDetails";
import Reveal from "@/components/motion/Reveal";

/**
 * The inbox's right column — Figma 167:51527: a "CLIENT INFO" caption over
 * the open conversation's `ClientInfoDetails`, scrolling on its own.
 *
 * Between `md` and `xl` the inbox has room for only two columns, so the
 * list and the thread keep the space and this column steps aside — the
 * thread header's "Client info" button opens the same details in
 * `ClientInfoDrawer` instead. On a phone it stacks under the thread.
 * Reveals after `revealDelay`.
 */
export default function ClientInfoPanel({
  client,
  content,
  notFunctional,
  revealDelay = 0,
}) {
  const info = content?.clientInfo;

  return (
    <Reveal
      as="aside"
      delay={revealDelay}
      className="flex min-h-0 min-w-0 flex-col md:hidden xl:flex xl:overflow-x-hidden xl:overflow-y-auto"
    >
      <p className="text-label-sm border-b border-solid border-border-default px-4 py-3 text-text-tertiary">
        {info?.title}
      </p>

      <ClientInfoDetails
        client={client}
        info={info}
        notFunctional={notFunctional}
        revealDelay={revealDelay}
      />
    </Reveal>
  );
}
