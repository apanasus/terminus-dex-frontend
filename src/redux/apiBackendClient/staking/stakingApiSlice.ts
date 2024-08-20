import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StakePool, StakePoolData, StakePoolDataIn, StakePoolIn } from "./stakingApiTypes";
import { poolInToPool, poolStakeDataInToPoolStakeData } from "./stakingApiMappes";

// === === === === === === ===

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST;
const BASE_URL = `${BACKEND_URL}/api/v1/ton-staking/`;

// === === === === === === ===

export const tonStakingApiV1 = createApi({
  reducerPath: "tonStakingApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // === === === === === === ===
    getPools: builder.query<StakePool[], void>({
      query: () => {
        return {
          url: "pools",
          method: "GET",
        };
      },
      transformResponse: (response: StakePoolIn[]) => {
        return response.map((pool) => poolInToPool(pool));
      },
    }),
    // === === === === === === ===
    getPoolStakeData: builder.query<StakePoolData, string>({
      query: (address) => {
        return {
          url: `pool/${address}/data`,
          method: "GET",
        };
      },
      transformResponse: (response: StakePoolDataIn) => {
        return poolStakeDataInToPoolStakeData(response);
      },
    }),
    // === === === === === === ===
  }),
});

// === === === === === === ===

export const { useGetPoolsQuery, useGetPoolStakeDataQuery } = tonStakingApiV1;
