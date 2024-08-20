import { NULL_ASSET } from "@/constants";
import { toStringOptions } from "@/lib/utils/tonAddress";
import { TonAsset } from "@/types/ton/TonAsset";
import { TonDexPool } from "@/types/ton/TonDexPool";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BN from "bignumber.js";
import { SwapType } from "../apiBackendClient/tonDex/tonDexApiTypes";

// === === === === === === ===

export type SwapState = {
  offerAsset: TonAsset;
  askAsset: TonAsset;
  offerUnits: BN;
  askUnits: BN;
  slippageTolerance: number;
  priceImpact: number;
  rate: number;
  minReceived: BN;
  fee: BN;
  action: SwapType;
};

export type SwapStateUpdate = {
  offerAsset?: TonAsset;
  askAsset?: TonAsset;
  offerUnits?: BN;
  askUnits?: BN;
  slippageTolerance?: number;
  priceImpact?: number;
  rate?: number;
  minReceived?: BN;
  fee?: BN;
  action?: SwapType;
};

// === === === === === === ===

export type ProvideLiquidityState = {
  firstAsset: TonAsset;
  secondAsset: TonAsset;
  firstUnits: BN;
  secondUnits: BN;
  share: number;
  slippageTolerance: number;
  fee: BN;
};

export type ProvideLiquidityStateUpdate = {
  firstAsset?: TonAsset;
  secondAsset?: TonAsset;
  firstUnits?: BN;
  secondUnits?: BN;
  share?: number;
  slippageTolerance?: number;
  fee?: BN;
};

// === === === === === === ===

export type DexState = {
  swapState: SwapState;
  provideLiquidityState: ProvideLiquidityState;
  assets: { [key: string]: TonAsset };
  userAssets: { [key: string]: TonAsset }; // key is asset minter address
  assetsPairs: Map<string, Map<string, boolean>>;
  pools: TonDexPool[];
  poolsMap: Map<string, Map<string, TonDexPool>>;
};

// === === === === === === ===

const initialState: DexState = {
  swapState: {
    offerAsset: NULL_ASSET,
    askAsset: NULL_ASSET,
    offerUnits: new BN(0),
    askUnits: new BN(0),
    slippageTolerance: 0.5,
    priceImpact: 0,
    rate: 0,
    minReceived: new BN(0),
    fee: new BN(0),
    action: "direct",
  },
  provideLiquidityState: {
    firstAsset: NULL_ASSET,
    secondAsset: NULL_ASSET,
    firstUnits: new BN(0),
    secondUnits: new BN(0),
    share: 0,
    slippageTolerance: 0.5,
    fee: new BN(0),
  },
  userAssets: {},
  assets: {},
  assetsPairs: new Map(),
  pools: [],
  poolsMap: new Map(),
};

// === === === === === === ===

export const dexState = createSlice({
  name: "dexState",
  initialState,
  reducers: {
    updateSwapState: (state, action: PayloadAction<SwapStateUpdate>) => {
      state.swapState = { ...state.swapState, ...action.payload };
    },
    updateProvideLiquidityState: (state, action: PayloadAction<ProvideLiquidityStateUpdate>) => {
      state.provideLiquidityState = { ...state.provideLiquidityState, ...action.payload };
    },
    updateProvideFirstUnits: (state, action: PayloadAction<BN>) => {
      if (action.payload.eq(state.provideLiquidityState.firstUnits)) return;
      state.provideLiquidityState.firstUnits = action.payload;
    },
    updateProvideSecondUnits: (state, action: PayloadAction<BN>) => {
      if (action.payload.eq(state.provideLiquidityState.secondUnits)) return;
      state.provideLiquidityState.secondUnits = action.payload;
    },
    updateUserAssets: (state, action: PayloadAction<TonAsset>) => {
      if (state.assets[action.payload.address.toString(toStringOptions)]) return;
      state.userAssets[action.payload.address.toString(toStringOptions)] = action.payload;
    },
    updateAssets: (state, action: PayloadAction<{ [key: string]: TonAsset }>) => {
      state.assets = action.payload;
    },
    updateAssetsPairs: (state, action: PayloadAction<Map<string, Map<string, boolean>>>) => {
      state.assetsPairs = action.payload;
    },
  },
});

// === === === === === === ===

export const {
  updateSwapState,
  updateProvideLiquidityState,
  updateUserAssets,
  updateAssets,
  updateAssetsPairs,
  updateProvideFirstUnits,
  updateProvideSecondUnits,
} = dexState.actions;

// === === === === === === ===

export const selectDexState = (state: { dexState: DexState }) => state.dexState;
export const selectSwapState = (state: { dexState: DexState }) => state.dexState.swapState;
export const selectProvideLiquidityState = (state: { dexState: DexState }) => state.dexState.provideLiquidityState;
export const selectUserAssets = (state: { dexState: DexState }) => state.dexState.userAssets;
export const selectAssets = (state: { dexState: DexState }) => state.dexState.assets;
export const selectAssetsPairs = (state: { dexState: DexState }) => state.dexState.assetsPairs;

export const selectAllAssets = (state: { dexState: DexState }) => {
  return { ...state.dexState.assets, ...state.dexState.userAssets };
};

// === === === === === === ===

export default dexState.reducer;

// === === === === === === ===
