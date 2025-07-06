import { Request, Response } from "express";
import { eventoService } from "../service/EventoService";

export const criarEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, local, horario, valor, quantidadeDisponivel, cpf } = req.body;
    const imagem = req.file ? req.file.filename : undefined;

    const evento = await eventoService.criarEvento({
      nome,
      local,
      horario: new Date(horario),
      valor: Number(valor),
      quantidadeDisponivel: Number(quantidadeDisponivel),
      imagem,
      cpf
    });

    res.status(201).json(evento);
  } catch (error: any) {
    // Captura qualquer erro do Sequelize (ex: campo faltando) ou da lógica de negócio
    res.status(400).json({ message: error.message });
  }
};

export const listarEventosDisponiveis = async (_req: Request, res: Response): Promise<void> => {
  try {
    const eventos = await eventoService.listarEventosDisponiveis();
    res.status(200).json(eventos);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar eventos.", error: error.message });
  }
};
