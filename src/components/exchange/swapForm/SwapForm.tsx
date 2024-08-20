"use client";

// === === === === === === ===

import ExchangeInput from "@/components/common/exchangeInput/ExchangeInput";
import SlippageSettings from "@/components/common/slippageSettings/SlippageSettings";
import ChooseAssetModal from "@/components/modals/chooseAssetModal/ChooseAssetModal";
import { NULL_ASSET, TON_ADDRESS } from "@/constants";
import { useAllAssets } from "@/hooks/useAssets";
import { useAssetsQueryParams } from "@/hooks/useAssetsQueryParams";
import { useBalances } from "@/hooks/useBalances";
import { useDebounce } from "@/hooks/useDebounce";
import { isNullAsset } from "@/lib/utils/asset";
import { toStringOptions } from "@/lib/utils/tonAddress";
import { useGetSwapParamsQuery } from "@/redux/apiBackendClient/tonDex/tonDexApiSlice";
import {
  selectAllAssets,
  selectAssetsPairs,
  selectSwapState,
  selectUserAssets,
  updateSwapState,
} from "@/redux/slices/dexSlice";
import { TonAsset } from "@/types/ton/TonAsset";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BN from "bignumber.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import SwapButton from "../swapButton/SwapButton";
import SwapDetails from "./SwapDetails";

// === === === === === === ===

type SwapFormProps = {};

// === === === === === === ===

const SwapForm = (props: SwapFormProps) => {
  const t = useTranslations("SwapFormComponent");

  const balances = useBalances();
  useAllAssets();

  const dispatch = useDispatch();
  const swapState = useSelector(selectSwapState, shallowEqual);
  const userAssets = useSelector(selectUserAssets, shallowEqual);
  const assets = useSelector(selectAllAssets, shallowEqual);
  const assetsPairs = useSelector(selectAssetsPairs);

  const { data: swapParams } = useGetSwapParamsQuery(
    {
      offerAddress: swapState.offerAsset.address,
      askAddress: swapState.askAsset.address,
      units: swapState.action === "direct" ? swapState.offerUnits : swapState.askUnits,
      swapType: swapState.action,
      slippageTolerance: swapState.slippageTolerance,
    },
    {
      skip:
        (swapState.offerAsset.address.equals(NULL_ASSET.address) && swapState.offerAsset.symbol !== "TON") ||
        (swapState.askAsset.address.equals(NULL_ASSET.address) && swapState.askAsset.symbol !== "TON") ||
        (swapState.action === "direct" && swapState.offerUnits.eq(0)) ||
        (swapState.action === "reverse" && swapState.askUnits.eq(0)),
      selectFromResult: ({ data }) => ({ data }),
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000 * 30,
    },
  );

  // === === === === === === ===

  const [offerAssets, setOfferAssets] = useState<TonAsset[]>([]);
  const [askAssets, setAskAssets] = useState<TonAsset[]>([]);

  useEffect(() => {
    const newOfferAssets = Object.values(assets).filter(
      (asset) => assetsPairs.get(asset.address.toString(toStringOptions))?.size ?? 0 > 0,
    );
    setOfferAssets(newOfferAssets);

    const newAskAssets = newOfferAssets.filter(
      (asset) =>
        !asset.address.equals(swapState.offerAsset.address) &&
        assetsPairs
          .get(swapState.offerAsset.address.toString(toStringOptions))
          ?.get(asset.address.toString(toStringOptions)) === true,
    );
    setAskAssets(newAskAssets);
  }, [swapState.offerAsset, userAssets, assets, assetsPairs]);

  // === === === === === === ===

  const [assetsSwapped, setAssetsSwapped] = useState(false);

  const swapAssets = () => {
    setAssetsSwapped((prev) => !prev);
    dispatch(updateSwapState({ offerAsset: swapState.askAsset, askAsset: swapState.offerAsset }));
  };

  const setOfferAsset = (asset: TonAsset) => {
    dispatch(updateSwapState({ offerAsset: asset }));
    if (asset.address.equals(swapState.askAsset?.address)) {
      dispatch(updateSwapState({ askAsset: NULL_ASSET }));
    }
  };

  const setAskAsset = (asset: TonAsset) => {
    dispatch(updateSwapState({ askAsset: asset }));
  };

  const setOfferUnits = (value: BN) => {
    dispatch(updateSwapState({ offerUnits: value, action: "direct" }));
  };
  const setOfferUnitsDebounced = useDebounce(setOfferUnits, 500);

  const setAskUnits = (value: BN) => {
    dispatch(updateSwapState({ askUnits: value, action: "reverse" }));
  };
  const setAskUnitsDebounced = useDebounce(setAskUnits, 500);

  const setSlippageTolerance = (value: string) => {
    dispatch(updateSwapState({ slippageTolerance: Number.parseFloat(value) }));
  };

  // === === === === === === ===

  useAssetsQueryParams({
    firstAsset: swapState.offerAsset,
    setFirstAsset: setOfferAsset,
    secondAsset: swapState.askAsset,
    setSecondAsset: setAskAsset,
  });

  // === === === === === === ===

  const [chooseOfferAssetVisible, setChooseOfferAssetVisible] = useState(false);
  const [chooseAskAssetVisible, setChooseAskAssetVisible] = useState(false);

  const openChooseSendAssetModal = () => {
    setChooseOfferAssetVisible(true);
  };
  const openChooseReceiveAssetModal = () => {
    setChooseAskAssetVisible(true);
  };

  // === === === === === === ===

  const isEnoughBalances = () => {
    if (!swapParams || "error" in swapParams || !balances || isNullAsset(swapState.offerAsset)) {
      return {
        ton: false,
        offerAsset: false,
      };
    }

    let requiredTons = swapParams.feeMax;
    let requiredOfferUnits = swapParams.offerUnits;

    if (swapState.offerAsset.address.equals(TON_ADDRESS)) {
      requiredTons = requiredTons.plus(requiredOfferUnits);
      requiredOfferUnits = requiredTons;
    }

    return {
      ton: balances.ton.gte(requiredTons),
      offerAsset: balances.assets[swapState.offerAsset.address.toString(toStringOptions)]?.gte(requiredOfferUnits),
    };
  };

  // === === === === === === ===

  useEffect(() => {
    if (swapParams && !("error" in swapParams)) {
      if (swapState.action === "direct") {
        dispatch(updateSwapState({ askUnits: swapParams.askUnits }));
      } else {
        dispatch(updateSwapState({ offerUnits: swapParams.offerUnits }));
      }
    }
  }, [swapParams]);

  // === === === === === === ===

  const sendInput = (
    <ExchangeInput
      asset={swapState.offerAsset}
      header={t("sendInputHeader")}
      balance={balances?.assets[swapState.offerAsset.address.toString(toStringOptions)]}
      usdAmount={9.98}
      value={swapState.offerUnits}
      setValue={setOfferUnitsDebounced}
      chooseAssetButtonHandler={openChooseSendAssetModal}
    />
  );

  const receiveInput = (
    <ExchangeInput
      asset={swapState.askAsset}
      header={t("receiveInputHeader")}
      balance={balances && balances.assets[swapState.askAsset.address.toString(toStringOptions)]}
      usdAmount={9.86}
      value={swapState.askUnits}
      setValue={setAskUnitsDebounced}
      chooseAssetButtonHandler={openChooseReceiveAssetModal}
    />
  );

  return (
    <section className="flex w-full max-w-[636px] flex-col gap-8">
      {/* header */}
      <div className="flex flex-col items-start justify-start gap-2">
        <span className="text-4xl font-bold text-light-800">{t("header")}</span>
        <span className="text-base text-light-900">{t("description")}</span>
      </div>
      {/* form */}
      {swapState.offerAsset && swapState.askAsset ? (
        <div className="flex w-full flex-col gap-4">
          {/* inputs */}
          <div className={twMerge("relative flex h-[304px] w-full flex-col gap-2 transition-all duration-500")}>
            {/* send input */}
            <div
              className={twMerge(
                "flex h-fit w-full transition-all duration-200",
                assetsSwapped ? "translate-y-[156px]" : "-translate-y-[0]",
              )}
            >
              {assetsSwapped ? receiveInput : sendInput}
            </div>
            {/* swap assets button */}
            <div
              className={twMerge(
                "absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                "z-10 rounded-full bg-dark-900 text-light-800 transition-all hover:cursor-pointer hover:bg-dark-900",
                assetsSwapped && "rotate-180",
              )}
              onClick={swapAssets}
            >
              <FontAwesomeIcon className="h-4 w-4 rotate-90" icon={faArrowsRotate} />
            </div>
            {/* receive input */}
            <div
              className={twMerge(
                "flex h-fit w-full transition-all duration-200",
                assetsSwapped ? "-translate-y-[156px]" : "translate-y-[0]",
              )}
            >
              {assetsSwapped ? sendInput : receiveInput}
            </div>
          </div>
          {/* end inputs */}
          <SlippageSettings value={swapState.slippageTolerance} setValue={setSlippageTolerance} />
          <SwapButton swapState={swapState} swapParams={swapParams} enoughBalances={isEnoughBalances()} />
          {swapState.offerAsset !== NULL_ASSET &&
            swapState.askAsset !== NULL_ASSET &&
            swapParams &&
            !("error" in swapParams) && <SwapDetails swapState={swapState} swapParams={swapParams} />}
        </div>
      ) : (
        <span>Loading...</span>
      )}
      {/* modals */}
      <ChooseAssetModal
        assets={offerAssets}
        knownAssets={assets}
        visible={chooseOfferAssetVisible}
        setVisible={setChooseOfferAssetVisible}
        setAsset={setOfferAsset}
        balances={balances}
      />
      <ChooseAssetModal
        assets={askAssets}
        knownAssets={assets}
        visible={chooseAskAssetVisible}
        setVisible={setChooseAskAssetVisible}
        setAsset={setAskAsset}
        balances={balances}
      />
    </section>
  );
};

export default SwapForm;
