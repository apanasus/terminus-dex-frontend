import { useTonConnectUI, WalletInfo } from "@tonconnect/ui-react";
import React from "react";
import BaseModal from "../baseModal/BaseModal";
import Image from "next/image";
import { useTranslations } from "next-intl";

// === === === === === === ===

type ProcessingModalProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

// === === === === === === ===

const ProcessingModal = ({ isOpened, setIsOpened }: ProcessingModalProps) => {
  // === === === === === === ===
  const t = useTranslations("ProcessingModal");
  const [tonConnectUi] = useTonConnectUI();
  const walletName = (tonConnectUi?.wallet as WalletInfo)?.name ? (tonConnectUi.wallet as WalletInfo).name : "wallet";

  // === === === === === === ===

  return (
    <BaseModal isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex h-[124px] w-full items-end justify-center">
          <Image
            src="/static/images/empty-coin.png"
            alt="empty coin"
            width={68.5}
            height={68.5}
            className="animate-bounce"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <span className="text-[32px] font-bold text-light-800">{t("processing")}</span>
          <p className="text-center text-base text-light-900">{t("description", { 0: walletName })}</p>
        </div>
      </div>
    </BaseModal>
  );
};

// === === === === === === ===

export default ProcessingModal;

// === === === === === === ===
