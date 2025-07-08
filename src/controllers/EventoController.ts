import { Request, Response } from "express";
import { eventoService } from "../service/EventoService";

export const criarEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user; // Pega o usuário do token decodificado pelo middleware

    // 1. Verificação de Segurança: Garante que apenas admins podem criar eventos.
    if (!user || user.tipo !== 'admin') {
      res.status(403).json({ message: "Acesso negado. Apenas administradores podem criar eventos." });
      return;
    }

    // 2. Extrai os dados do corpo da requisição
    const { nome, local, horario, valor, quantidadeDisponivel } = req.body;
    const imagem = req.file ? req.file.filename : undefined;

    // Validação básica para garantir que os dados necessários estão presentes
    if (!nome || !local || !horario || !valor || !quantidadeDisponivel) {
      res.status(400).json({ message: "Todos os campos são obrigatórios." });
      return;
    }

    const evento = await eventoService.criarEvento({
      nome,
      local,
      horario: new Date(horario),
      valor: Number(valor),
      quantidadeDisponivel: Number(quantidadeDisponivel),
      imagem,
      adminId: user.id
    });

    res.status(201).json(evento);
  } catch (error: any) {
    // 3. Log do Erro no Servidor (MUITO IMPORTANTE PARA DEBUG)
    console.error("ERRO AO CRIAR EVENTO:", error);
    res.status(400).json({ message: error.message || "Ocorreu um erro no servidor." });
  }
};

export const listarEventosDisponiveis = async (_req: Request, res: Response): Promise<void> => {
  // ... (sem alterações aqui)
  try {
    const eventos = await eventoService.listarEventosDisponiveis();
    res.status(200).json(eventos);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar eventos.", error: error.message });
  }
};