import { isNullAsset } from "@/lib/utils/asset";
import { isValidNumber } from "@/lib/utils/bignumber";
import { printCoins } from "@/lib/utils/coins";
import { isValidAddress, toStringOptions } from "@/lib/utils/tonAddress";
import { usePathname, useRouter } from "@/navigation";
import {
  selectAllAssets,
  selectProvideLiquidityState,
  updateProvideFirstUnits,
  updateProvideLiquidityState,
  updateProvideSecondUnits,
} from "@/redux/slices/dexSlice";
import { TonAsset } from "@/types/ton/TonAsset";
import { Address } from "@ton/core";
import BN from "bignumber.js";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// === === === === === === ===

const FIRST_ASSET_KEY = "fa";
const SECOND_ASSET_KEY = "sa";
const FIRST_AMOUNT_KEY = "faa";
const SECOND_AMOUNT_KEY = "saa";

// === === === === === === ===

export type Props = {
  firstAsset: TonAsset;
  setFirstAsset: (asset: TonAsset) => void;
  secondAsset: TonAsset;
  setSecondAsset: (asset: TonAsset) => void;
  firstUnits?: BN;
  setFirstUnits?: (units: BN) => void;
  secondUnits?: BN;
  setSecondUnits?: (units: BN) => void;
};

export const useAssetsQueryParams = ({
  firstAsset,
  secondAsset,
  firstUnits,
  secondUnits,
  setFirstAsset,
  setSecondAsset,
  setFirstUnits,
  setSecondUnits,
}: Props) => {
  // const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const provideLiquidityState = useSelector(selectProvideLiquidityState, shallowEqual);
  const assets = useSelector(selectAllAssets, shallowEqual);

  // === === === === === === ===

  useEffect(() => {
    if (!searchParams || !assets) return;

    let firstAssetAddress = searchParams.get(FIRST_ASSET_KEY);
    let secondAssetAddress = searchParams.get(SECOND_ASSET_KEY);
    let newFirstAmount = searchParams.get(FIRST_AMOUNT_KEY);
    let newSecondAmount = searchParams.get(SECOND_AMOUNT_KEY);

    if (firstAssetAddress && isValidAddress(firstAssetAddress)) {
      const newFirstAsset = assets[Address.parse(firstAssetAddress).toString(toStringOptions)];
      if (newFirstAsset) {
        setFirstAsset(newFirstAsset);
        if (newFirstAmount && isValidNumber(newFirstAmount) && setFirstUnits) {
          setFirstUnits(new BN(newFirstAmount).multipliedBy(10 ** newFirstAsset.decimals));
        }
      }
    }
    if (secondAssetAddress && isValidAddress(secondAssetAddress)) {
      const secondAsset = assets[Address.parse(secondAssetAddress).toString(toStringOptions)];
      if (secondAsset) {
        setSecondAsset(secondAsset);
        if (newSecondAmount && isValidNumber(newSecondAmount) && setSecondUnits) {
          setSecondUnits(new BN(newSecondAmount).multipliedBy(10 ** secondAsset.decimals));
        }
      }
    }
  }, [searchParams, assets]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (!isNullAsset(firstAsset)) queryParams.set(FIRST_ASSET_KEY, firstAsset.address.toString(toStringOptions));
    if (!isNullAsset(secondAsset)) queryParams.set(SECOND_ASSET_KEY, secondAsset.address.toString(toStringOptions));
    if (firstUnits && !firstUnits.isZero())
      queryParams.set(FIRST_AMOUNT_KEY, printCoins(firstUnits, firstAsset.decimals));
    if (secondUnits && !secondUnits.isZero())
      queryParams.set(SECOND_AMOUNT_KEY, printCoins(secondUnits, secondAsset.decimals));
    if (queryParams.toString().length > 0) router.push(pathname + "?" + queryParams.toString(), { scroll: false });
  }, [firstAsset, secondAsset, firstUnits, secondUnits]);
};
