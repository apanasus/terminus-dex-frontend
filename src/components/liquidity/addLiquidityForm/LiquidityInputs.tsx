// === === === === === === ===

import ExchangeInput from "@/components/common/exchangeInput/ExchangeInput";
import { toStringOptions } from "@/lib/utils/tonAddress";
import { ProvideLiquidityState } from "@/redux/slices/dexSlice";
import { Balances } from "@/types/ton/TonBalances";
import BN from "bignumber.js";
import { useTranslations } from "next-intl";

// === === === === === === ===

type LiquidityInputsProps = {
  provideLiquidityState: ProvideLiquidityState;
  balances?: Balances | null;
  setFirstUnits: (value: BN) => void;
  setSecondUnits: (value: BN) => void;
  openChooseFirstAssetModal: () => void;
  openChooseSecondAssetModal: () => void;
};

// === === === === === === ===

const LiquidityInputs = (props: LiquidityInputsProps) => {
  // === === === === === === ===

  const t = useTranslations("LiquidityFormComponent");

  // === === === === === === ===

  return (
    <div className="relative flex w-full flex-col gap-2">
      {/* send input */}
      <ExchangeInput
        asset={props.provideLiquidityState.firstAsset}
        header={t("sendInputHeader")}
        balance={props.balances?.assets[props.provideLiquidityState.firstAsset.address.toString(toStringOptions)]}
        usdAmount={9.98}
        value={props.provideLiquidityState.firstUnits}
        setValue={props.setFirstUnits}
        chooseAssetButtonHandler={props.openChooseFirstAssetModal}
      />
      {/* receive input */}
      <ExchangeInput
        asset={props.provideLiquidityState.secondAsset}
        header={t("receiveInputHeader")}
        balance={props.balances?.assets[props.provideLiquidityState.secondAsset.address.toString(toStringOptions)]}
        usdAmount={9.86}
        value={props.provideLiquidityState.secondUnits}
        setValue={props.setSecondUnits}
        chooseAssetButtonHandler={props.openChooseSecondAssetModal}
      />
    </div>
  );
};

// === === === === === === ===

export default LiquidityInputs;
