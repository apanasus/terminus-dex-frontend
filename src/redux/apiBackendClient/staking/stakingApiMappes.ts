import { Address } from "@ton/core";
import { assetInToAsset } from "../common/commonMappers";
import { StakePool, StakePoolData, StakePoolDataIn, StakePoolIn } from "./stakingApiTypes";
import BN from "bignumber.js";

// === === === === === === ===

/**
 * @swagger
 * /api/v1/staking/pools:
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
 * /api/v1/staking/pool/{address}/data:
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

export const poolInToPool = (pool: StakePoolIn): StakePool => {
  return {
    address: Address.parse(pool.address),
    inAsset: assetInToAsset(pool.in_asset),
    outAsset: assetInToAsset(pool.out_asset),
    minOfferAmount: new BN(pool.min_offer_amount),
    fees: pool.fees,
    apy: pool.apy,
    isActive: pool.is_active,
  };
};

// === === === === === === ===

export const poolStakeDataInToPoolStakeData = (pool: StakePoolDataIn): StakePoolData => {
  return {
    address: Address.parse(pool.address),
    price: pool.price,
    isActive: pool.is_active,
  };
};

// === === === === === === ===
