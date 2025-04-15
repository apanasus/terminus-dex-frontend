import { Address } from "@ton/core";
import { TonAsset, TonAssetIn } from "../common/commonTypes";
import BN from "bignumber.js";

// === === === === === === ===

export interface StakePoolIn {
  address: string;
  in_asset: TonAssetIn;
  out_asset: TonAssetIn;
  min_offer_amount: number;
  fees: number;
  apy: number;
  is_active: boolean;
}

// === === === === === === ===

export interface StakePool {
  address: Address;
  inAsset: TonAsset;
  outAsset: TonAsset;
  minOfferAmount: BN;
  fees: number;
  apy: number;
  isActive: boolean;
}

// === === === === === === ===

export interface StakePoolDataIn {
  address: string;
  price: number;
  is_active: boolean;
}

// === === === === === === ===

export interface StakePoolData {
  address: Address;
  price: number;
  isActive: boolean;
}

// === === === === === === ===

/**
 * @swagger
 * /api/v1/ton-staking/pools:
 *   get:
 *     summary: Получить список пулов для стейкинга
 *     tags: [Staking]
 *     responses:
 *       200:
 *         description: Список пулов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StakePool'
 *       400:
 *         description: Ошибка запроса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
 */

/**
 * @swagger
 * /api/v1/ton-staking/pool/{address}/data:
 *   get:
 *     summary: Получить данные конкретного пула
 *     tags: [Staking]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Адрес пула
 *     responses:
 *       200:
 *         description: Данные пула
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StakePoolData'
 *       400:
 *         description: Ошибка запроса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
 */
