import { Address } from "@ton/core";

// === === === === === === ===

export type AssetTag = "HOT" | "NEW" | "Community" | "Deprecated" | "Popular";

// === === === === === === ===

export interface TonAsset {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  iconUrl: string;
  isCommunity: boolean;
  isDeprecated: boolean;
  isBlacklisted: boolean;
  tags?: AssetTag[];
}

// === === === === === === ===
