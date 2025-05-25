import { Request, Response } from 'express';
import { EventoService } from '../service/EventoService';

const service = new EventoService();

export const criarEvento = (req: Request, res: Response) => {
  const evento = service.criar(req.body);
  res.status(201).json(evento);
};

export const listarEventos = (req: Request, res: Response) => {
  res.json(service.listarDisponiveis());
};