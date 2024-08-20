import BN from "bignumber.js";

// === === === === === === ===

export interface Balances {
  assets: { [key: string]: BN };
  ton: BN;
}

// === === === === === === ===
