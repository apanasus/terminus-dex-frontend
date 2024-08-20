import { Address } from "@ton/core";

// === === === === === === ===

export const shortAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// === === === === === === ===

export const isValidAddress = (address: string | null) => {
  if (!address) return false;
  try {
    Address.parse(address);
    return true;
  } catch {
    return false;
  }
};

// === === === === === === ===

export const toStringOptions = { urlSafe: true, bounceable: false };

// === === === === === === ===
