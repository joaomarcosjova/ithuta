"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui";
import { createStripeUrl } from "@/server/actions/user-subscription";

type UpgradeButtonProps = {
  isMobile?: boolean;
};

const UpgradeButton = ({ isMobile }: UpgradeButtonProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const upgradePlan = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Algo deu errado ⚠"));
    });
  };

  const handleClick = () => (isMobile ? upgradePlan() : router.push("/shop"));

  return (
    <Button
      size="lg"
      variant="super"
      onClick={handleClick}
      disabled={pending}
      className="w-full"
    >
      Teste 7 dias grátis
    </Button>
  );
};

export default UpgradeButton;
