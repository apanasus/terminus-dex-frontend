import Button from "@/components/common/button/Button";
import LiquidityDetails from "@/components/liquidity/addLiquidityForm/LiquidityDetails";
import LiquidityPool from "@/components/liquidity/liquidityPool/LiquidityPool";
import { ProvideParams, SwapParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { selectAllAssets, selectProvideLiquidityState, selectSwapState } from "@/redux/slices/dexSlice";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSelector } from "react-redux";
import BaseModal from "../baseModal/BaseModal";
import { toStringOptions } from "@/lib/utils/tonAddress";
import SwapDetails from "@/components/exchange/swapForm/SwapDetails";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { onImageError } from "@/lib/utils/image";
import { printCoins } from "@/lib/utils/coins";

// === === === === === === ===

type ConfirmSwapModalProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  confirmHandler?: () => void;
  swapParams: SwapParams;
};

// === === === === === === ===

const ConfirmSwapModal = ({ isOpened, setIsOpened, confirmHandler, swapParams }: ConfirmSwapModalProps) => {
  // === === === === === === ===
  const t = useTranslations("SwapFormComponent");

  const assets = useSelector(selectAllAssets);
  const swapState = useSelector(selectSwapState);

  const offerAsset = assets[swapParams.offerAddress.toString(toStringOptions)];
  const askAsset = assets[swapParams.askAddress.toString(toStringOptions)];

  // === === === === === === ===

  const close = () => {
    setIsOpened(false);
  };

  // === === === === === === ===

  return (
    <BaseModal isOpened={isOpened} setIsOpened={setIsOpened}>
      <span className="text-[32px] font-bold text-light-800">{t("ConfirmModal.title")}</span>
      <div className="flex w-full flex-col items-center justify-between gap-6">
        <div className="flex flex-col items-center justify-between gap-4">
          <Image src={askAsset.iconUrl} alt={askAsset.name} width={64} height={64} onError={onImageError} />
          <span className="text-2xl font-bold text-light-800">{`${printCoins(swapParams.askUnits, askAsset.decimals)} ${askAsset.symbol}`}</span>
          <div className="flex items-center justify-between">
            <Image src={offerAsset.iconUrl} alt={offerAsset.name} width={16} height={16} onError={onImageError} />
            <Image
              src={askAsset.iconUrl}
              alt={askAsset.name}
              width={16}
              height={16}
              onError={onImageError}
              className="-translate-x-1"
            />
            <span className="text-sm text-light-900">{`${offerAsset.name}/${askAsset.name}`}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <SwapDetails
          swapParams={swapParams}
          swapState={swapState}
          bordered={false}
          className="bg-soft-100"
          showTitle={false}
        />
      </div>
      <Button variant="primary" size="sm" onClick={confirmHandler} text="Confirm" faIcon={faArrowRight} />
    </BaseModal>
  );
};

// === === === === === === ===

export default ConfirmSwapModal;

// === === === === === === ===
