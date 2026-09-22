/**
 * The dimmed, blurred backdrop an overlay sits on.
 *
 * shadcn's Sheet ships one; Radix's Popover does not, so anything that wants
 * the same treatment renders this. Same ink, blur and reveal curve as the
 * sheet's overlay, so every overlay in the app dims the page identically.
 */
export default function Scrim() {
  return (
    <span
      aria-hidden
      className="fixed inset-0 z-40 animate-in fade-in-0 bg-brand-ink-black/40 duration-[420ms] ease-reveal backdrop-blur-[2px]"
    />
  );
}
