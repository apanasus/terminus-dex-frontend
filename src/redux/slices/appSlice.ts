// TODO: Base app settings received from backend

import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

// === === === === === === ===

export interface AppState {
  authenticated: boolean;
}

const initialState = {
  authenticated: false,
};

// === === === === === === ===

export const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    updateAuthData: (state, action: PayloadAction<{ authenticated: boolean }>) => {
      state.authenticated = action.payload.authenticated;
    },
  },
});

// === === === === === === ===

export const { updateAuthData } = appState.actions;

// === === === === === === ===

export const selectAuthData = (state: { appState: AppState }) => state.appState;

// === === === === === === ===

export default appState.reducer;

// === === === === === === ===
