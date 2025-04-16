import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StakePool, StakePoolData, StakePoolDataIn, StakePoolIn } from "./stakingApiTypes";
import { poolInToPool, poolStakeDataInToPoolStakeData } from "./stakingApiMappes";

// === === === === === === ===

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST;
const BASE_URL = `${BACKEND_URL}/api/v1/ton-staking/`;

// === === === === === === ===

/**
 * @swagger
 * tags:
 *   name: Staking
 *   description: API for working with staking
 */
export const tonStakingApiV1 = createApi({
  reducerPath: "tonStakingApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    /**
     * @swagger
     * /api/v1/ton-staking/pools:
     *   get:
     *     summary: Get a list of staking pools
     *     tags: [Staking]
     *     responses:
     *       200:
     *         description: List of pools
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/StakePool'
     *       400:
     *         description: Request Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponseMessage'
     */
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

    /**
     * @swagger
     * /api/v1/ton-staking/pool/{address}/data:
     *   get:
     *     summary: Get data for a specific pool
     *     tags: [Staking]
     *     parameters:
     *       - in: path
     *         name: address
     *         required: true
     *         schema:
     *           type: string
     *         description: Pool address
     *     responses:
     *       200:
     *         description: Pool data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/StakePoolData'
     *       400:
     *         description: Request Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponseMessage'
     */
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
  }),
});

// === === === === === === ===

export const { useGetPoolsQuery, useGetPoolStakeDataQuery } = tonStakingApiV1;
