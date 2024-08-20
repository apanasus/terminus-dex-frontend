"use client";

import Button from "@/components/common/button/Button";
import ProfileMenu from "@/components/ui/profile/ProfileMenu";
import useHandleOutsideClick from "@/hooks/useHandleOusideClick";
import { shortAddress } from "@/lib/utils/tonAddress";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faDoorOpen, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import ProfileMenuItem from "./ProfileMenuItem";
import { useLocale } from "next-intl";
import { useBalances } from "@/hooks/useBalances";
import { printCoins } from "@/lib/utils/coins";

type ProfileButtonProps = {};

const ProfileButton = (props: ProfileButtonProps) => {
  const [tonConnectUI] = useTonConnectUI();
  const isConnectionRestored = useIsConnectionRestored();
  const tonAddress = useTonAddress();
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const balances = useBalances();

  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("");

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const collapse = () => {
    setExpanded(false);
  };

  const disconnectWallet = () => {
    if (wallet) tonConnectUI.disconnect();
  };

  const clickHandler = () => {
    if (!isConnectionRestored) return;
    if (!tonConnectUI.connected) {
      open();
    }
    if (tonConnectUI?.connected) {
      toggleExpanded();
    }
  };

  const ref = useHandleOutsideClick({ clickHandler: collapse });

  useEffect(() => {
    if (!tonConnectUI) return;
    setButtonText(
      tonConnectUI.connected
        ? balances
          ? `${printCoins(balances.ton, 9, 2)} TON`
          : shortAddress(tonAddress)
        : "CONNECT",
    );
  }, [isConnectionRestored, wallet, balances]);

  return (
    <div className="relative" ref={ref}>
      <Button variant="secondary" size="sm" text={buttonText} faIcon={faWallet} onClick={clickHandler} startsWithIcon />
      {isExpanded && (
        <div className="absolute left-full top-[110%] z-10 -translate-x-full transition-opacity" onClick={collapse}>
          <ProfileMenu>
            <ProfileMenuItem icon={faUser} label="Account" description="View your profile" href="/account" />
            <ProfileMenuItem icon={faTelegram} label="Telegram" description="Connect telegram bot" />
            <ProfileMenuItem
              icon={faDoorOpen}
              label="Disconnect"
              description="Disconnect wallet"
              onClick={disconnectWallet}
            />
          </ProfileMenu>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
