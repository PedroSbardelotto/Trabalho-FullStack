import { v4 as uuidv4 } from 'uuid';
import { Pedido } from '../models/Pedido';
import { clienteService } from './ClienteService';
import { eventoService } from './EventoService';

interface CriarPedidoDTO {
  cpfCliente: string;
  idEvento: string;
}

class PedidoService {
  private pedidos: Pedido[] = [];

  public criarPedido(dados: CriarPedidoDTO): Pedido {
    const { cpfCliente, idEvento } = dados;

    const cliente = clienteService.buscarPorCpf(cpfCliente);
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    const evento = eventoService.buscarPorId(idEvento);
    if (!evento) {
      throw new Error('Evento não encontrado.');
    }

    if (evento.quantidadeDisponivel < 1) {
      throw new Error('Ingressos esgotados.');
    }

    
    evento.quantidadeDisponivel -= 1;

    const pedido: Pedido = {
      id: uuidv4(),
      clienteId: cliente.id,
      eventoId: evento.id,
      quantidade: 1
    };

    this.pedidos.push(pedido);

    return pedido;
  }

  public gerarRelatorio(): Pedido[] {
    return this.pedidos;
  }
}

export const pedidoService = new PedidoService();

