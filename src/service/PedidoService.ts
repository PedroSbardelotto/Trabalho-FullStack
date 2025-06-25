// import { v4 as uuidv4 } from 'uuid';
// import { Pedido } from '../models/Pedido';
// import { clienteService } from './ClienteService';
// import { eventoService } from './EventoService';

// interface CriarPedidoDTO {
//   cpfCliente: string;
//   idEvento: string;
// }

// class PedidoService {
//   private pedidos: Pedido[] = [];

//   public criarPedido(dados: CriarPedidoDTO): Pedido {
//     const { cpfCliente, idEvento } = dados;

//     const cliente = clienteService.buscarPorCpf(cpfCliente);
//     if (!cliente) {
//       throw new Error('Cliente não encontrado.');
//     }

//     const evento = eventoService.buscarPorId(idEvento);
//     if (!evento) {
//       throw new Error('Evento não encontrado.');
//     }

//     if (evento.quantidadeDisponivel < 1) {
//       throw new Error('Ingressos esgotados.');
//     }


//     evento.quantidadeDisponivel -= 1;

//     const pedido: Pedido = {
//       id: uuidv4(),
//       clienteId: cliente.id,
//       eventoId: evento.id,
//       quantidade: 1
//     };

//     this.pedidos.push(pedido);

//     return pedido;
//   }

//   public gerarRelatorio(): Pedido[] {
//     return this.pedidos;
//   }
// }

// export const pedidoService = new PedidoService();

import { Pedido } from '../models/Pedido';
import { clienteService } from './ClienteService';
import { eventoService } from './EventoService';
import database from '../database';
import { Transaction } from 'sequelize';

interface CriarPedidoDTO {
  cpfCliente: string;
  idEvento: string;
}

class PedidoService {
  public async criarPedido(dados: CriarPedidoDTO): Promise<Pedido> {
     const t: Transaction = await database.connection.transaction(); // Inicia uma transação

    try {
      const { cpfCliente, idEvento } = dados;

      const cliente = await clienteService.buscarPorCpf(cpfCliente);
      if (!cliente) {
        throw new Error('Cliente não encontrado.');
      }

      // Busca o evento dentro da transação para garantir que os dados estão "travados"
      const evento = await eventoService.buscarPorId(idEvento);
      if (!evento) {
        throw new Error('Evento não encontrado.');
      }

      if (evento.quantidadeDisponivel < 1) {
        throw new Error('Ingressos esgotados.');
      }

      // Decrementa a quantidade e salva, tudo dentro da transação
      evento.quantidadeDisponivel -= 1;
      await evento.save({ transaction: t });

      const pedido = await Pedido.create({
        clienteId: cliente.id,
        eventoId: evento.id,
        quantidade: 1,
      }, { transaction: t });

      // Se tudo deu certo, confirma a transação
      await t.commit();

      return pedido;
    } catch (error) {
      // Se algo deu errado, desfaz todas as operações
      await t.rollback();
      throw error; // Lança o erro para o controller tratar
    }
  }

  public async gerarRelatorio(): Promise<Pedido[]> {
    return Pedido.findAll({
      include: ['cliente', 'evento'] // Inclui os dados do cliente e do evento
    });
  }
}

export const pedidoService = new PedidoService();