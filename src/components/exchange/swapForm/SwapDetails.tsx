// === === === === === === ===

import Details from "@/components/common/details/Details";
import DetailsItem from "@/components/common/details/DetailsItem";
import { printCoins } from "@/lib/utils/coins";
import { SwapParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { SwapState } from "@/redux/slices/dexSlice";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import BN from "bignumber.js";

// === === === === === === ===

type Props = {
  swapState: SwapState;
  swapParams: SwapParams;
  bordered?: boolean;
  className?: string;
  showTitle?: boolean;
};

// === === === === === === ===

const SwapDetails = ({ swapState, swapParams, bordered, className, showTitle }: Props) => {
  const t = useTranslations("SwapFormComponent");

  const [rateDirection, setRateDirection] = useState<"direct" | "reverse">("direct");
  const switchRateDirection = () => {
    setRateDirection((rateDirection) => (rateDirection === "direct" ? "reverse" : "direct"));
  };
  const [rate, setRate] = useState<BN | null>(null);

  const printRate = (): string => {
    if (!rate) return "";

    if (rateDirection === "direct") {
      return `1 ${swapState.offerAsset.symbol}
       = ${rate.toFixed(swapState.askAsset.decimals)} ${swapState.askAsset.symbol}`;
    } else {
      return `1 ${swapState.askAsset.symbol}
       = ${rate.toFixed(swapState.offerAsset.decimals)} ${swapState.offerAsset.symbol}`;
    }
  };

  useEffect(() => {
    if (swapParams.offerUnits.eq(0) || swapParams.askUnits.eq(0)) {
      setRate(null);
      return;
    }

    const firstDecimals = swapState.offerAsset.decimals;
    const secondDecimals = swapState.askAsset.decimals;

    if (rateDirection === "direct") {
      setRate(swapState.askUnits.div(10 ** secondDecimals).div(swapState.offerUnits.div(10 ** firstDecimals)));
    } else if (rateDirection === "reverse") {
      setRate(swapState.offerUnits.div(10 ** firstDecimals).div(swapState.askUnits.div(10 ** secondDecimals)));
    }
  }, [rateDirection, swapState.offerUnits, swapState.askUnits]);

  const feeValue = `${printCoins(swapParams.feeMin, 9, 3)}-${printCoins(swapParams.feeMax, 9, 3)} TON`;

  return (
    <Details bordered={bordered} className={className} showTitle={showTitle}>
      {rate && <DetailsItem label={t("details.rate")} value={printRate()} onClick={switchRateDirection} />}

      <DetailsItem label={t("details.slippage")} value={`${swapState.slippageTolerance.toFixed(2)}%`} />
      <DetailsItem
        label={t("details.minimumReceived")}
        value={`${printCoins(swapParams.minAskUnits, swapState.askAsset.decimals)} ${swapState.askAsset.symbol}`}
      />
      <DetailsItem label={t("details.priceImpact")} value={`${swapParams.priceImpact.toFixed(2)}%`} />
      <DetailsItem label={t("details.fee")} value={feeValue} />
    </Details>
  );
};

// === === === === === === ===

export default SwapDetails;

// === === === === === === ===
