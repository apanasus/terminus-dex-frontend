"use client";

// === === === === === === ===

import React, { useEffect } from "react";
import ChangeAssetButton from "../changeAssetButton/ChangeAssetButton";
import { useTranslations } from "next-intl";
import BN from "bignumber.js";
import { printCoins, toNano } from "@/lib/utils/coins";
import { TonAsset } from "@/types/ton/TonAsset";
import { numberInputValidate } from "@/lib/utils/input";
import { isNullAsset } from "@/lib/utils/asset";
import { useDebounce } from "@/hooks/useDebounce";
import { twMerge } from "tailwind-merge";

// === === === === === === ===

type ExchangeInputProps = {
  asset: TonAsset;
  header: string;
  balance?: BN | null;
  usdAmount: number;
  value: BN;
  setValue: (value: BN) => void;
  chooseAssetButtonHandler: () => void;
  className?: string;
};

// === === === === === === ===

const ExchangeInput = ({
  asset,
  header,
  balance,
  usdAmount,
  value,
  setValue,
  chooseAssetButtonHandler,
  className,
}: ExchangeInputProps) => {
  // === === === === === === ===

  const t = useTranslations();

  const [inputValue, setInputValue] = React.useState(value.gt(0) ? printCoins(value, asset.decimals) : "");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = numberInputValidate(event.target.value, asset.decimals);
    if (newValue === null) return;
    setValue(toNano(newValue, asset.decimals));
    setInputValue(newValue);
  };

  // === === === === === === ===

  useEffect(() => {
    if (value.eq(inputValue)) return;
    setInputValue(value.gt(0) ? printCoins(value, asset.decimals) : "");
  }, [value]);

  // === === === === === === ===

  return (
    <div className={twMerge("flex w-full flex-col items-start gap-4 rounded-2xl bg-bg-form p-4", className)}>
      <span className="text-[#05060A]">{header}</span>
      <div className="flex w-full items-center justify-between text-[#05060A]">
        <ChangeAssetButton assetIconUrl={asset.iconUrl} assetSymbol={asset.symbol} onClick={chooseAssetButtonHandler} />
        <input
          placeholder="0.0"
          value={inputValue}
          onChange={onChangeHandler}
          className="w-0 grow bg-transparent text-end text-3xl font-bold outline-0"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4 text-[#5C626D]">
        <div className="flex items-center justify-start gap-2">
          <span>{t("Common.balance")}:</span>
          {balance && !isNullAsset(asset) ? (
            <>
              <span>{printCoins(balance, asset.decimals)}</span>
              <span>{asset.symbol}</span>
            </>
          ) : (
            "..."
          )}
        </div>
        {/* <span>~ ${usdAmount}</span> */}
      </div>
    </div>
  );
};

export default ExchangeInput;
