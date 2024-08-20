import Details from "@/components/common/details/Details";
import DetailsItem from "@/components/common/details/DetailsItem";
import { printCoins } from "@/lib/utils/coins";
import { ProvideParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { ProvideLiquidityState } from "@/redux/slices/dexSlice";
import BN from "bignumber.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// === === === === === === ===

type LiquidityDetailsProps = {
  provideLiquidityState: ProvideLiquidityState;
  provideParams: ProvideParams;
  showTitle?: boolean;
  bordered?: boolean;
  className?: string;
};
// === === === === === === ===

const LiquidityDetails = ({
  provideLiquidityState,
  provideParams,
  showTitle = true,
  bordered = true,
  className = "",
}: LiquidityDetailsProps) => {
  // === === === === === === ===

  const t = useTranslations("LiquidityFormComponent");

  const [rateDirection, setRateDirection] = useState<"direct" | "reverse">("direct");
  const switchRateDirection = () => {
    setRateDirection((rateDirection) => (rateDirection === "direct" ? "reverse" : "direct"));
  };
  const [rate, setRate] = useState<BN | null>(null);

  // === === === === === === ===

  const printRate = (): string => {
    if (!rate) return "";

    if (rateDirection === "direct") {
      return `1 ${provideLiquidityState.firstAsset.symbol}
       = ${rate.toFixed(provideLiquidityState.secondAsset.decimals)} ${provideLiquidityState.secondAsset.symbol}`;
    } else {
      return `1 ${provideLiquidityState.secondAsset.symbol}
       = ${rate.toFixed(provideLiquidityState.firstAsset.decimals)} ${provideLiquidityState.firstAsset.symbol}`;
    }
  };

  const feeValue = `${printCoins(provideParams.feeMin, 9, 3)}-${printCoins(provideParams.feeMax, 9, 3)} TON`;

  // === === === === === === ===

  useEffect(() => {
    if (provideLiquidityState.firstUnits.eq(0) || provideLiquidityState.secondUnits.eq(0)) {
      setRate(null);
      return;
    }

    const firstDecimals = provideLiquidityState.firstAsset.decimals;
    const secondDecimals = provideLiquidityState.secondAsset.decimals;

    if (rateDirection === "direct") {
      setRate(
        provideLiquidityState.secondUnits
          .div(10 ** secondDecimals)
          .div(provideLiquidityState.firstUnits.div(10 ** firstDecimals)),
      );
    } else if (rateDirection === "reverse") {
      setRate(
        provideLiquidityState.firstUnits
          .div(10 ** firstDecimals)
          .div(provideLiquidityState.secondUnits.div(10 ** secondDecimals)),
      );
    }
  }, [rateDirection, provideLiquidityState.firstUnits, provideLiquidityState.secondUnits]);

  // === === === === === === ===
  return (
    <Details bordered={bordered} className={className} showTitle={showTitle}>
      {rate && <DetailsItem label={t("details.rate")} value={printRate()} onClick={switchRateDirection} />}

      {provideParams.action === "create_pool" ? (
        <>
          <DetailsItem
            label={t("details.minFirstAmount")}
            value={printCoins(provideParams.firstTokenUnits, provideLiquidityState.firstAsset.decimals)}
          />
          <DetailsItem
            label={t("details.minSecondAmount")}
            value={printCoins(provideParams.secondTokenUnits, provideLiquidityState.secondAsset.decimals)}
          />
        </>
      ) : (
        <>
          <DetailsItem label={t("details.minReceived")} value={printCoins(provideParams.minLpOutUnits, 9)} />
          <DetailsItem label={t("details.estShare")} value={`+${provideParams.estimatedShareOfPool}%`} />
        </>
      )}
      {provideParams.action === "provide" && (
        <>
          <DetailsItem
            label={t("details.youProvide")}
            value={`${printCoins(provideParams.firstTokenUnits, provideLiquidityState.firstAsset.decimals)} ${provideLiquidityState.firstAsset.symbol}`}
          />
          <DetailsItem
            label={t("details.youProvide")}
            value={`${printCoins(provideParams.secondTokenUnits, provideLiquidityState.secondAsset.decimals)} ${provideLiquidityState.secondAsset.symbol}`}
          />
        </>
      )}
      {provideParams.action === "provide_second" ||
        (provideParams.action === "provide_additional" && provideParams.sendUnits && (
          <>
            <DetailsItem
              label={t("details.youProvide")}
              value={
                provideParams.secondTokenAddress.equals(provideParams.firstTokenAddress)
                  ? `${printCoins(provideParams.sendUnits, provideLiquidityState.firstAsset.decimals)} ${provideLiquidityState.firstAsset.symbol}`
                  : `${printCoins(provideParams.sendUnits, provideLiquidityState.secondAsset.decimals)} ${provideLiquidityState.secondAsset.symbol}`
              }
            />
          </>
        ))}
      {provideParams.firstTokenBalance && (
        <DetailsItem
          label={t("details.firstTokenBalance")}
          value={`${printCoins(provideParams.firstTokenBalance, provideLiquidityState.firstAsset.decimals)}
           ${provideLiquidityState.firstAsset.symbol}`}
        />
      )}
      {provideParams.secondTokenBalance && (
        <DetailsItem
          label={t("details.secondTokenBalance")}
          value={`${printCoins(provideParams.secondTokenBalance, provideLiquidityState.secondAsset.decimals)}
           ${provideLiquidityState.secondAsset.symbol}`}
        />
      )}
      <DetailsItem label={t("details.blockchainFee")} value={feeValue} />
    </Details>
  );
};

// === === === === === === ===

export default LiquidityDetails;
