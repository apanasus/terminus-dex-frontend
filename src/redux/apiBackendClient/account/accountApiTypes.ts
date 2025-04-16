import { SuccessResponseMessage } from "../common/commonTypes";

// === === === === === === ===

export interface AuthPayloadResponse extends SuccessResponseMessage {
  payload: string;
}

// === === === === === === ===

/**
 * @swagger
 * /api/v1/account/get_payload:
 *   get:
 *     summary: Get payload for authorization
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthPayloadResponse'
 *       400:
 *         description: Request Error
 */

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

/**
 * @swagger
 * /api/v1/account/auth:
 *   post:
 *     summary: User authorization
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginRequest'
 *     responses:
 *       200:
 *         description: Successful authorization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseMessage'
 *       400:
 *         description: Authorization error
 */

export interface BalancesIn {
  jettons: { [key: string]: string };
  ton: string;
}

// === === === === === === ===

/**
 * @swagger
 * /api/v1/account/{address}/balances:
 *   get:
 *     summary: Get user balances
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: User address
 *     responses:
 *       200:
 *         description: Successful response with balances
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Balances'
 *       400:
 *         description: Request Error
 */
