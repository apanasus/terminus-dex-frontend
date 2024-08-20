import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { accountApiV1 } from "./apiBackendClient/account/accountApiSlice";
import { tonStakingApiV1 } from "./apiBackendClient/staking/stakingApiSlice";
import tonDexApiV1 from "./apiBackendClient/tonDex/tonDexApiSlice";
import dexReducer from "./slices/dexSlice";
import localeReducer from "./slices/localeSlice";
import appReducer from "./slices/appSlice";

// === === === === === === ===

enableMapSet();

// === === === === === === ===

export const store = configureStore({
  reducer: {
    localeState: localeReducer,
    dexState: dexReducer,
    appState: appReducer,
    [accountApiV1.reducerPath]: accountApiV1.reducer,
    [tonStakingApiV1.reducerPath]: tonStakingApiV1.reducer,
    [tonDexApiV1.reducerPath]: tonDexApiV1.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(accountApiV1.middleware)
      .concat(tonStakingApiV1.middleware)
      .concat(tonDexApiV1.middleware),
});

// === === === === === === ===

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// === === === === === === ===
