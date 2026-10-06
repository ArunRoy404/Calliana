import ActionBar from "@/components/actions/ActionBar";
import CallAccountCard from "@/components/agent/dashboard/CallAccountCard";
import CallerIdentity from "@/components/agent/dashboard/CallerIdentity";
import LiveCallHeader from "@/components/agent/dashboard/LiveCallHeader";
import Waveform from "@/components/charts/Waveform";
import Reveal from "@/components/motion/Reveal";
import { nestedRevealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";

/**
 * The call on the agent's line right now: the primary band (live label,
 * Zoiper tag, the running timer), who is calling beside the client account
 * it belongs to (stacked below `lg`), the call's waveform, and Add Note /
 * Create Task / Open Live Workspace. None of the actions has a backend yet.
 * Reveals after `revealDelay`; its action row follows it in.
 */
export default function LiveCallPanel({
  call,
  waveform,
  headerWaveform,
  separator,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="flex min-w-0 flex-col overflow-hidden bg-surface-base"
    >
      <LiveCallHeader call={call} waveform={headerWaveform} />

      <div className="flex min-w-0 flex-col gap-6 p-5">
        <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <CallerIdentity caller={call?.caller} />
          <CallAccountCard account={call?.account} separator={separator} />
        </div>

        <Waveform bars={waveform} />

        <ActionBar
          actions={call?.actions}
          buttonProps={notFunctionalProps(call)}
          size="md"
          className="justify-end"
          revealDelay={nestedRevealDelayAt(revealDelay, 0)}
        />
      </div>
    </Reveal>
  );
}
