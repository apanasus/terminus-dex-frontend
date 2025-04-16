import { Address } from "@ton/core";
import {
  ErrorResponseMessage,
  SuccessPrepareTransactionMessage,
  TonAsset,
  TonAssetIn,
  TransactionData,
  TransactionDataIn,
} from "./commonTypes";

/**
 * @swagger
 * /api/v1/assets:
 *   get:
 *     summary: Get a list of assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: List of assets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TonAsset'
 *       400:
 *         description: Request Error
 */

/**
 * @swagger
 * /api/v1/transactions/prepare:
 *   post:
 *     summary: Prepare transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionDataIn'
 *     responses:
 *       200:
 *         description: Successful transaction preparation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionData'
 *       400:
 *         description: Request Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
 */

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
