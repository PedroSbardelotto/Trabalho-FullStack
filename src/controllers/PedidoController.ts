import { Request, Response } from 'express';
import { PedidoService } from '../service/PedidoService';

const service = new PedidoService();

export const criarPedido = (req: Request, res: Response) => {
  const { clienteId, eventoId, quantidade } = req.body;
  try {
    const pedido = service.criar(clienteId, eventoId, quantidade);
    res.status(201).json({ message: 'Compra realizada com sucesso', pedido });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const relatorioPedidos = (req: Request, res: Response) => {
  res.json(service.relatorio());
};