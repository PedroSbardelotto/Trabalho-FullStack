import { Pedido } from '../models/Pedido';
import { clienteService } from './ClienteService';
import { eventoService } from './EventoService';

class PedidoService {
  private pedidos: Pedido[] = [];

  criarPedido(pedido: Pedido): Pedido {
    const cliente = clienteService.buscarPorCpf(pedido.clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const evento = eventoService.buscarPorId(pedido.eventoId);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }

    if (evento.quantidadeDisponivel <= 0) {
      throw new Error('Não há tickets disponíveis para este evento');
    }

    eventoService.reduzirTicket(evento.id);

    this.pedidos.push({
      clienteId: cliente.id,
      eventoId: evento.id,
      quantidade: 0,
      id: ''
    });

    return pedido;
  }

  gerarRelatorio(): Pedido[] {
    return this.pedidos;
  }
}

export const pedidoService = new PedidoService();
