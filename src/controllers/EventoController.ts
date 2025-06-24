import { Request, Response } from "express";
import { eventoService } from "../service/EventoService";

export const criarEvento = (req: Request, res: Response): void => {
  const { nome, local, horario, valor, quantidadeDisponivel } = req.body;

  if (
    !nome ||
    !local ||
    !horario ||
    valor == null ||
    quantidadeDisponivel == null
  ) {
    res.status(400).json({ message: "Todos os campos são obrigatórios." });
    return;
  }

  const evento = eventoService.criarEvento({
    nome,
    local,
    horario,
    valor: Number(valor),
    quantidadeDisponivel: Number(quantidadeDisponivel),
    id: eventoService.getId().toString(),
    imagem: "",
  });

  res.status(201).json(evento);
};

export const listarEventosDisponiveis = (
  _req: Request,
  res: Response
): void => {
  const eventos = eventoService.listarEventosDisponiveis();
  res.status(200).json(eventos);
};
