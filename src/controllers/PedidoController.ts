import { Request, Response } from 'express';
import { pedidoService } from '../service/PedidoService';

export const criarPedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cpfCliente, idEvento } = req.body;
    
    // A criação do pedido agora envolve múltiplas checagens no banco e uma transação
    const pedido = await pedidoService.criarPedido({ cpfCliente, idEvento });
    
    res.status(201).json({ message: 'Compra realizada com sucesso!', pedido });
  } catch (error: any) {
    // Captura erros como "Cliente não encontrado", "Evento não encontrado", "Ingressos esgotados"
    res.status(400).json({ message: error.message });
  }
};

export const relatorioPedidos = async (req: Request, res: Response): Promise<void> => {
    try {
        const relatorio = await pedidoService.gerarRelatorio();
        res.status(200).json(relatorio);
    } catch (error: any) {
        res.status(500).json({ mensagem: 'Erro ao gerar relatório.', erro: error.message });
    }
};