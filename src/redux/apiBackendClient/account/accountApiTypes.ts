import { SuccessResponseMessage } from "../common/commonTypes";

// === === === === === === ===

export interface AuthPayloadResponse extends SuccessResponseMessage {
  payload: string;
}

// === === === === === === ===

export interface AuthLoginRequest {
  referral_code?: string;
  address: string;
  proof: {
    timestamp: number;
    domain: {
      length_bytes: number;
      value: string;
    };
    signature: string;
    payload: string;
    state_init?: string;
    public_key?: string;
  };
  tg_init_data?: string;
}

// === === === === === === ===

export interface BalancesIn {
  jettons: { [key: string]: string };
  ton: string;
}

// === === === === === === ===
