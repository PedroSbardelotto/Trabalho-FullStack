import { Evento } from "../models/Evento";
import { Op } from "sequelize";
// O clienteService não é mais necessário aqui para criar um evento
// import { clienteService } from "../service/ClienteService"; 

class EventoService {
  // A assinatura do método foi limpa. Agora ela espera exatamente
  // controller vai passar, sem depender de CPF.
  async criarEvento(dados: {
    nome: string;
    local: string;
    horario: Date;
    valor: number;
    quantidadeDisponivel: number;
    imagem?: string;
    adminId?: string;
  }): Promise<Evento> {
    
   
    const evento = await Evento.create(dados);
    return evento;
  }

  async listarEventosDisponiveis(): Promise<Evento[]> {
    return Evento.findAll({
      where: {
        quantidadeDisponivel: {
          [Op.gt]: 0 
        }
      }
    });
  }

  async buscarPorId(id: string): Promise<Evento | null> {
    return Evento.findByPk(id);
  }
}

export const eventoService = new EventoService();