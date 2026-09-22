"use client";

import Button from "@/components/atoms/Button";
import AuthStatusCard from "@/components/auth/AuthStatusCard";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";

/** You're all set card — Figma 43:9431. */
export default function AllSetCard() {
  const content = useAuthContentStore((state) => state.allSet);

  return (
    <AuthStatusCard
      icon={content?.icon}
      mark={content?.mark}
      heading={content?.heading}
    >
      <Button href={content?.action?.href} fullWidth>
        {content?.action?.label}
      </Button>
    </AuthStatusCard>
  );
}
