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
 *     summary: Получить payload для авторизации
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthPayloadResponse'
 *       400:
 *         description: Ошибка запроса
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
 *     summary: Авторизация пользователя
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginRequest'
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseMessage'
 *       400:
 *         description: Ошибка авторизации
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
 *     summary: Получить балансы пользователя
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Адрес пользователя
 *     responses:
 *       200:
 *         description: Успешный ответ с балансами
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Balances'
 *       400:
 *         description: Ошибка запроса
 */
