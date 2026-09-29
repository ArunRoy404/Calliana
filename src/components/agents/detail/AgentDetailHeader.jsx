import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";

/**
 * The agent panel's header — Figma 198:34755: avatar with a presence dot, the
 * name, account and availability pills, then the role and a one-line summary.
 * The two text lines sit under the name, indented past the avatar.
 */
export default function AgentDetailHeader({ agent, labels }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <UserAvatar
            name={agent?.name}
            size="xl"
            status={agent?.availability?.tone}
          />
          <p className="text-h4 text-text-primary">{agent?.name}</p>
        </div>

        <StatusBadge
          variant="outline"
          showDot={false}
          label={agent?.accountStatus?.label}
          tone={agent?.accountStatus?.tone}
        />
        <StatusBadge
          variant="outline"
          label={agent?.availability?.label}
          tone={agent?.availability?.tone}
        />
      </div>

      <div className="text-body-md flex flex-col gap-2 text-text-secondary sm:pl-16">
        <p>{agent?.role}</p>
        <p className="flex flex-wrap items-center gap-x-2">
          <span>
            <span className="font-semibold">{labels?.clients}</span>{" "}
            {agent?.clientCount}
          </span>
          <span aria-hidden>{labels?.separator}</span>
          <span>
            {labels?.lastActive} {agent?.lastActive}
          </span>
          <span aria-hidden>{labels?.separator}</span>
          <span className="break-all">{agent?.email}</span>
        </p>
      </div>
    </div>
  );
}
