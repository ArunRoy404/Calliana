"use client";

import ActionBar from "@/components/actions/ActionBar";
import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import ElapsedTimer from "@/components/atoms/ElapsedTimer";
import IconLabel from "@/components/atoms/IconLabel";
import MetaLine from "@/components/atoms/MetaLine";
import FilterSelect from "@/components/forms/FilterSelect";
import Reveal from "@/components/motion/Reveal";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useLiveCallNoteStore } from "@/store/agent/useLiveCallNoteStore";

/**
 * The band across the top of the Live Call Workspace: the green "Call
 * Active" chip and its running timer, the caller with their phone and
 * Zoiper tags, the client line and local time, a note that the audio runs
 * in Zoiper — and at the right the professional the call is for, the
 * in-call calendar, "Create Task" and "Wrap Up & Save Call", which submits
 * the note form. Reveals after `revealDelay`.
 */
export default function LiveCallBanner({ content, revealDelay = 0 }) {
  const banner = content?.banner;
  const professional = useLiveCallNoteStore(
    (state) => state.values?.professional,
  );
  const setField = useLiveCallNoteStore((state) => state.setField);
  const wrapUp = useLiveCallNoteStore((state) => state.submitAndClose);

  return (
    <Reveal
      delay={revealDelay}
      className="flex min-w-0 flex-col gap-3 rounded-8 border border-solid border-border-default bg-surface-selected p-4 sm:p-5"
    >
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-4">
          <span className="flex shrink-0 items-center gap-2 rounded-4 border border-solid border-status-success bg-surface-base px-3 py-2 text-status-success">
            <IconLabel icon={banner?.activeIcon} className="text-body-md">
              {banner?.activeLabel}
            </IconLabel>
            <ElapsedTimer
              startSeconds={banner?.elapsedSeconds}
              label={banner?.timerLabel}
              className="text-body-md rounded-4 bg-brand-black px-1 text-status-success"
            />
          </span>

          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <p className="text-h3 text-brand-black">{banner?.caller}</p>
              <IconLabel
                icon={banner?.phoneIcon}
                className="text-body-sm rounded-4 bg-surface-base px-2 py-1 text-text-primary"
              >
                {banner?.phone}
              </IconLabel>
              <IconLabel
                icon={banner?.connectionIcon}
                className="text-body-sm rounded-4 bg-surface-base px-2 py-1 text-text-primary"
              >
                {banner?.connection}
              </IconLabel>
            </div>
            <MetaLine
              separator={content?.separator}
              items={banner?.meta?.map((item) =>
                item?.icon ? (
                  <IconLabel key={item?.id} icon={item?.icon}>
                    {item?.text}
                  </IconLabel>
                ) : (
                  item?.text
                ),
              )}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <FilterSelect
            variant="field"
            label={banner?.professional?.label}
            prefix={`${banner?.professional?.label}:`}
            options={banner?.professional?.options}
            value={professional}
            onValueChange={(value) => setField?.("professional", value)}
            className="w-auto max-w-full font-semibold"
          />
          <ActionBar
            actions={banner?.actions}
            buttonProps={notFunctionalProps(content)}
            size="sm"
          />
          <Button size="sm" onClick={wrapUp}>
            <AssetIcon icon={banner?.wrapUp?.icon} />
            {banner?.wrapUp?.label}
          </Button>
        </div>
      </div>

      <IconLabel
        icon={banner?.noteIcon}
        className="text-body-sm text-text-secondary [&>svg]:text-status-success"
      >
        {banner?.note}
      </IconLabel>
    </Reveal>
  );
}
