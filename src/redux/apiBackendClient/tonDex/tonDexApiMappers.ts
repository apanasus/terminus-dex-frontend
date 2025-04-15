import { Address } from "@ton/core";
import BN from "bignumber.js";
import {
  PrepareActivateLiquidityRequestActivateBody,
  PrepareActivateLiquidityRequestActivateBodyOut,
  PrepareProvideSingleSideRequestBody,
  PrepareProvideSingleSideRequestBodyOut,
  ProvideLiquidityAction,
  PrepareProvideRequestBody,
  PrepareProvideRequestBodyOut,
  PrepareRemoveLiquidityRequestBody,
  PrepareRemoveLiquidityRequestBodyOut,
  GetProvideParamsRequestBody,
  GetProvideParamsRequestBodyOut,
  ProvideParams,
  ProvideParamsIn,
  GetSwapParamsRequestBody,
  GetSwapParamsRequestBodyOut,
  SwapParams,
  GetSwapParamsResultIn,
  PrepareCreatePoolRequestBody,
  PrepareCreatePoolRequestBodyOut,
  PrepareRefundLiquidityRequestBodyOut,
  PrepareRefundLiquidityRequestBody,
  AssetsPairs,
  GetSwapParamsSuccessMessageIN,
  SwapTransactionParamsOut,
  SwapTransactionParams,
} from "./tonDexApiTypes";
import { toStringOptions } from "@/lib/utils/tonAddress";
import { ErrorResponseMessage } from "../common/commonTypes";

// === === === === === === ===

/**
 * @swagger
 * /api/v1/ton-dex/swap-params:
 *   post:
 *     summary: Получить параметры свапа
 *     tags: [DEX]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetSwapParamsRequestBody'
 *     responses:
 *       200:
 *         description: Параметры свапа
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SwapParams'
 *       400:
 *         description: Ошибка запроса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
 */

export const getSwapParamsResultInToInner = (
  response: GetSwapParamsSuccessMessageIN | ErrorResponseMessage,
): SwapParams | ErrorResponseMessage => {
  if ("error" in response) {
    return response;
  }

  return {
    askAddress: Address.parse(response.data.ask_address),
    askUnits: new BN(response.data.ask_units),
    feeAddress: Address.parse(response.data.fee_address),
    feePercent: response.data.fee_percent,
    feeUnits: new BN(response.data.fee_units),
    minAskUnits: new BN(response.data.min_ask_units),
    offerAddress: Address.parse(response.data.offer_address),
    offerUnits: new BN(response.data.offer_units),
    poolAddress: Address.parse(response.data.pool_address),
    priceImpact: response.data.price_impact,
    routerAddress: Address.parse(response.data.router_address),
    slippageTolerance: response.data.slippage_tolerance,
    swapRate: new BN(response.data.swap_rate),
    feeMin: new BN(response.data.min_fee),
    feeMax: new BN(response.data.max_fee),
  };
};

// === === === === === === ===

export const getSwapParamsRequestBodyToOut = (body: GetSwapParamsRequestBody): GetSwapParamsRequestBodyOut => {
  return {
    offer_address: body.offerAddress.toString(),
    ask_address: body.askAddress.toString(),
    referral_address: body.referralAddress?.toString(),
    units: body.units.toFixed(),
    slippage_tolerance: body.slippageTolerance,
    swap_type: body.swapType,
  };
};

// === === === === === === ===

export const getProvideParamsRequestBodyToOut = (body: GetProvideParamsRequestBody): GetProvideParamsRequestBodyOut => {
  return {
    first_token_address: body.firstAddress.toString(),
    second_token_address: body.secondAddress.toString(),
    first_token_units: body.firstUnits.toFixed(),
    second_token_units: body.secondUnits.toFixed(),
    slippage_tolerance: body.slippageTolerance,
    is_first_base: body.isFirstBase,
  };
};

// === === === === === === ===

export const getProvideParamsResultInToInner = (result: ProvideParamsIn): ProvideParams => {
  return {
    firstTokenAddress: Address.parse(result.first_token_address),
    secondTokenAddress: Address.parse(result.second_token_address),
    firstTokenUnits: new BN(result.first_token_units),
    secondTokenUnits: new BN(result.second_token_units),
    firstTokenBalance: result.first_token_balance ? new BN(result.first_token_balance) : undefined,
    secondTokenBalance: result.second_token_balance ? new BN(result.second_token_balance) : undefined,
    feeMin: new BN(result.fee_min),
    feeMax: new BN(result.fee_max),
    expectedLpUnits: new BN(result.expected_lp_units),
    minLpOutUnits: new BN(result.min_expected_lp_units),
    estimatedShareOfPool: Number.parseFloat(result.estimated_share_of_pool),
    action: result.action as ProvideLiquidityAction,
    sendTokenAddress: result.send_token_address ? Address.parse(result.send_token_address) : undefined,
    sendUnits: result.send_units ? new BN(result.send_units) : undefined,
    poolAddress: Address.parse(result.pool_address),
  };
};

// === === === === === === ===

export const prepareCreatePoolRequestBodyToOut = (
  body: PrepareCreatePoolRequestBody,
): PrepareCreatePoolRequestBodyOut => {
  return {
    first_token_address: body.firstTokenAddress.toString(),
    second_token_address: body.secondTokenAddress.toString(),
    first_token_units: body.firstTokenUnits.toFixed(),
    second_token_units: body.secondTokenUnits.toFixed(),
  };
};

// === === === === === === ===

export const prepareProvideRequestBodyToOut = (body: PrepareProvideRequestBody): PrepareProvideRequestBodyOut => {
  return {
    first_token_address: body.firstTokenAddress.toString(),
    second_token_address: body.secondTokenAddress.toString(),
    first_token_units: body.firstTokenUnits.toFixed(),
    second_token_units: body.secondTokenUnits.toFixed(),
    min_lp_out_units: body.minLpOutUnits.toFixed(),
  };
};

// === === === === === === ===

export const prepareProvideSingleSideRequestBodyToOut = (
  body: PrepareProvideSingleSideRequestBody,
): PrepareProvideSingleSideRequestBodyOut => {
  return {
    send_token_address: body.sendTokenAddress.toString(),
    second_token_address: body.secondTokenAddress.toString(),
    send_units: body.sendUnits.toFixed(),
    min_lp_out_units: body.minLpOutUnits.toFixed(),
  };
};

// === === === === === === ===

export const prepareActivateLiquidityRequestActivateBodyToOut = (
  body: PrepareActivateLiquidityRequestActivateBody,
): PrepareActivateLiquidityRequestActivateBodyOut => {
  return {
    first_token_address: body.firstTokenAddress.toString(),
    second_token_address: body.secondTokenAddress.toString(),
    first_token_units: body.firstTokenUnits.toFixed(),
    second_token_units: body.secondTokenUnits.toFixed(),
    min_lp_out_units: body.minLpOutUnits.toFixed(),
  };
};

// === === === === === === ===

export const prepareRefundLiquidityRequestBodyToOut = (
  body: PrepareRefundLiquidityRequestBody,
): PrepareRefundLiquidityRequestBodyOut => {
  return {
    first_token_address: body.firstTokenAddress.toString(),
    second_token_address: body.secondTokenAddress.toString(),
  };
};

// === === === === === === ===

export const prepareRemoveLiquidityRequestBodyToOut = (
  body: PrepareRemoveLiquidityRequestBody,
): PrepareRemoveLiquidityRequestBodyOut => {
  return {
    first_token_address: body.firstTokenAddress.toString(),
    second_token_address: body.secondTokenAddress.toString(),
    lp_units: body.lp_units.toFixed(),
  };
};

// === === === === === === ===

export const assetsPairsToMap = (data: AssetsPairs): Map<string, Map<string, boolean>> => {
  const pairsMap = new Map<string, Map<string, boolean>>();
  for (const pair of data) {
    try {
      const firstAddress = Address.parse(pair[0]).toString(toStringOptions);
      const secondAddress = Address.parse(pair[1]).toString(toStringOptions);
      if (!pairsMap.has(firstAddress)) {
        pairsMap.set(firstAddress, new Map<string, boolean>());
      }
      if (!pairsMap.has(secondAddress)) {
        pairsMap.set(secondAddress, new Map<string, boolean>());
      }
      pairsMap.get(firstAddress)?.set(secondAddress, true);
      pairsMap.get(secondAddress)?.set(firstAddress, true);
    } catch (e) {
      continue;
    }
  }
  return pairsMap;
};

// === === === === === === ===

export const swapTransactionParamsToOut = (data: SwapTransactionParams): SwapTransactionParamsOut => {
  return {
    offer_address: data.offerAddress.toString(),
    ask_address: data.askAddress.toString(),
    offer_units: data.offerUnits.toFixed(),
    min_ask_units: data.minAskUnits.toFixed(),
    slippage_tolerance: data.slippageTolerance,
    swap_type: data.swapType,
  };
};
