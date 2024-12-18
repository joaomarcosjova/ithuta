"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

import { Button } from "@/components/ui";
import { useExitModal } from "@/store/use-exit-modal";

const ExitModal = () => {
  const router = useRouter();
  const { isOpen, close } = useExitModal();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-xs md:max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
          </div>

          <DialogTitle className="text-center font-bold text-2xl">
          Não desita! 
          </DialogTitle>

          <DialogDescription className="text-center text-base text-balance">
           Você vai perder o seu progresso se sair agora.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={close}
            >
              Aprenda Mais
            </Button>

            <Button
              size="lg"
              variant="dangerOutline"
              className="w-full"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              Sair da Lição
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
