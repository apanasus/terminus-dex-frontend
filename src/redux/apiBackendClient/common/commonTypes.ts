// === === === === === === ===

import { Address } from "@ton/core";

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
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

export interface ResponseMessage {
  code: number;
}

// === === === === === === ===

export interface ErrorResponseMessage extends ResponseMessage {
  error: string;
}

// === === === === === === ===

export interface SuccessResponseMessage extends ResponseMessage {
  code: 0;
  data: any;
}

// === === === === === === ===

export interface TonAssetIn {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  image_url: string;
  is_community: boolean;
  is_deprecated: boolean;
  is_blacklisted: boolean;
}

// === === === === === === ===

export interface TonAsset {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  iconUrl: string;
  isCommunity: boolean;
  isDeprecated: boolean;
  isBlacklisted: boolean;
}

// === === === === === === ===

export interface TransactionMessage {
  address: string;
  amount: string;
  payload?: string;
}

// === === === === === === ===

export interface TransactionDataIn {
  valid_until: number;
  messages: TransactionMessage[];
}

// === === === === === === ===

export interface TransactionData {
  validUntil: number;
  messages: TransactionMessage[];
}

// === === === === === === ===

export interface SuccessPrepareTransactionMessage extends SuccessResponseMessage {
  data: TransactionDataIn;
}

// === === === === === === ===
