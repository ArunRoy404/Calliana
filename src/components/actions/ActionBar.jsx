import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import Reveal from "@/components/motion/Reveal";

/**
 * The agent panel's action row — Figma 198:34818: Assign Client, Edit Agent,
 * Reset Access, Deactivate. Each is a `Button` in its data-given variant;
 * none has a backend yet, so each says so when pressed.
 */
export default function AgentDetailActions({ actions = [], notFunctional }) {
  return (
    <Reveal className="flex flex-wrap items-center gap-2 sm:gap-4">
      {actions?.map((action) => (
        <Button key={action?.id} variant={action?.variant} {...notFunctional}>
          <AssetIcon icon={action?.icon} />
          {action?.label}
        </Button>
      ))}
    </Reveal>
  );
}
