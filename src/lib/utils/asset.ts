import { TON_ADDRESS } from "@/constants";
import { TonAsset } from "@/types/ton/TonAsset";

// === === === === === === ===

export const isNullAsset = (asset: TonAsset) => {
  return asset.symbol === "Select ..." && asset.address.equals(TON_ADDRESS);
};
