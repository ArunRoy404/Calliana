import IconBase from "@/components/icons/IconBase";

/**
 * vuesax/bold/user — sidebar Agents. Figma's dev-mode codegen resolves every
 * inactive sidebar tab to the same placeholder glyph (`category-2`), so this
 * one is redrawn to match the bold single-figure mark visible in the
 * rendered screenshot (202:41243) rather than exported directly — see
 * AGENTS.md rule 30.
 */
export default function AgentsIcon(props) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        d="M10 10.417A4.06 4.06 0 0 0 14.058 6.4 4.06 4.06 0 0 0 10 2.375 4.06 4.06 0 0 0 5.941 6.4 4.06 4.06 0 0 0 10 10.417Z"
      />
      <path
        fill="currentColor"
        d="M10 12.292c-3.35 0-6.075 2.15-6.075 4.8 0 .191.155.346.346.346h11.458a.346.346 0 0 0 .346-.346c0-2.65-2.725-4.8-6.075-4.8Z"
      />
    </IconBase>
  );
}
