import { Request, Response } from 'express';
import { pedidoService } from '../service/PedidoService';

export const criarPedido = (req: Request, res: Response): void => {
  const { cpfCliente, idEvento } = req.body;

  if (!cpfCliente || !idEvento) {
    res.status(400).json({ message: 'CPF e ID do evento são obrigatórios.' });
    return;
  }

  try {
    const pedido = pedidoService.criarPedido({ cpfCliente, idEvento });
    res.status(201).json({ message: 'Compra realizada com sucesso!', pedido });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const relatorioPedidos = (req: Request, res: Response): void => {
    try {
        const relatorio = pedidoService.gerarRelatorio();
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao gerar relatório.', erro: error });
    }
};