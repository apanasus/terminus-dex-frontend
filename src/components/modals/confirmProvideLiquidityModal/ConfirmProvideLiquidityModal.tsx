import Button from "@/components/common/button/Button";
import LiquidityDetails from "@/components/liquidity/addLiquidityForm/LiquidityDetails";
import LiquidityPool from "@/components/liquidity/liquidityPool/LiquidityPool";
import { ProvideParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { selectAllAssets, selectProvideLiquidityState } from "@/redux/slices/dexSlice";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSelector } from "react-redux";
import BaseModal from "../baseModal/BaseModal";
import { toStringOptions } from "@/lib/utils/tonAddress";

// === === === === === === ===

type ConfirmProvideLiquidityProps = {
  title: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  confirmHandler?: () => void;
  provideParams: ProvideParams;
};

// === === === === === === ===

const ConfirmProvideLiquidityModal = ({
  title,
  isOpened,
  setIsOpened,
  confirmHandler,
  provideParams,
}: ConfirmProvideLiquidityProps) => {
  // === === === === === === ===

  const assets = useSelector(selectAllAssets);
  const provideLiquidityState = useSelector(selectProvideLiquidityState);

  const firstAsset = assets[provideParams.firstTokenAddress.toString(toStringOptions)];
  const secondAsset = assets[provideParams.secondTokenAddress.toString(toStringOptions)];

  // === === === === === === ===

  const close = () => {
    setIsOpened(false);
  };

  // === === === === === === ===

  return (
    <BaseModal title={title} isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <LiquidityPool firstAsset={firstAsset} secondAsset={secondAsset} />
        <LiquidityDetails
          provideParams={provideParams}
          provideLiquidityState={provideLiquidityState}
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

export default ConfirmProvideLiquidityModal;

// === === === === === === ===
