"use client";

import Button from "@/components/common/button/Button";
import ConfirmSwapModal from "@/components/modals/confirmSwapModal/ConfirmSwapModal";
import ProcessingModal from "@/components/modals/processingModal/ProcessingModal";
import TransactionResultModal from "@/components/modals/transactionResulModal.tsx/TransactionResultModal";
import { MIN_AMOUNT } from "@/config";
import { isNullAsset } from "@/lib/utils/asset";
import { ErrorResponseMessage } from "@/redux/apiBackendClient/common/commonTypes";
import { useGetPreparedSwapTransactionMutation } from "@/redux/apiBackendClient/tonDex/tonDexApiSlice";
import { SwapParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { SwapState } from "@/redux/slices/dexSlice";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

type SwapButtonProps = {
  swapState: SwapState;
  swapParams?: SwapParams | ErrorResponseMessage;
  enoughBalances: {
    ton: boolean;
    offerAsset: boolean;
  };
};

const SwapButton = ({ swapState, swapParams, enoughBalances }: SwapButtonProps) => {
  const t = useTranslations("SwapFormComponent");

  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();

  const [enabled, setEnabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(t("connectWallet"));

  const [transactionSent, setTransactionSent] = useState(false);

  const [confirmTransactionOpened, setConfirmTransactionOpened] = useState(false);
  const [processingModalOpened, setProcessingModalOpened] = useState(false);
  const [transactionResultModalOpened, setTransactionResultModalOpened] = useState(false);

  const [getSwapTransaction] = useGetPreparedSwapTransactionMutation();

  useEffect(() => {
    if (isNullAsset(swapState.offerAsset) || isNullAsset(swapState.askAsset)) {
      setEnabled(false);
      setButtonText(t("chooseAssets"));
    } else if (swapState.offerUnits.eq(0) || swapState.askUnits.eq(0)) {
      setEnabled(false);
      setButtonText(t("enterAmont"));
    } else if (swapState.offerUnits.lt(MIN_AMOUNT) || swapState.askUnits.lt(MIN_AMOUNT)) {
      setEnabled(false);
      setButtonText(t("lowAmount"));
    } else if (!wallet) {
      setEnabled(true);
      setButtonText(t("connectWallet"));
    } else if (!enoughBalances.ton) {
      setEnabled(false);
      setButtonText(t("notEnoughTon"));
    } else if (!enoughBalances.offerAsset) {
      setEnabled(false);
      setButtonText(t("notEnoughAsset", { asset: swapState.offerAsset.symbol }));
    } else if (swapParams && !("error" in swapParams)) {
      setEnabled(true);
      setButtonText(t("swapButton.swap"));
    } else {
      setEnabled(false);
      setButtonText("...");
    }
  }, [swapParams, swapState, wallet]);

  const swapClickHandler = () => {
    if (!wallet) {
      tonConnectUi.openModal();
    } else {
      setConfirmTransactionOpened(true);
    }
  };

  const confirmHandler = () => {
    if (!swapParams || "error" in swapParams) return;
    const transactionData = getSwapTransaction({
      offerAddress: swapParams.offerAddress,
      askAddress: swapParams.askAddress,
      offerUnits: swapParams.offerUnits,
      minAskUnits: swapParams.minAskUnits,
      slippageTolerance: swapParams.slippageTolerance,
      swapType: swapState.action,
    }).unwrap();
    if (!transactionData) return;

    setTransactionSent(false);

    transactionData
      .then((data) => {
        if ("error" in data) return Promise.reject(data.error);
        else setConfirmTransactionOpened(false);
        setProcessingModalOpened(true);
        return tonConnectUi.sendTransaction(data, {
          modals: [],
          notifications: "all",
        });
      })
      .then(
        (data) => {
          setProcessingModalOpened(false);
          setTransactionSent(true);
          setTransactionResultModalOpened(true);
        },
        (error) => {
          setProcessingModalOpened(false);
          setTransactionResultModalOpened(true);
        },
      );
  };

  return (
    <div>
      <Button variant={"primary"} className="w-full" text={buttonText} disabled={!enabled} onClick={swapClickHandler} />
      {swapParams && !("error" in swapParams) && (
        <ConfirmSwapModal
          isOpened={confirmTransactionOpened}
          setIsOpened={setConfirmTransactionOpened}
          swapParams={swapParams}
          confirmHandler={confirmHandler}
        />
      )}
      <ProcessingModal isOpened={processingModalOpened} setIsOpened={setProcessingModalOpened} />
      <TransactionResultModal
        isOpened={transactionResultModalOpened}
        setIsOpened={setTransactionResultModalOpened}
        title={t("swap")}
        success={transactionSent}
      />
    </div>
  );
};

export default SwapButton;
