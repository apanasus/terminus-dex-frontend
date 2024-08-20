import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  locale: string;
};

const initialState: InitialState = {
  locale: "en",
};

export const localeState = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeState.actions;
export default localeState.reducer;

export const selectLocale = (state: { localeState: { locale: string } }) => state.localeState.locale;
