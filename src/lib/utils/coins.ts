import BN from "bignumber.js";

// === === === === === === ===

export const printCoins = (amountNano: BN, decimals: number, showDecimals?: number): string => {
  return amountNano
    .dividedBy(new BN(10).pow(decimals))
    .decimalPlaces(showDecimals ?? decimals, BN.ROUND_HALF_UP)
    .toString()
    .replace(/(\.\d*?[0-9])0+$/g, "$1");
};

// === === === === === === ===

export const toDecimal = (amountNano: BN, decimals: number): string => {
  return amountNano.dividedBy(new BN(10).pow(decimals)).toFixed(2);
};

// === === === === === === ===

export const toNano = (amount: string | number, decimals: number): BN => {
  return new BN(amount).multipliedBy(new BN(10).pow(decimals));
};

// === === === === === === ===
