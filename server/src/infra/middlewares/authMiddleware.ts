import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ error: "トークンがありません" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // req.user にpayloadを載せる例
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "トークンが無効です" });
  }
}
