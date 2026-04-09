import { Router } from "express";
import { getHealth } from "../controllers/health.controller";

export const router = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Indica se a API está no ar e retorna um timestamp ISO 8601.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Serviço disponível
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get("/health", getHealth);
