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
 *     summary: Get a list of staking pools
 *     tags: [Staking]
 *     responses:
 *       200:
 *         description: List of pools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StakePool'
 *       400:
 *         description: Request Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
 */

/**
 * @swagger
 * /api/v1/ton-staking/pool/{address}/data:
 *   get:
 *     summary: Get data for a specific pool
 *     tags: [Staking]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Pool address
 *     responses:
 *       200:
 *         description: Pool data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StakePoolData'
 *       400:
 *         description: Request Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseMessage'
 */
