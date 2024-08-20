import { Address } from "@ton/core";
import BN from "bignumber.js";
import { SuccessResponseMessage, TransactionDataIn } from "../common/commonTypes";

// === === === === === === ===

export type SwapType = "direct" | "reverse";
export type ProvideLiquidityAction =
  | "provide"
  | "provide_second"
  | "provide_additional"
  | "direct_add_provide"
  | "create_pool";

// === === === === === === ===

export interface GetSwapParamsRequestBody {
  offerAddress: Address;
  askAddress: Address;
  referralAddress?: Address;
  units: BN;
  slippageTolerance: number;
  swapType: SwapType;
}

export interface GetSwapParamsRequestBodyOut {
  offer_address: string;
  ask_address: string;
  referral_address?: string;
  units: string;
  slippage_tolerance: number;
  swap_type: string;
}

// === === === === === === ===

export interface GetSwapParamsResultIn {
  ask_address: string;
  ask_units: string;
  fee_address: string;
  fee_percent: number;
  fee_units: number;
  min_ask_units: string;
  offer_address: string;
  offer_units: string;
  pool_address: string;
  price_impact: number;
  router_address: string;
  slippage_tolerance: number;
  swap_rate: string;
  min_fee: string;
  max_fee: string;
}

export interface SwapParams {
  askAddress: Address;
  askUnits: BN;
  feeAddress: Address;
  feePercent: number;
  feeUnits: BN;
  minAskUnits: BN;
  offerAddress: Address;
  offerUnits: BN;
  poolAddress: Address;
  priceImpact: number;
  routerAddress: Address;
  slippageTolerance: number;
  swapRate: BN;
  feeMin: BN;
  feeMax: BN;
}

// === === === === === === ===

export interface SwapTransactionParams {
  offerAddress: Address;
  askAddress: Address;
  offerUnits: BN;
  minAskUnits: BN;
  slippageTolerance: number;
  swapType: SwapType;
}

export interface SwapTransactionParamsOut {
  offer_address: string;
  ask_address: string;
  offer_units: string;
  min_ask_units: string;
  slippage_tolerance: number;
  swap_type: string;
}

// === === === === === === ===

export interface GetSwapParamsSuccessMessageIN {
  code: number;
  data: GetSwapParamsResultIn;
}

// === === === === === === ===

export interface GetProvideParamsRequestBody {
  firstAddress: Address;
  secondAddress: Address;
  firstUnits: BN;
  secondUnits: BN;
  slippageTolerance: number;
  isFirstBase: boolean;
}

export interface GetProvideParamsRequestBodyOut {
  first_token_address: string;
  second_token_address: string;
  first_token_units: string;
  second_token_units: string;
  slippage_tolerance: number;
  is_first_base: boolean;
}

// === === === === === === ===

export interface ProvideParamsIn {
  action: string;
  first_token_address: string;
  second_token_address: string;
  first_token_units: string;
  second_token_units: string;
  first_token_balance?: string;
  second_token_balance?: string;
  fee_min: string;
  fee_max: string;
  expected_lp_units: string;
  min_expected_lp_units: string;
  estimated_share_of_pool: string;
  send_token_address?: string;
  send_units?: string;
  pool_address: string;
  lp_account_address?: string;
}

export interface ProvideParams {
  action: ProvideLiquidityAction;
  firstTokenAddress: Address;
  secondTokenAddress: Address;
  firstTokenUnits: BN;
  secondTokenUnits: BN;
  firstTokenBalance?: BN;
  secondTokenBalance?: BN;
  feeMin: BN;
  feeMax: BN;
  expectedLpUnits: BN;
  minLpOutUnits: BN;
  estimatedShareOfPool: number;
  sendTokenAddress?: Address;
  sendUnits?: BN;
  poolAddress: Address;
  lpAccountAddress?: Address;
}

export interface GetProvideParamsSuccessMessageIn extends SuccessResponseMessage {
  data: ProvideParamsIn;
}

// === === === === === === ===

export interface PrepareCreatePoolRequestBody {
  firstTokenAddress: Address;
  secondTokenAddress: Address;
  firstTokenUnits: BN;
  secondTokenUnits: BN;
}

export interface PrepareCreatePoolRequestBodyOut {
  first_token_address: string;
  second_token_address: string;
  first_token_units: string;
  second_token_units: string;
}

// === === === === === === ===

export interface PrepareProvideRequestBody {
  firstTokenAddress: Address;
  secondTokenAddress: Address;
  firstTokenUnits: BN;
  secondTokenUnits: BN;
  minLpOutUnits: BN;
}

export interface PrepareProvideRequestBodyOut {
  first_token_address: string;
  second_token_address: string;
  first_token_units: string;
  second_token_units: string;
  min_lp_out_units: string;
}

// === === === === === === ===

export interface PrepareProvideSingleSideRequestBody {
  sendTokenAddress: Address;
  secondTokenAddress: Address;
  sendUnits: BN;
  minLpOutUnits: BN;
}

export interface PrepareProvideSingleSideRequestBodyOut {
  send_token_address: string;
  second_token_address: string;
  send_units: string;
  min_lp_out_units: string;
}

// === === === === === === ===

export interface PrepareActivateLiquidityRequestActivateBody {
  firstTokenAddress: Address;
  secondTokenAddress: Address;
  firstTokenUnits: BN;
  secondTokenUnits: BN;
  minLpOutUnits: BN;
}

export interface PrepareActivateLiquidityRequestActivateBodyOut {
  first_token_address: string;
  second_token_address: string;
  first_token_units: string;
  second_token_units: string;
  min_lp_out_units: string;
}

// === === === === === === ===

export interface PrepareRemoveLiquidityRequestBody {
  firstTokenAddress: Address;
  secondTokenAddress: Address;
  lp_units: BN;
}

export interface PrepareRemoveLiquidityRequestBodyOut {
  first_token_address: string;
  second_token_address: string;
  lp_units: string;
}

// === === === === === === ===

export interface PrepareRefundLiquidityRequestBody {
  firstTokenAddress: Address;
  secondTokenAddress: Address;
}

export interface PrepareRefundLiquidityRequestBodyOut {
  first_token_address: string;
  second_token_address: string;
}

// === === === === === === ===

export type AssetsPair = [string, string];

export type AssetsPairs = AssetsPair[];

// === === === === === === ===
