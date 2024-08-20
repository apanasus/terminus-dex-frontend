import { Address } from "@ton/core";
import {
  ErrorResponseMessage,
  SuccessPrepareTransactionMessage,
  TonAsset,
  TonAssetIn,
  TransactionData,
  TransactionDataIn,
} from "./commonTypes";

// === === === === === === ===

export const assetInToAsset = (asset: TonAssetIn): TonAsset => {
  return {
    address: Address.parse(asset.address),
    name: asset.name,
    symbol: asset.symbol,
    decimals: asset.decimals,
    iconUrl: asset.image_url,
    isCommunity: asset.is_community,
    isDeprecated: asset.is_deprecated,
    isBlacklisted: asset.is_blacklisted,
  };
};

// === === === === === === ===

export const transactionDataInToInner = (data: TransactionDataIn): TransactionData => {
  return {
    validUntil: data.valid_until,
    messages: data.messages,
  };
};

// === === === === === === ===

export const transformPrepareTransactionMessage = (
  message: SuccessPrepareTransactionMessage | ErrorResponseMessage,
): TransactionData | ErrorResponseMessage => {
  if ("error" in message) {
    return message;
  }
  return transactionDataInToInner(message.data);
};

// === === === === === === ===
