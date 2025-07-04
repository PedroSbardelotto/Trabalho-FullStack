import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
    
        res.status(400).json({
          message: 'Erro de validação.',
          errors: error.errors,
        });
        // A função termina aqui para requisições inválidas.
        return; // Um return vazio para garantir a saída
      }
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };