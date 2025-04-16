import { Balances } from "@/types/ton/TonBalances";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorResponseMessage, SuccessResponseMessage } from "../common/commonTypes";
import { AuthLoginRequest, AuthPayloadResponse } from "./accountApiTypes";
import { balancesInToBalances } from "./accountMappers";

// === === === === === === ===

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST;
const BASE_URL = `${BACKEND_URL}/api/v1/account/`;

// === === === === === === ===

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: API for working with accounts
 */
export const accountApiV1 = createApi({
  reducerPath: "accountApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    /**
     * @swagger
     * /api/v1/account/get_payload:
     *   get:
     *     summary: Get payload for authorization
     *     tags: [Account]
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthPayloadResponse'
     *       400:
     *         description: Request Error
     */
    getPayload: builder.query<AuthPayloadResponse | ErrorResponseMessage, void>({
      query: () => "get_payload",
    }),

    /**
     * @swagger
     * /api/v1/account/auth:
     *   post:
     *     summary: User authorization
     *     tags: [Account]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AuthLoginRequest'
     *     responses:
     *       200:
     *         description: Successful authorization
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthPayloadResponse'
     *       400:
     *         description: Authorization error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponseMessage'
     */
    login: builder.query<AuthPayloadResponse | ErrorResponseMessage, AuthLoginRequest>({
      query: (data) => {
        return {
          url: "auth",
          method: "POST",
          body: data,
        };
      },
    }),

    /**
     * @swagger
     * /api/v1/account/{address}/balances:
     *   get:
     *     summary: Get user balances
     *     tags: [Account]
     *     parameters:
     *       - in: path
     *         name: address
     *         required: true
     *         schema:
     *           type: string
     *         description: User address
     *     responses:
     *       200:
     *         description: Successful response with balances
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Balances'
     *       400:
     *         description: Request Error
     */
    getBalances: builder.query<Balances, string>({
      query: (address) => {
        return {
          url: `${address}/balances`,
          method: "GET",
        };
      },
      transformResponse: balancesInToBalances,
    }),
  }),
});

// === === === === === === ===

export const { useGetPayloadQuery, useLoginQuery, useGetBalancesQuery } = accountApiV1;
