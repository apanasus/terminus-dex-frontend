"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useTranslations } from "next-intl";
import HandBlock from "../common/handBlock/HandBlock";
import { useEffect, useState } from "react";

type HomeHandBlockProps = {};

const HomeHandBlock = (props: HomeHandBlockProps) => {
  const t = useTranslations("HomePage");
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();

  const [buttonLabel, setButtonLabel] = useState(t("handBlock.connectWallet"));
  const [buttonHref, setButtonHref] = useState("/exchange");

  const clickHandler = () => {
    if (!wallet) tonConnectUi.openModal();
  };

  useEffect(() => {
    if (wallet) {
      setButtonLabel(t("handBlock.buttonLabel"));
      setButtonHref("/exchange");
    } else {
      setButtonLabel(t("handBlock.connectWallet"));
      setButtonHref("");
    }
  }, [wallet]);

  return (
    <HandBlock
      header={t("handBlock.header")}
      text={t("handBlock.text")}
      buttonLabel={buttonLabel}
      buttonHref={buttonHref}
      buttonOnClick={clickHandler}
    />
  );
};

export default HomeHandBlock;
