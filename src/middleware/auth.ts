// src/middleware/auth.ts

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
    // Esta verificação usa a mesma chave que agora é usada para criar o token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // Anexando os dados do usuário a uma propriedade segura
    // @ts-ignore
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error); // Adicionado para melhor debug
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};