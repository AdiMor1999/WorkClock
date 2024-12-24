import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Secret key for JWT (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthResquest extends Request {
  user?: {
    username: string;
    role: string;
  };
}

// Middleware to verify authentication
export const authMiddleware = (
  req: AuthResquest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Expected format: "Bearer <token>"

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      username: string;
      role: string;
    };
    req.user = decoded; // Attach user information to the request
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token " });
    return;
  }
};

// Middleware to verify admin role
export function authorizeAdmin(
  req: AuthResquest,
  res: Response,
  next: NextFunction
) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Forbidden: Admin access required" });
    return;
  }

  next();
}
