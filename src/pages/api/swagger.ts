import { NextApiRequest, NextApiResponse } from "next";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "@/swagger";

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(swaggerSpec);
}