"use client";

// === === === === === === ===

import React from "react";
import BaseModal from "../baseModal/BaseModal";
import { useSelector } from "react-redux";
import { selectAllAssets, selectProvideLiquidityState } from "@/redux/slices/dexSlice";
import LiquidityPool from "@/components/liquidity/liquidityPool/LiquidityPool";
import Button from "@/components/common/button/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ProvideParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import RefundLiquidityDetails from "./RefundLiquidityDetails";
import { useTranslations } from "next-intl";
import { toStringOptions } from "@/lib/utils/tonAddress";

// === === === === === === ===

type ConfirmRefundLiquidityProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  confirmHandler?: () => void;
  provideParams: ProvideParams;
};

// === === === === === === ===

const ConfirmRefundLiquidityModal = ({
  isOpened,
  setIsOpened,
  confirmHandler,
  provideParams,
}: ConfirmRefundLiquidityProps) => {
  // === === === === === === ===
  const t = useTranslations("LiquidityFormComponent");

  const assets = useSelector(selectAllAssets);
  const provideLiquidityState = useSelector(selectProvideLiquidityState);

  const firstAsset = assets[provideParams.firstTokenAddress.toString(toStringOptions)];
  const secondAsset = assets[provideParams.secondTokenAddress.toString(toStringOptions)];

  // === === === === === === ===

  return (
    <BaseModal title={t("confirmRefundLiquidityModal.title")} isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <LiquidityPool firstAsset={firstAsset} secondAsset={secondAsset} />
        <RefundLiquidityDetails provideParams={provideParams} provideLiquidityState={provideLiquidityState} />
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={confirmHandler}
        text={t("confirmRefundLiquidityModal.button")}
        faIcon={faArrowRight}
      />
    </BaseModal>
  );
};

// === === === === === === ===

export default ConfirmRefundLiquidityModal;

// === === === === === === ===
