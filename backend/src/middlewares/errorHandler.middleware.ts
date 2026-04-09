import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error";

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Dados inválidos",
      details: err.flatten(),
    });
    return;
  }

  const message =
    err instanceof Error ? err.message : "Erro interno do servidor";
  console.error(err);
  res.status(500).json({ error: message });
}
