export const HOST: string = process.env.HOST_PUBLIC_HOST || "";
export const TONCONNECT_MANIFEST_URL: string = process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL || "";
export const AUTH_TOKEN_KEY: string = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "";

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const languages = locales.reduce((acc: { [key: string]: string }, locale) => {
  acc[locale] = `${HOST}/${locale}`;
  return acc;
}, {});

export const REFERRAL_CODE_KEY = "ref";

export const MIN_SLIPPAGE = 0;
export const MAX_SLIPPAGE = 20;

export const MIN_AMOUNT = 1001;
