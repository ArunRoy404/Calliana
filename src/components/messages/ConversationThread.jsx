import ActionBar from "@/components/actions/ActionBar";
import StaggerList from "@/components/lists/StaggerList";
import MessageBubble from "@/components/messages/MessageBubble";
import MessageComposer from "@/components/messages/MessageComposer";
import ThreadHeader from "@/components/messages/ThreadHeader";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * The inbox's middle column — Figma 167:51527: the thread header, the
 * messages (scrolling on their own, under a "Conversation Started …" line),
 * the Schedule / Create Task / Call back row and the reply box.
 *
 * On a phone it takes the list's place and fills the pane, so its header
 * carries the back button (`onBack`) and the client-details button
 * (`onOpenInfo`) there; from `xl` up those are hidden and it sits beside the
 * list and the client column. The message list is keyed by conversation, so
 * opening another one replays its reveal and starts it from the top. Reveals
 * after `revealDelay`; its messages, then its actions, follow it in.
 */
export default function ConversationThread({
  conversation,
  content,
  notFunctional,
  onBack,
  onOpenInfo,
  revealDelay = 0,
  className,
}) {
  const thread = content?.thread;
  const messageCount = conversation?.messages?.length ?? 0;

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col xl:border-r xl:border-solid xl:border-border-default",
        className,
      )}
    >
      <ThreadHeader
        conversation={conversation}
        thread={thread}
        notFunctional={notFunctional}
        onBack={onBack}
        onOpenInfo={onOpenInfo}
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
