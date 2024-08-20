"use client";

// === === === === === === ===

import FormWarning from "@/components/common/form/FormWarning/FormWarning";
import SlippageSettings from "@/components/common/slippageSettings/SlippageSettings";
import ChooseAssetModal from "@/components/modals/chooseAssetModal/ChooseAssetModal";
import { NULL_ASSET, TON_ADDRESS } from "@/constants";
import { useAllAssets } from "@/hooks/useAssets";
import { useAssetsQueryParams } from "@/hooks/useAssetsQueryParams";
import { useBalances } from "@/hooks/useBalances";
import { useDebounce } from "@/hooks/useDebounce";
import { isNullAsset } from "@/lib/utils/asset";
import { BN_ZERO } from "@/lib/utils/bignumber";
import { toStringOptions } from "@/lib/utils/tonAddress";
import { useGetProvideParamsQuery } from "@/redux/apiBackendClient/tonDex/tonDexApiSlice";
import {
  selectAllAssets,
  selectAssetsPairs,
  selectProvideLiquidityState,
  selectUserAssets,
  updateProvideFirstUnits,
  updateProvideLiquidityState,
  updateProvideSecondUnits,
} from "@/redux/slices/dexSlice";
import { TonAsset } from "@/types/ton/TonAsset";
import BN from "bignumber.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LiquidityDetails from "./LiquidityDetails";
import LiquidityInputs from "./LiquidityInputs";
import ProvideButton from "./ProvideButton";

// === === === === === === ===

type AddLiquidityFormProps = {};

// === === === === === === ===

const AddLiquidityForm = (props: AddLiquidityFormProps) => {
  // === === === === === === ===
  const t = useTranslations("LiquidityFormComponent");
  const dispatch = useDispatch();

  const balances = useBalances();
  useAllAssets();

  const provideLiquidityState = useSelector(selectProvideLiquidityState, shallowEqual);
  const assets = useSelector(selectAllAssets, shallowEqual);
  const assetsPairs = useSelector(selectAssetsPairs);
  const userAssets = useSelector(selectUserAssets, shallowEqual);

  const [isFirstBase, setIsFirstBase] = useState(true);

  // === === === === === === ===

  const { data: provideParams, isLoading } = useGetProvideParamsQuery(
    {
      firstAddress: provideLiquidityState.firstAsset.address,
      secondAddress: provideLiquidityState.secondAsset.address,
      firstUnits: isFirstBase ? provideLiquidityState.firstUnits : BN_ZERO,
      secondUnits: !isFirstBase ? provideLiquidityState.secondUnits : BN_ZERO,
      slippageTolerance: provideLiquidityState.slippageTolerance,
      isFirstBase: isFirstBase,
    },
    {
      skip:
        (provideLiquidityState.firstAsset.address.equals(NULL_ASSET.address) &&
          provideLiquidityState.firstAsset.symbol !== "TON") ||
        (provideLiquidityState.secondAsset.address.equals(NULL_ASSET.address) &&
          provideLiquidityState.secondAsset.symbol !== "TON"),

      selectFromResult: ({ data, isLoading }) => ({ data, isLoading }),
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000 * 60,
    },
  );

  // === === === === === === ===

  const setFirstAsset = (asset: TonAsset) => {
    dispatch(updateProvideLiquidityState({ firstAsset: asset }));
  };
  const setSecondAsset = (asset: TonAsset) => {
    dispatch(updateProvideLiquidityState({ secondAsset: asset }));
  };

  const setFirstUnits = (units: BN) => {
    dispatch(updateProvideFirstUnits(units));
    setIsFirstBase(true);
  };
  const setFirstUnitsDebounced = useDebounce(setFirstUnits, 500);
  const setSecondUnits = (units: BN) => {
    dispatch(updateProvideSecondUnits(units));
    setIsFirstBase(false);
  };
  const setSecondUnitsDebounced = useDebounce(setSecondUnits, 500);

  const setSlippageTolerance = (slippageTolerance: string) => {
    dispatch(updateProvideLiquidityState({ slippageTolerance: Number.parseFloat(slippageTolerance) }));
  };

  // === === === === === === ===

  useAssetsQueryParams({
    firstAsset: provideLiquidityState.firstAsset,
    setFirstAsset: setFirstAsset,
    secondAsset: provideLiquidityState.secondAsset,
    setSecondAsset: setSecondAsset,
  });

  // === === === === === === ===

  const [knownAssets, setKnownAssets] = useState<{ [key: string]: TonAsset }>({});
  const [firstAssets, setFirstAssets] = useState<TonAsset[]>([]);
  const [secondAssets, setSecondAssets] = useState<TonAsset[]>([]);

  useEffect(() => {
    if (
      !isNullAsset(provideLiquidityState.firstAsset) &&
      !isNullAsset(provideLiquidityState.secondAsset) &&
      (provideLiquidityState.firstAsset.address.equals(provideLiquidityState.secondAsset.address) ||
        !secondAssets.includes(provideLiquidityState.secondAsset))
    ) {
      setSecondAsset(secondAssets.length > 0 ? secondAssets[0] : NULL_ASSET);
    }
  }, [provideLiquidityState.firstAsset, secondAssets]);

  useEffect(() => {
    const newKnownAssets = { ...assets, ...userAssets };
    setKnownAssets(newKnownAssets);

    const newFirstAssets = [...Object.values(newKnownAssets)];
    setFirstAssets(newFirstAssets);

    const newSecondAssets = newFirstAssets.filter(
      (asset) =>
        !asset.address.equals(provideLiquidityState.firstAsset.address) &&
        assetsPairs
          .get(provideLiquidityState.firstAsset.address.toString(toStringOptions))
          ?.get(asset.address.toString(toStringOptions)) === true,
    );
    setSecondAssets(newSecondAssets);
  }, [provideLiquidityState.firstAsset, userAssets, assets, assetsPairs]);

  // === === === === === === ===

  const [chooseFirstAssetVisible, setChooseFirstAssetVisible] = useState(false);
  const [chooseSecondAssetVisible, setChooseSecondAssetVisible] = useState(false);

  const openChooseFirstAssetModal = () => {
    setChooseFirstAssetVisible(true);
  };
  const openChooseSecondAssetModal = () => {
    setChooseSecondAssetVisible(true);
  };

  // === === === === === === ===

  const isEnoughBalances = () => {
    if (
      !provideParams ||
      "error" in provideParams ||
      !balances ||
      isNullAsset(provideLiquidityState.firstAsset) ||
      isNullAsset(provideLiquidityState.secondAsset)
    ) {
      return {
        ton: false,
        firstAsset: false,
        secondAsset: false,
      };
    }

    let requiredTons = provideParams.feeMax;
    let requiredFirstUnits = provideLiquidityState.firstUnits;
    let requiredSecondUnits = provideLiquidityState.secondUnits;

    if (
      provideParams.action in ["provide_second", "provide_additional"] &&
      provideParams.sendTokenAddress &&
      provideParams.sendUnits
    ) {
      if (provideParams.sendTokenAddress === provideLiquidityState.firstAsset.address) {
        requiredFirstUnits = requiredFirstUnits.plus(provideParams.sendUnits);
      } else if (provideParams.sendTokenAddress === provideLiquidityState.secondAsset.address) {
        requiredSecondUnits = requiredSecondUnits.plus(provideParams.sendUnits);
      }
    } else if (provideParams.action === "direct_add_provide") {
      requiredFirstUnits = new BN(0);
      requiredSecondUnits = new BN(0);
    }

    if (provideLiquidityState.firstAsset.address.equals(TON_ADDRESS)) {
      requiredTons = requiredTons.plus(requiredFirstUnits);
      requiredFirstUnits = requiredTons;
    } else if (provideLiquidityState.secondAsset.address.equals(TON_ADDRESS)) {
      requiredTons = requiredTons.plus(requiredSecondUnits);
      requiredSecondUnits = requiredTons;
    }

    return {
      ton: balances.ton.gte(requiredTons),
      firstAsset:
        balances.assets[provideLiquidityState.firstAsset.address.toString(toStringOptions)]?.gte(requiredFirstUnits),
      secondAsset:
        balances.assets[provideLiquidityState.secondAsset.address.toString(toStringOptions)]?.gte(requiredSecondUnits),
    };
  };

  // === === === === === === ===

  useEffect(() => {
    if (!provideParams || "error" in provideParams || provideParams.action === "create_pool") return;

    dispatch(
      updateProvideLiquidityState({
        firstUnits: provideParams.firstTokenUnits,
        secondUnits: provideParams.secondTokenUnits,
      }),
    );
  }, [provideParams]);

  // === === === === === === ===

  return (
    <section className="flex w-full max-w-[636px] flex-col gap-8">
      {/* header */}
      <div className="flex flex-col items-start justify-start gap-2">
        <span className="text-4xl font-bold text-light-800">{t("header")}</span>
        <span className="text-base text-light-900">{t("description")}</span>
      </div>
      {/* form */}
      {provideLiquidityState.firstAsset && provideLiquidityState.secondAsset ? (
        <div className="flex w-full flex-col gap-4">
          <LiquidityInputs
            provideLiquidityState={provideLiquidityState}
            balances={balances}
            setFirstUnits={setFirstUnitsDebounced}
            setSecondUnits={setSecondUnitsDebounced}
            openChooseFirstAssetModal={openChooseFirstAssetModal}
            openChooseSecondAssetModal={openChooseSecondAssetModal}
          />
          {provideParams && !("error" in provideParams) && provideParams.action !== "create_pool" && (
            <SlippageSettings value={provideLiquidityState.slippageTolerance} setValue={setSlippageTolerance} />
          )}
          {provideParams && !("error" in provideParams) && provideParams.action === "create_pool" && (
            <FormWarning
              text={t("createPoolMessage", {
                0: provideLiquidityState.firstAsset.symbol,
                1: provideLiquidityState.secondAsset.symbol,
              })}
            />
          )}
          <ProvideButton
            provideLiquidityState={provideLiquidityState}
            provideParams={provideParams}
            enoughBalances={isEnoughBalances()}
          />
          {provideParams && !("error" in provideParams) && (
            <LiquidityDetails provideLiquidityState={provideLiquidityState} provideParams={provideParams} />
          )}
        </div>
      ) : (
        <span>Loading...</span>
      )}
      {/* modals */}
      <ChooseAssetModal
        assets={firstAssets}
        knownAssets={knownAssets}
        visible={chooseFirstAssetVisible}
        setVisible={setChooseFirstAssetVisible}
        setAsset={setFirstAsset}
        balances={balances}
        findAssetEnabled={true}
      />
      <ChooseAssetModal
        assets={secondAssets}
        knownAssets={knownAssets}
        visible={chooseSecondAssetVisible}
        setVisible={setChooseSecondAssetVisible}
        setAsset={setSecondAsset}
        balances={balances}
        findAssetEnabled={true}
      />
    </section>
  );
};

// === === === === === === ===

export default AddLiquidityForm;
