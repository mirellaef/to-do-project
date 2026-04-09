import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error";

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new HttpError(400, "Dados inválidos", formatZodError(result.error))
      );
    }
    req.body = result.data;
    next();
  };
}

function formatZodError(error: ZodError) {
  return error.flatten();
}
