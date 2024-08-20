import { TON_ADDRESS } from "@/constants";
import { Balances } from "@/types/ton/TonBalances";
import { Address } from "@ton/core";
import BN from "bignumber.js";
import { BalancesIn } from "./accountApiTypes";
import { toStringOptions } from "@/lib/utils/tonAddress";
// === === === === === === ===

export const balancesInToBalances = (balancesIn: BalancesIn): Balances => {
  const jettons: { [key: string]: BN } = {};
  for (const [key, value] of Object.entries(balancesIn.jettons)) {
    jettons[Address.parse(key).toString(toStringOptions)] = new BN(value);
  }
  jettons[TON_ADDRESS.toString(toStringOptions)] = new BN(balancesIn.ton);
  return {
    assets: jettons,
    ton: new BN(balancesIn.ton),
  };
};

// === === === === === === ===
