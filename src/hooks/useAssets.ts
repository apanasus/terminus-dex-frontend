import { toStringOptions } from "@/lib/utils/tonAddress";
import { useGetAllAssetsQuery, useGetAssetsPairsQuery } from "@/redux/apiBackendClient/tonDex/tonDexApiSlice";
import { updateAssets, updateAssetsPairs } from "@/redux/slices/dexSlice";
import { TonAsset } from "@/types/ton/TonAsset";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// === === === === === === ===

export function useAllAssets() {
  const dispatch = useDispatch();

  const { data: assets } = useGetAllAssetsQuery(undefined, {
    selectFromResult: ({ data }) => ({ data }),
    refetchOnMountOrArgChange: true,
  });
  const { data: pairs } = useGetAssetsPairsQuery(undefined, {
    selectFromResult: ({ data }) => ({ data }),
    refetchOnMountOrArgChange: true,
  });

  // === === === === === === ===

  useEffect(() => {
    if (!assets) return;

    const newAssets: { [key: string]: TonAsset } = assets.reduce((acc, asset) => {
      acc[asset.address.toString(toStringOptions)] = asset;
      return acc;
    }, Object.create({}));

    dispatch(updateAssets(newAssets));
  }, [assets]);

  useEffect(() => {
    if (!pairs) return;

    dispatch(updateAssetsPairs(pairs));
  }, [pairs]);
}

// === === === === === === ===
