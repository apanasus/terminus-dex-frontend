// === === === === === === ===

import Details from "@/components/common/details/Details";
import DetailsItem from "@/components/common/details/DetailsItem";
import { BN_ZERO } from "@/lib/utils/bignumber";
import { printCoins } from "@/lib/utils/coins";
import { ProvideParams } from "@/redux/apiBackendClient/tonDex/tonDexApiTypes";
import { ProvideLiquidityState } from "@/redux/slices/dexSlice";
import { useTranslations } from "next-intl";

// === === === === === === ===

type RefundLiquidityDetailsProps = {
  provideLiquidityState: ProvideLiquidityState;
  provideParams: ProvideParams;
};

// === === === === === === ===

const RefundLiquidityDetails = ({ provideLiquidityState, provideParams }: RefundLiquidityDetailsProps) => {
  // === === === === === === ===

  const t = useTranslations("LiquidityFormComponent");

  // === === === === === === ===
  return (
    <Details bordered={false} showTitle={true}>
      <DetailsItem
        label={t("refundLiquidityDetails.firstAssetBalance")}
        value={`${printCoins(provideParams.firstTokenBalance || BN_ZERO, provideLiquidityState.firstAsset.decimals)}
         ${provideLiquidityState.firstAsset.symbol}`}
      />
      <DetailsItem
        label={t("refundLiquidityDetails.secondAssetBalance")}
        value={`${printCoins(provideParams.secondTokenBalance || BN_ZERO, provideLiquidityState.secondAsset.decimals)}
         ${provideLiquidityState.secondAsset.symbol}`}
      />
    </Details>
  );
};

// === === === === === === ===

export default RefundLiquidityDetails;

// === === === === === === ===
