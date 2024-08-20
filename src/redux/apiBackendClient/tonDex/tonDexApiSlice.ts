import { TonAsset } from "@/types/ton/TonAsset";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Address } from "@ton/core";
import {
  assetInToAsset,
  transformPrepareTransactionMessage as transformPreparedTransactionMessage,
} from "../common/commonMappers";
import { ErrorResponseMessage, TonAssetIn, TransactionData } from "../common/commonTypes";
import {
  assetsPairsToMap,
  getProvideParamsRequestBodyToOut,
  getProvideParamsResultInToInner,
  getSwapParamsRequestBodyToOut,
  getSwapParamsResultInToInner,
  prepareActivateLiquidityRequestActivateBodyToOut,
  prepareCreatePoolRequestBodyToOut,
  prepareProvideRequestBodyToOut,
  prepareProvideSingleSideRequestBodyToOut,
  prepareRefundLiquidityRequestBodyToOut,
  prepareRemoveLiquidityRequestBodyToOut,
  swapTransactionParamsToOut,
} from "./tonDexApiMappers";
import {
  GetProvideParamsRequestBody,
  GetProvideParamsSuccessMessageIn,
  GetSwapParamsRequestBody,
  PrepareActivateLiquidityRequestActivateBody,
  PrepareCreatePoolRequestBody,
  PrepareProvideRequestBody,
  PrepareProvideSingleSideRequestBody,
  PrepareRefundLiquidityRequestBody,
  PrepareRemoveLiquidityRequestBody,
  ProvideParams,
  SwapParams,
  SwapTransactionParams,
} from "./tonDexApiTypes";

// === === === === === === ===

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST;
const BASE_URL = `${BACKEND_URL}/api/v1/ton-dex/`;

// === === === === === === ===

export const tonDexApiV1 = createApi({
  reducerPath: "tonDexApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // === === === === === === ===
    getAllAssets: builder.query<TonAsset[], void>({
      query: () => {
        return {
          url: "assets",
          method: "GET",
        };
      },
      transformResponse: (data: TonAssetIn[]) => {
        return data.map(assetInToAsset);
      },
    }),
    // === === === === === === ===
    findAsset: builder.mutation<TonAsset, Address>({
      query: (address) => {
        return {
          url: `asset/${address.toString()}/find`,
          method: "GET",
        };
      },
      transformResponse: assetInToAsset,
    }),
    // === === === === === === ===
    getSwapParams: builder.query<SwapParams | ErrorResponseMessage, GetSwapParamsRequestBody>({
      query: (body) => {
        return {
          url: "swap/params",
          method: "POST",
          body: getSwapParamsRequestBodyToOut(body),
        };
      },
      transformResponse: getSwapParamsResultInToInner,
    }),
    // === === === === === === ===
    getPreparedSwapTransaction: builder.mutation<TransactionData | ErrorResponseMessage, SwapTransactionParams>({
      query: (body) => {
        return {
          url: "swap/prepare",
          method: "POST",
          body: swapTransactionParamsToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getProvideParams: builder.query<ProvideParams | ErrorResponseMessage, GetProvideParamsRequestBody>({
      query: (body) => {
        return {
          url: "liquidity/params",
          method: "POST",
          body: getProvideParamsRequestBodyToOut(body),
        };
      },
      transformResponse: (response: GetProvideParamsSuccessMessageIn | ErrorResponseMessage) => {
        if ("error" in response) {
          return response;
        }
        return getProvideParamsResultInToInner(response.data);
      },
    }),
    // === === === === === === ===
    getPreparedCreatePoolTransaction: builder.mutation<
      TransactionData | ErrorResponseMessage,
      PrepareCreatePoolRequestBody
    >({
      query: (body) => {
        return {
          url: "liquidity/create-pool",
          method: "POST",
          body: prepareCreatePoolRequestBodyToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getPreparedProvideTransaction: builder.mutation<TransactionData | ErrorResponseMessage, PrepareProvideRequestBody>({
      query: (body) => {
        return {
          url: "liquidity/provide",
          method: "POST",
          body: prepareProvideRequestBodyToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getPreparedProvideSingleSideTransaction: builder.mutation<
      TransactionData | ErrorResponseMessage,
      PrepareProvideSingleSideRequestBody
    >({
      query: (body) => {
        return {
          url: "liquidity/provide-single-side",
          method: "POST",
          body: prepareProvideSingleSideRequestBodyToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getPreparedActivateLiquidityTransaction: builder.mutation<
      TransactionData | ErrorResponseMessage,
      PrepareActivateLiquidityRequestActivateBody
    >({
      query: (body) => {
        return {
          url: "liquidity/activate",
          method: "POST",
          body: prepareActivateLiquidityRequestActivateBodyToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getPreparedRefundLiquidityTransaction: builder.mutation<
      TransactionData | ErrorResponseMessage,
      PrepareRefundLiquidityRequestBody
    >({
      query: (body) => {
        return {
          url: "liquidity/refund",
          method: "POST",
          body: prepareRefundLiquidityRequestBodyToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getPreparedRemoveLiquidityTransaction: builder.mutation<
      TransactionData | ErrorResponseMessage,
      PrepareRemoveLiquidityRequestBody
    >({
      query: (body) => {
        return {
          url: "liquidity/remove",
          method: "POST",
          body: prepareRemoveLiquidityRequestBodyToOut(body),
        };
      },
      transformResponse: transformPreparedTransactionMessage,
    }),
    // === === === === === === ===
    getAssetsPairs: builder.query<Map<string, Map<string, boolean>>, undefined>({
      query: () => {
        return {
          url: "assets/pairs",
          method: "GET",
        };
      },
      transformResponse: assetsPairsToMap,
    }),
  }),
});

// === === === === === === ===

export const {
  useFindAssetMutation,
  useGetAllAssetsQuery,
  useGetSwapParamsQuery,
  useGetPreparedSwapTransactionMutation,
  useGetProvideParamsQuery,
  useGetPreparedCreatePoolTransactionMutation,
  useGetPreparedProvideTransactionMutation,
  useGetPreparedProvideSingleSideTransactionMutation,
  useGetPreparedActivateLiquidityTransactionMutation,
  useGetPreparedRefundLiquidityTransactionMutation,
  useGetPreparedRemoveLiquidityTransactionMutation,
  useGetAssetsPairsQuery,
} = tonDexApiV1;

// === === === === === === ===

export default tonDexApiV1;

// === === === === === === ===
