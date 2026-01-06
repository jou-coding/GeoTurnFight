import type { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "./token.js";

export type AuthenticatedRequest = Request & {
  user?: {
    userId: number;
    username: string;
  };
};

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "認証トークンが必要です。" });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  try {
    const payload = verifyAuthToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    console.error("Auth token verification failed:", error);
    return res.status(401).json({ error: "認証に失敗しました。" });
  }
}
