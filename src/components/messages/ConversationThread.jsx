import ActionBar from "@/components/actions/ActionBar";
import StaggerList from "@/components/lists/StaggerList";
import MessageBubble from "@/components/messages/MessageBubble";
import MessageComposer from "@/components/messages/MessageComposer";
import ThreadHeader from "@/components/messages/ThreadHeader";
import Reveal from "@/components/motion/Reveal";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * The inbox's middle column — Figma 167:51527: the thread header, the
 * messages (scrolling on their own, under a "Conversation Started …" line),
 * the Schedule / Create Task / Call back row and the reply box.
 *
 * The message list is keyed by conversation, so opening another one
 * replays its reveal and starts it from the top. Reveals after
 * `revealDelay`; its messages, then its actions, follow it in.
 * `onOpenClientInfo` is the header's "Client info" button.
 */
export default function ConversationThread({
  conversation,
  content,
  notFunctional,
  onOpenClientInfo,
  revealDelay = 0,
}) {
  const thread = content?.thread;
  const messageCount = conversation?.messages?.length ?? 0;

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="flex h-160 min-h-0 min-w-0 flex-col border-b border-solid border-border-default md:h-auto md:border-b-0 xl:border-r"
    >
      <ThreadHeader
        conversation={conversation}
        thread={thread}
        notFunctional={notFunctional}
        onOpenClientInfo={onOpenClientInfo}
      />

      <div
        key={conversation?.id}
        className="flex min-h-0 flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto p-4 sm:p-6"
      >
        <p className="text-body-sm text-center text-text-tertiary">
          {conversation?.startedLabel}
        </p>
        <StaggerList
          items={conversation?.messages}
          revealDelay={revealDelay}
          className="gap-8"
        >
          {(message, delay) => (
            <MessageBubble
              key={message?.id}
              message={message}
              sender={
                message?.direction === "out"
                  ? content?.agent
                  : conversation?.contact
              }
              deliveredIcon={thread?.deliveredIcon}
              revealDelay={delay}
            />
          )}
        </StaggerList>
      </div>

      <ActionBar
        actions={thread?.quickActions}
        buttonProps={notFunctional}
        size="sm"
        revealDelay={nestedRevealDelayAt(revealDelay, messageCount)}
        className="shrink-0 border-t border-solid border-border-default p-3"
      />

      <MessageComposer notFunctional={notFunctional} />
    </Reveal>
  );
}
