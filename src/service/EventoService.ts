// import { Evento } from "../models/Evento";

// class EventoService {
//   private eventos: Evento[] = [];
//   criarEvento(evento: Evento): Evento {
//     if (
//       !evento.nome ||
//       !evento.local ||
//       !evento.horario ||
//       evento.valor <= 0 ||
//       evento.quantidadeDisponivel <= 0
//     ) {
//       throw new Error(
//         "Todos os campos do evento são obrigatórios e devem ser válidos"
//       );
//     }

//     this.eventos.push(evento);
//     return evento;
//   }

//   getId(): number {
//     return this.eventos.length + 1;
//   }

//   listarEventosDisponiveis(): Evento[] {
//     return this.eventos.filter((e) => e.quantidadeDisponivel > 0);
//   }

//   buscarPorId(id: string): Evento | undefined {
//     return this.eventos.find((e) => e.id === id);
//   }

//   reduzirTicket(id: string): void {
//     const evento = this.buscarPorId(id);
//     if (!evento) {
//       throw new Error("Evento não encontrado");
//     }
//     if (evento.quantidadeDisponivel <= 0) {
//       throw new Error("Não há tickets disponíveis para este evento");
//     }
//     evento.quantidadeDisponivel -= 1;
//   }
// }

// export const eventoService = new EventoService();
import { Evento } from "../models/Evento";
import { Op } from "sequelize";
import { clienteService } from "../service/ClienteService";


class EventoService {
  async criarEvento(dados: {
    nome: string;
    local: string;
    horario: Date;
    valor: number;
    quantidadeDisponivel: number;
    imagem?: string;
    cpf: string;
  }): Promise<Evento> {
    const cliente = await clienteService.buscarPorCpf(dados.cpf);
    if(cliente?.tipo != "admin"){
      throw new Error("Cliente não tem permissão para criar um evento!")
    }

    const evento = await Evento.create(dados);
    return evento;
  }

  async listarEventosDisponiveis(): Promise<Evento[]> {
    return Evento.findAll({
      where: {
        quantidadeDisponivel: {
          [Op.gt]: 0 // Op.gt significa "greater than" (maior que)
        }
      }
    });
  }

  async buscarPorId(id: string): Promise<Evento | null> {
    return Evento.findByPk(id);
  }
}

export const eventoService = new EventoService();