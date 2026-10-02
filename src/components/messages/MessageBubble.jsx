import AssetIcon from "@/components/atoms/AssetIcon";
import UserAvatar from "@/components/atoms/UserAvatar";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * One message in a thread — Figma 167:51527. An inbound message sits left on
 * a light grey bubble; an outbound one sits right, on primary blue, with the
 * delivered ticks beside its time. The sender's picture leads (or, outbound,
 * trails) the bubble. Reveals after `revealDelay`.
 */
const DIRECTION_CLASSES = {
  in: {
    row: "",
    bubble: "bg-brand-track text-brand-black",
    meta: "text-text-tertiary",
  },
  out: {
    row: "flex-row-reverse",
    bubble: "bg-action-primary text-text-on-primary",
    meta: "text-text-on-primary/80",
  },
};

export default function MessageBubble({
  message,
  sender,
  deliveredIcon,
  revealDelay = 0,
}) {
  const isOutbound = message?.direction === "out";
  const classes =
    DIRECTION_CLASSES?.[message?.direction] ?? DIRECTION_CLASSES?.in;

  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className={cn("flex items-start gap-3", classes?.row)}
    >
      <UserAvatar name={sender?.name} src={sender?.avatar} />

      <div
        className={cn(
          "flex max-w-[85%] flex-col gap-2 rounded-8 px-3 py-2 sm:max-w-[60%]",
          classes?.bubble,
        )}
      >
        <p className="text-body-sm whitespace-pre-line">{message?.text}</p>
        <p
          className={cn(
            "text-label-sm flex items-center justify-end gap-1",
            classes?.meta,
          )}
        >
          {message?.time}
          {isOutbound && <AssetIcon icon={deliveredIcon} />}
        </p>
      </div>
    </Reveal>
  );
}
