import { Address } from "@ton/core";
import { TonAsset } from "./types/ton/TonAsset";

// === === === === === === ===

export const TON_ADDRESS = Address.parse("0:0000000000000000000000000000000000000000000000000000000000000000");

export const NULL_ASSET: TonAsset = {
  address: TON_ADDRESS,
  name: "Select ...",
  symbol: "Select ...",
  decimals: 9,
  iconUrl: "/static/images/icons/unknown-token.png",
  isCommunity: false,
  isDeprecated: false,
  isBlacklisted: false,
  tags: [],
};

// === === === === === === ===
