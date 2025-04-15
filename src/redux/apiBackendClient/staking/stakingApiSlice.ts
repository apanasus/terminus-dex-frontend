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
 *   description: API для работы со стейкингом
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
     *     summary: Получить список пулов для стейкинга
     *     tags: [Staking]
     *     responses:
     *       200:
     *         description: Список пулов
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/StakePool'
     *       400:
     *         description: Ошибка запроса
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
     *     summary: Получить данные конкретного пула
     *     tags: [Staking]
     *     parameters:
     *       - in: path
     *         name: address
     *         required: true
     *         schema:
     *           type: string
     *         description: Адрес пула
     *     responses:
     *       200:
     *         description: Данные пула
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/StakePoolData'
     *       400:
     *         description: Ошибка запроса
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
