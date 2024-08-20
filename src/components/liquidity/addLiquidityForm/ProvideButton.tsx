"use client";

// === === === === === === ===

import Button from "@/components/common/button/Button";
import ConfirmProvideLiquidityModal from "@/components/modals/confirmProvideLiquidityModal/ConfirmProvideLiquidityModal";
import ConfirmRefundLiquidityModal from "@/components/modals/confirmRefundLiquidityModal/ConfirmRefundLiquidityModal";
import ProcessingModal from "@/components/modals/processingModal/ProcessingModal";
import TransactionResultModal from "@/components/modals/transactionResulModal.tsx/TransactionResultModal";
import { MIN_AMOUNT } from "@/config";
import { isNullAsset } from "@/lib/utils/asset";
import { ErrorResponseMessage } from "@/redux/apiBackendClient/common/commonTypes";
import {
  useGetPreparedActivateLiquidityTransactionMutation,
  useGetPreparedCreatePoolTransactionMutation,
  useGetPreparedProvideSingleSideTransactionMutation,
  useGetPreparedProvideTransactionMutation,
  useGetPreparedRefundLiquidityTransactionMutation,
} from "@/redux/apiBackendClient/tonDex/tonDexApiSlice";
import { ProvideParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { ProvideLiquidityState } from "@/redux/slices/dexSlice";
import { Cell } from "@ton/core";
import { useTonConnectModal, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// === === === === === === ===

type ProvideButtonProps = {
  provideLiquidityState: ProvideLiquidityState;
  provideParams?: ProvideParams | ErrorResponseMessage;
  enoughBalances: {
    ton: boolean;
    firstAsset: boolean;
    secondAsset: boolean;
  };
};

// === === === === === === ===

const ProvideButton = ({ provideLiquidityState, provideParams, enoughBalances }: ProvideButtonProps) => {
  // === === === === === === ===
  const t = useTranslations("LiquidityFormComponent");

  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const [tonConnectUi] = useTonConnectUI();

  const [transactionSent, setTransactionSent] = useState(false);

  const [buttonText, setButtonText] = useState<string>("");
  const [isEnabled, setEnabled] = useState<boolean>(false);

  const [confirmTransactionOpened, setConfirmTransactionOpened] = useState(false);
  const [processingModalOpened, setProcessingModalOpened] = useState(false);
  const [transactionResultModalOpened, setTransactionResultModalOpened] = useState(false);
  const [confirmRefundOpened, setConfirmRefundOpened] = useState(false);

  // === === === === === === ===

  const [getCreatePoolTransaction] = useGetPreparedCreatePoolTransactionMutation();
  const [getProvideTransaction] = useGetPreparedProvideTransactionMutation();
  const [getProvideSingleSideTransaction] = useGetPreparedProvideSingleSideTransactionMutation();
  const [getActivateLiquidityTransaction] = useGetPreparedActivateLiquidityTransactionMutation();
  const [getRefundLiquidityTransaction] = useGetPreparedRefundLiquidityTransactionMutation();

  // === === === === === === ===

  const prepareTransaction = (
    provideLiquidityState: ProvideLiquidityState,
    provideParams: ProvideParams,
    refund: boolean,
  ) => {
    let transactionData = null;
    if (refund) {
      transactionData = getRefundLiquidityTransaction({
        firstTokenAddress: provideParams.firstTokenAddress,
        secondTokenAddress: provideParams.secondTokenAddress,
      });
    } else if (provideParams.action === "create_pool") {
      transactionData = getCreatePoolTransaction({
        firstTokenAddress: provideParams.firstTokenAddress,
        secondTokenAddress: provideParams.secondTokenAddress,
        firstTokenUnits: provideLiquidityState.firstUnits,
        secondTokenUnits: provideLiquidityState.secondUnits,
      });
    } else if (provideParams.action === "provide") {
      transactionData = getProvideTransaction({
        firstTokenAddress: provideParams.firstTokenAddress,
        secondTokenAddress: provideParams.secondTokenAddress,
        firstTokenUnits: provideParams.firstTokenUnits,
        secondTokenUnits: provideParams.secondTokenUnits,
        minLpOutUnits: provideParams.minLpOutUnits,
      });
    } else if (
      (provideParams.action === "provide_additional" || provideParams.action === "provide_second") &&
      provideParams.sendTokenAddress &&
      provideParams.sendUnits
    ) {
      transactionData = getProvideSingleSideTransaction({
        sendTokenAddress: provideParams.sendTokenAddress,
        secondTokenAddress: provideParams.secondTokenAddress,
        sendUnits: provideParams.sendUnits,
        minLpOutUnits: provideParams.minLpOutUnits,
      });
    } else if (provideParams.action === "direct_add_provide") {
      transactionData = getActivateLiquidityTransaction({
        firstTokenAddress: provideParams.firstTokenAddress,
        secondTokenAddress: provideParams.secondTokenAddress,
        firstTokenUnits: provideParams.firstTokenUnits,
        secondTokenUnits: provideParams.secondTokenUnits,
        minLpOutUnits: provideParams.minLpOutUnits,
      });
    }

    if (!transactionData) return null;

    return transactionData.unwrap();
  };

  // === === === === === === ===

  const confirmHandler = (refund: boolean) => {
    if (!provideParams || "error" in provideParams) return;
    const transactionData = prepareTransaction(provideLiquidityState, provideParams, refund);
    if (!transactionData) return;

    setTransactionSent(false);

    transactionData
      .then((data) => {
        if ("error" in data) return Promise.reject(data.error);
        if (refund) setConfirmRefundOpened(false);
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

  // === === === === === === ===

  const provideClickHandler = () => {
    if (!wallet) {
      open();
    } else if (
      ["create_pool", "direct_provide", "provide", "provide_second", "provide_additional"].includes(
        provideParams && "action" in provideParams ? provideParams.action : "",
      )
    ) {
      setConfirmTransactionOpened(true);
    }
  };

  const refundClickHandler = () => {
    setConfirmRefundOpened(true);
  };

  // === === === === === === ===

  useEffect(() => {
    if (isNullAsset(provideLiquidityState.firstAsset) || isNullAsset(provideLiquidityState.secondAsset)) {
      setEnabled(false);
      setButtonText(t("chooseAssets"));
    } else if (provideLiquidityState.firstUnits.eq(0) || provideLiquidityState.secondUnits.eq(0)) {
      setEnabled(false);
      setButtonText(t("enterAmont"));
    } else if (provideLiquidityState.firstUnits.lt(MIN_AMOUNT) || provideLiquidityState.secondUnits.lt(MIN_AMOUNT)) {
      setEnabled(false);
      setButtonText(t("lowAmount"));
    } else if (!wallet) {
      setEnabled(true);
      setButtonText(t("connectWallet"));
    } else if (!enoughBalances.ton) {
      setEnabled(false);
      setButtonText(t("notEnoughTon"));
    } else if (!enoughBalances.firstAsset) {
      setEnabled(false);
      setButtonText(t("notEnoughJetton", { symbol: provideLiquidityState.firstAsset.symbol }));
    } else if (!enoughBalances.secondAsset) {
      setEnabled(false);
      setButtonText(t("notEnoughJetton", { symbol: provideLiquidityState.secondAsset.symbol }));
    } else if (provideParams && !("error" in provideParams)) {
      setEnabled(true);
      if (
        provideParams.action === "create_pool" &&
        provideParams.firstTokenUnits.gt(0) &&
        provideParams.secondTokenUnits.gt(0)
      ) {
        setButtonText(t("createPool"));
      } else if (provideParams.action === "direct_add_provide") {
        setButtonText(t("activateLiquidity"));
      } else if (provideParams.action === "provide_second") {
        setButtonText(t("provide"));
      } else if (provideParams.action === "provide_additional") {
        setButtonText(t("provideAdditional"));
      } else {
        setButtonText(t("provide"));
      }
    } else {
      setEnabled(false);
      setButtonText("...");
    }
  }, [provideParams, provideLiquidityState, wallet]);

  // === === === === === === ===

  return (
    <>
      <Button
        variant="primary"
        text={buttonText}
        disabled={!isEnabled}
        className="w-full"
        onClick={provideClickHandler}
      />
      {provideParams &&
        !("error" in provideParams) &&
        (provideParams.firstTokenBalance || provideParams.secondTokenBalance) && (
          <Button variant="primary" text={t("refund")} className="w-full" onClick={refundClickHandler} />
        )}
      {provideParams && !("error" in provideParams) && (
        <>
          <ConfirmProvideLiquidityModal
            title={t("confirmProvideModal.title")}
            isOpened={confirmTransactionOpened}
            setIsOpened={setConfirmTransactionOpened}
            provideParams={provideParams}
            confirmHandler={() => confirmHandler(false)}
          />
          <ConfirmRefundLiquidityModal
            isOpened={confirmRefundOpened}
            setIsOpened={setConfirmRefundOpened}
            provideParams={provideParams}
            confirmHandler={() => confirmHandler(true)}
          />
        </>
      )}
      <ProcessingModal isOpened={processingModalOpened} setIsOpened={setProcessingModalOpened} />
      <TransactionResultModal
        isOpened={transactionResultModalOpened}
        setIsOpened={setTransactionResultModalOpened}
        title={t("confirmProvideModal.title")}
        success={transactionSent}
      />
    </>
  );
};

// === === === === === === ===

export default ProvideButton;

// === === === === === === ===
