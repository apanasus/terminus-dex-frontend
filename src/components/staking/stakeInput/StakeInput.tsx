"use client";

import ChangeAssetButton from "@/components/common/changeAssetButton/ChangeAssetButton";
import { printCoins, toDecimal } from "@/lib/utils/coins";
import { TonAsset } from "@/redux/apiBackendClient/common/commonTypes";
import { useTranslations } from "next-intl";
import React from "react";
import BN from "bignumber.js";
import { TON_ADDRESS } from "@/constants";
import { numberInputValidate } from "@/lib/utils/input";

// === === === === === === ===

type Props = {
  inAsset: TonAsset;
  inAssetBalance: BN;
  outAsset?: TonAsset;
  outAssetBalance?: BN;
  setChooseAssetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  apy: number;
  offerAmount: string;
  setOfferAmount: React.Dispatch<React.SetStateAction<string>>;
  fees: number;
};

// === === === === === === ===

const StakeInput = ({
  inAsset,
  inAssetBalance,
  outAsset,
  outAssetBalance,
  setChooseAssetVisible,
  apy,
  offerAmount,
  setOfferAmount,
  fees,
}: Props) => {
  const t = useTranslations();

  const isTonOffered = inAsset.address.equals(TON_ADDRESS);

  const updateOfferAmount = (offerAmount: string) => {
    const newOfferAmount = numberInputValidate(offerAmount, inAsset.decimals);
    if (!newOfferAmount) return;
    setOfferAmount(newOfferAmount);
  };

  const setMaxOfferAmount = () => {
    if (!inAssetBalance) return;
    let maxOfferAmount = inAssetBalance;
    if (isTonOffered) maxOfferAmount = maxOfferAmount.minus(fees);

    setOfferAmount(printCoins(maxOfferAmount, inAsset.decimals));
  };

  // === === === === === === ===

  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 rounded-2xl bg-bg-form p-4">
      <div className="flex w-full items-center justify-between">
        <ChangeAssetButton
          assetIconUrl={inAsset.iconUrl}
          assetSymbol={inAsset.symbol}
          onClick={() => setChooseAssetVisible(true)}
        />
        <div className="flex flex-col">
          <div
            className="flex items-center gap-2 text-[#383838] transition-all hover:cursor-pointer hover:font-bold"
            onClick={setMaxOfferAmount}
          >
            <span>{t("Common.balance")}:</span>
            <span>{printCoins(inAssetBalance, inAsset.decimals)}</span>
            <span>{inAsset.symbol}</span>
          </div>
          {outAsset && outAssetBalance && (
            <div className="flex items-center gap-2 text-[#383838]">
              <span>{t("Common.balance")}:</span>
              <span>{printCoins(outAssetBalance, outAsset.decimals)}</span>
              <span>{outAsset.symbol}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-4">
        <input
          className="w-full bg-transparent text-center text-6xl font-bold text-black outline-0"
          type="text"
          placeholder="0.0"
          value={offerAmount}
          onChange={(e) => updateOfferAmount(e.target.value)}
        />
      </div>
      <div className="flex w-full items-center justify-between text-[#05060A]">
        <span className="text-base">{t("Common.estYearlyReward")}</span>
        <div className="flex items-center gap-2  text-opacity-60">
          <span>{apy}</span>
          <span>% APY</span>
        </div>
      </div>
    </div>
  );
};

// === === === === === === ===

export default StakeInput;
