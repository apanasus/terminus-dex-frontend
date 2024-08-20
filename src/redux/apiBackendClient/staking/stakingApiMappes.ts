import { Address } from "@ton/core";
import { assetInToAsset } from "../common/commonMappers";
import { StakePool, StakePoolData, StakePoolDataIn, StakePoolIn } from "./stakingApiTypes";
import BN from "bignumber.js";

// === === === === === === ===

export const poolInToPool = (pool: StakePoolIn): StakePool => {
  return {
    address: Address.parse(pool.address),
    inAsset: assetInToAsset(pool.in_asset),
    outAsset: assetInToAsset(pool.out_asset),
    minOfferAmount: new BN(pool.min_offer_amount),
    fees: pool.fees,
    apy: pool.apy,
    isActive: pool.is_active,
  };
};

// === === === === === === ===

export const poolStakeDataInToPoolStakeData = (pool: StakePoolDataIn): StakePoolData => {
  return {
    address: Address.parse(pool.address),
    price: pool.price,
    isActive: pool.is_active,
  };
};

// === === === === === === ===
