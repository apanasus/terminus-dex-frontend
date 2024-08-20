"use client";

import { numberInputValidate } from "@/lib/utils/input";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "../button/Button";
import { MAX_SLIPPAGE, MIN_SLIPPAGE } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";

type SlippageSettingsProps = {
  value: number;
  setValue: (value: string) => void;
};

const SlippageSettings = ({ value, setValue }: SlippageSettingsProps) => {
  const t = useTranslations();

  const setValueDebounced = useDebounce(setValue, 500);
  const [inputValue, setInputValue] = React.useState(value.toString());

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = numberInputValidate(event.target.value, 2, MAX_SLIPPAGE, MIN_SLIPPAGE);
    if (newValue) {
      setInputValue(newValue);
      setValueDebounced(newValue);
    }
  };

  return (
    <div className="box-border flex flex-col gap-4 rounded-2xl border-[1px] border-dark-600 p-4">
      <span className="">{t("Common.slippageTolerance")}:</span>
      <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
        <div className="flex grow items-center justify-between gap-2 sm:grow-0">
          <Button
            variant="secondary"
            size="sm"
            text="0.1%"
            className="h-10 grow rounded-2xl border-[#282931] bg-[#282931] text-sm sm:grow-0"
            onClick={() => setValue("0.1")}
          />
          <Button
            variant="secondary"
            size="sm"
            text="0.5%"
            className="h-10 grow rounded-2xl border-[#282931] bg-[#282931] text-sm sm:grow-0"
            onClick={() => setValue("0.5")}
          />
          <Button
            variant="secondary"
            size="sm"
            text="1%"
            className="h-10 grow rounded-2xl border-[#282931] bg-[#282931] text-sm sm:grow-0"
            onClick={() => setValue("1")}
          />
        </div>
        <div
          className={`box-border flex h-10 grow items-center justify-end gap-8 rounded-lg border-[1px] border-dark-600 px-4 text-sm font-medium
            ${+value > 5 ? "text-red " : "text-light-800 "}`}
        >
          <input
            className="w-full bg-transparent text-end outline-0"
            value={inputValue}
            placeholder={"Enter slippage..."}
            onChange={onChangeHandler}
          />
          <span>%</span>
        </div>
      </div>
    </div>
  );
};

export default SlippageSettings;
