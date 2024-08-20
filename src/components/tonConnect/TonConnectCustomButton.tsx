"use client";

import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useTonConnectUI } from "@tonconnect/ui-react";
import Button from "../common/button/Button";

type TonConnectCustomButtonProps = {};

const TonConnectCustomButton = (props: TonConnectCustomButtonProps) => {
  const [tonConnectUI] = useTonConnectUI();

  const onClick = () => {
    if (tonConnectUI.connected) return;
    tonConnectUI.openModal();
  };

  return (
    <Button variant="secondary" size="sm" onClick={onClick} text="CONNECT" faIcon={faWallet} startsWithIcon={true} />
  );
};

export default TonConnectCustomButton;
