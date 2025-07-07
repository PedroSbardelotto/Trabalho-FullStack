import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: "Token não fornecido ou mal formatado." });
    return;
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // SOLUÇÃO: Voltamos a usar req.body.user.
    // O TypeScript não reclamará, pois req.body é do tipo 'any'.
    req.body.user = decoded;

    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};