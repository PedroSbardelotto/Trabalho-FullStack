import { Request, Response } from 'express';
import { clienteService } from '../service/ClienteService';

export const criarCliente = (req: Request, res: Response): void => {
  const { nome, email, cpf, senha } = req.body;
  const cliente = clienteService.criarCliente({ nome, email, cpf, senha });

  if (!cliente) {
    res.status(400).json({ mensagem: 'Cliente já cadastrado' });
    return;
  }

  res.status(201).json({ mensagem: 'Cliente criado com sucesso' });
};

export const loginCliente = (req: Request, res: Response): void => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
    return;
  }

  try {
    const token = clienteService.validarLogin(cpf, senha);
    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};



