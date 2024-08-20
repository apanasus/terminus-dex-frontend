import { Balances } from "@/types/ton/TonBalances";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorResponseMessage, SuccessResponseMessage } from "../common/commonTypes";
import { AuthLoginRequest, AuthPayloadResponse } from "./accountApiTypes";
import { balancesInToBalances } from "./accountMappers";

// === === === === === === ===

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST;
const BASE_URL = `${BACKEND_URL}/api/v1/account/`;

// === === === === === === ===

export const accountApiV1 = createApi({
  reducerPath: "accountApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // === === === === === === ===
    getPayload: builder.query<AuthPayloadResponse | ErrorResponseMessage, void>({
      query: () => "get_payload",
    }),
    // === === === === === === ===
    login: builder.query<SuccessResponseMessage | ErrorResponseMessage, AuthLoginRequest>({
      query: (data) => {
        return {
          url: "auth",
          method: "POST",
          body: data,
        };
      },
    }),
    // === === === === === === ===
    getBalances: builder.query<Balances, string>({
      query: (address) => {
        return {
          url: `${address}/balances`,
          method: "GET",
        };
      },
      transformResponse: balancesInToBalances,
    }),
    // === === === === === === ===
  }),
});

// === === === === === === ===

export const { useGetPayloadQuery, useLoginQuery, useGetBalancesQuery } = accountApiV1;
