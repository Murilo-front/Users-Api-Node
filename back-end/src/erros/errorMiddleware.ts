import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message,
  });
}
