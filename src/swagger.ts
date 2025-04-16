const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Terminus DEX API",
      version: "1.0.0",
      description: "API Documentation for Terminus DEX",
    },
    components: {
      schemas: {
        BalancesIn: {
          type: "object",
          properties: {
            jettons: {
              type: "object",
              additionalProperties: { type: "string" },
              example: {
                "EQC1234567890": "100",
                "EQC0987654321": "200",
              },
            },
            ton: { type: "string", example: "1000" },
          },
        },
        Balances: {
          type: "object",
          properties: {
            assets: {
              type: "object",
              additionalProperties: { type: "string" },
              example: {
                "EQC1234567890": "100",
                "EQC0987654321": "200",
                "TON": "1000",
              },
            },
            ton: { type: "string", example: "1000" },
          },
        },
        ResponseMessage: {
          type: "object",
          properties: {
            code: { type: "number", example: 0 },
          },
        },
        ErrorResponseMessage: {
          allOf: [
            { $ref: "#/components/schemas/ResponseMessage" },
            {
              type: "object",
              properties: {
                error: { type: "string", example: "Invalid request" },
              },
            },
          ],
        },
        SuccessResponseMessage: {
          allOf: [
            { $ref: "#/components/schemas/ResponseMessage" },
            {
              type: "object",
              properties: {
                data: { type: "object", example: {} },
              },
            },
          ],
        },
        TonAssetIn: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            name: { type: "string", example: "TON Crystal" },
            symbol: { type: "string", example: "TON" },
            decimals: { type: "number", example: 9 },
            image_url: { type: "string", example: "https://example.com/icon.png" },
            is_community: { type: "boolean", example: false },
            is_deprecated: { type: "boolean", example: false },
            is_blacklisted: { type: "boolean", example: false },
          },
        },
        TonAsset: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            name: { type: "string", example: "TON Crystal" },
            symbol: { type: "string", example: "TON" },
            decimals: { type: "number", example: 9 },
            iconUrl: { type: "string", example: "https://example.com/icon.png" },
            isCommunity: { type: "boolean", example: false },
            isDeprecated: { type: "boolean", example: false },
            isBlacklisted: { type: "boolean", example: false },
          },
        },
        TransactionMessage: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            amount: { type: "string", example: "1000" },
            payload: { type: "string", nullable: true, example: "payload_data" },
          },
        },
        TransactionDataIn: {
          type: "object",
          properties: {
            valid_until: { type: "number", example: 1681234567 },
            messages: {
              type: "array",
              items: { $ref: "#/components/schemas/TransactionMessage" },
            },
          },
        },
        TransactionData: {
          type: "object",
          properties: {
            validUntil: { type: "number", example: 1681234567 },
            messages: {
              type: "array",
              items: { $ref: "#/components/schemas/TransactionMessage" },
            },
          },
        },
        SuccessPrepareTransactionMessage: {
          allOf: [
            { $ref: "#/components/schemas/SuccessResponseMessage" },
            {
              type: "object",
              properties: {
                data: { $ref: "#/components/schemas/TransactionDataIn" },
              },
            },
          ],
        },
        StakePoolIn: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            in_asset: { $ref: "#/components/schemas/TonAssetIn" },
            out_asset: { $ref: "#/components/schemas/TonAssetIn" },
            min_offer_amount: { type: "number", example: 1000 },
            fees: { type: "number", example: 0.01 },
            apy: { type: "number", example: 12.5 },
            is_active: { type: "boolean", example: true },
          },
        },
        StakePool: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            inAsset: { $ref: "#/components/schemas/TonAsset" },
            outAsset: { $ref: "#/components/schemas/TonAsset" },
            minOfferAmount: { type: "string", example: "1000" },
            fees: { type: "number", example: 0.01 },
            apy: { type: "number", example: 12.5 },
            isActive: { type: "boolean", example: true },
          },
        },
        StakePoolDataIn: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            price: { type: "number", example: 1.5 },
            is_active: { type: "boolean", example: true },
          },
        },
        StakePoolData: {
          type: "object",
          properties: {
            address: { type: "string", example: "EQC1234567890" },
            price: { type: "number", example: 1.5 },
            isActive: { type: "boolean", example: true },
          },
        },
        GetSwapParamsRequestBody: {
          type: "object",
          properties: {
            offerAddress: { type: "string", example: "EQC1234567890" },
            askAddress: { type: "string", example: "EQC0987654321" },
            referralAddress: { type: "string", nullable: true, example: "EQC1122334455" },
            units: { type: "string", example: "1000" },
            slippageTolerance: { type: "number", example: 0.01 },
            swapType: { type: "string", enum: ["direct", "reverse"], example: "direct" },
          },
        },
        GetSwapParamsRequestBodyOut: {
          type: "object",
          properties: {
            offer_address: { type: "string", example: "EQC1234567890" },
            ask_address: { type: "string", example: "EQC0987654321" },
            referral_address: { type: "string", nullable: true, example: "EQC1122334455" },
            units: { type: "string", example: "1000" },
            slippage_tolerance: { type: "number", example: 0.01 },
            swap_type: { type: "string", example: "direct" },
          },
        },
        GetSwapParamsResultIn: {
          type: "object",
          properties: {
            ask_address: { type: "string", example: "EQC1234567890" },
            ask_units: { type: "string", example: "1000" },
            fee_address: { type: "string", example: "EQC0987654321" },
            fee_percent: { type: "number", example: 0.01 },
            fee_units: { type: "string", example: "10" },
            min_ask_units: { type: "string", example: "950" },
            offer_address: { type: "string", example: "EQC1122334455" },
            offer_units: { type: "string", example: "1000" },
            pool_address: { type: "string", example: "EQC9876543210" },
            price_impact: { type: "number", example: 0.02 },
            router_address: { type: "string", example: "EQC5566778899" },
            slippage_tolerance: { type: "number", example: 0.01 },
            swap_rate: { type: "string", example: "1.05" },
            min_fee: { type: "string", example: "0.01" },
            max_fee: { type: "string", example: "0.05" },
          },
        },
        ProvideParamsIn: {
          type: "object",
          properties: {
            first_token_address: { type: "string", example: "EQC1234567890" },
            second_token_address: { type: "string", example: "EQC0987654321" },
            first_token_units: { type: "string", example: "1000" },
            second_token_units: { type: "string", example: "2000" },
            fee_min: { type: "string", example: "0.01" },
            fee_max: { type: "string", example: "0.05" },
            expected_lp_units: { type: "string", example: "500" },
            min_expected_lp_units: { type: "string", example: "450" },
            estimated_share_of_pool: { type: "number", example: 0.25 },
            action: { type: "string", example: "provide" },
            send_token_address: { type: "string", nullable: true, example: "EQC1234567890" },
            send_units: { type: "string", nullable: true, example: "1000" },
            pool_address: { type: "string", example: "EQC9876543210" },
          },
        },
        ProvideParams: {
          type: "object",
          properties: {
            action: { type: "string", example: "provide" },
            firstTokenAddress: { type: "string", example: "EQC1234567890" },
            secondTokenAddress: { type: "string", example: "EQC0987654321" },
            firstTokenUnits: { type: "string", example: "1000" },
            secondTokenUnits: { type: "string", example: "2000" },
            feeMin: { type: "string", example: "0.01" },
            feeMax: { type: "string", example: "0.05" },
            expectedLpUnits: { type: "string", example: "500" },
            minLpOutUnits: { type: "string", example: "450" },
            estimatedShareOfPool: { type: "number", example: 0.25 },
            sendTokenAddress: { type: "string", nullable: true, example: "EQC1234567890" },
            sendUnits: { type: "string", nullable: true, example: "1000" },
            poolAddress: { type: "string", example: "EQC9876543210" },
          },
        },
        PrepareCreatePoolRequestBody: {
          type: "object",
          properties: {
            firstTokenAddress: { type: "string", example: "EQC1234567890" },
            secondTokenAddress: { type: "string", example: "EQC0987654321" },
            firstTokenUnits: { type: "string", example: "1000" },
            secondTokenUnits: { type: "string", example: "2000" },
          },
        },
        PrepareProvideRequestBody: {
          type: "object",
          properties: {
            firstTokenAddress: { type: "string", example: "EQC1234567890" },
            secondTokenAddress: { type: "string", example: "EQC0987654321" },
            firstTokenUnits: { type: "string", example: "1000" },
            secondTokenUnits: { type: "string", example: "2000" },
            minLpOutUnits: { type: "string", example: "450" },
          },
        },
        PrepareRemoveLiquidityRequestBody: {
          type: "object",
          properties: {
            firstTokenAddress: { type: "string", example: "EQC1234567890" },
            secondTokenAddress: { type: "string", example: "EQC0987654321" },
            lp_units: { type: "string", example: "500" },
          },
        },
        SwapParams: {
          type: "object",
          properties: {
            askAddress: { type: "string", example: "EQC1234567890" },
            askUnits: { type: "string", example: "1000" },
            feeAddress: { type: "string", example: "EQC0987654321" },
            feePercent: { type: "number", example: 0.01 },
            feeUnits: { type: "string", example: "10" },
            minAskUnits: { type: "string", example: "950" },
            offerAddress: { type: "string", example: "EQC1122334455" },
            offerUnits: { type: "string", example: "1000" },
            poolAddress: { type: "string", example: "EQC9876543210" },
            priceImpact: { type: "number", example: 0.02 },
            routerAddress: { type: "string", example: "EQC5566778899" },
            slippageTolerance: { type: "number", example: 0.01 },
            swapRate: { type: "string", example: "1.05" },
            feeMin: { type: "string", example: "0.01" },
            feeMax: { type: "string", example: "0.05" },
          },
        },
        AuthPayloadResponse: {
          type: "object",
          properties: {
            payload: { type: "string", example: "example_payload" },
            message: { type: "string", example: "Success" },
          },
        },
        GetProvideParamsRequestBody: {
          type: "object",
          properties: {
            firstTokenAddress: { type: "string", example: "EQC1234567890" },
            secondTokenAddress: { type: "string", example: "EQC0987654321" },
            firstTokenUnits: { type: "string", example: "1000" },
            secondTokenUnits: { type: "string", example: "2000" },
            slippageTolerance: { type: "number", example: 0.01 },
            action: { type: "string", example: "provide" },
          },
        },
        AuthLoginRequest: {
          type: "object",
          properties: {
            username: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "password123" },
          },
          required: ["username", "password"],
        },
      },
    },
  },
  apis: ["./src/**/*.ts"],
};

export default swaggerOptions;