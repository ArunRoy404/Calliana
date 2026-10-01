import Reveal from "@/components/motion/Reveal";

/** One numbered step of a queue's ACD call path — Figma 381:38657. */
export default function CallPathStep({ step, index, revealDelay = 0 }) {
  return (
    <Reveal as="li" delay={revealDelay} className="flex items-start gap-3">
      <span className="text-label-sm flex size-5.5 shrink-0 items-center justify-center rounded-999 bg-surface-selected font-semibold text-action-primary">
        {index + 1}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-label-lg text-brand-black">{step?.title}</p>
        <p className="text-body-sm text-text-tertiary">{step?.description}</p>
      </div>
    </Reveal>
  );
}
