import { Address } from "@ton/core";
import { TonAsset, TonAssetIn } from "../common/commonTypes";
import BN from "bignumber.js";

// === === === === === === ===

export interface StakePoolIn {
  address: string;
  in_asset: TonAssetIn;
  out_asset: TonAssetIn;
  min_offer_amount: number;
  fees: number;
  apy: number;
  is_active: boolean;
}

// === === === === === === ===

export interface StakePool {
  address: Address;
  inAsset: TonAsset;
  outAsset: TonAsset;
  minOfferAmount: BN;
  fees: number;
  apy: number;
  isActive: boolean;
}

// === === === === === === ===

export interface StakePoolDataIn {
  address: string;
  price: number;
  is_active: boolean;
}

// === === === === === === ===

export interface StakePoolData {
  address: Address;
  price: number;
  isActive: boolean;
}

// === === === === === === ===
