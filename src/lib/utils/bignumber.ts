import BN from "bignumber.js";

// === === === === === === ===

export const BN_ZERO = new BN(0);

// === === === === === === ===

export const isValidNumber = (value: string | null | undefined) => {
  if (!value) return false;
  try {
    new BN(value);
    return true;
  } catch {
    return false;
  }
}

