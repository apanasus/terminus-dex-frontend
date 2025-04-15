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
 *     summary: Получить список активов
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Список активов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TonAsset'
 *       400:
 *         description: Ошибка запроса
 */

/**
 * @swagger
 * /api/v1/transactions/prepare:
 *   post:
 *     summary: Подготовить транзакцию
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionDataIn'
 *     responses:
 *       200:
 *         description: Успешная подготовка транзакции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionData'
 *       400:
 *         description: Ошибка запроса
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
