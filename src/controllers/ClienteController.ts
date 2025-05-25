import { Request, Response } from 'express';
import { clienteService } from '../service/ClienteService';
import { Cliente } from '../models/Cliente';

export const criarCliente = (req: Request, res: Response): void => {
  try {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
      res.status(400).json({ message: 'Nome, email e CPF são obrigatórios' });
      return;
    }

    const cliente: Cliente = {
      nome, email, cpf,
      id: '',
      senha: ''
    };
    const novoCliente = clienteService.criarCliente(cliente);

    res.status(201).json(novoCliente);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listarClientes = (_req: Request, res: Response): void => {
  const clientes = clienteService.listarClientes();
  res.status(200).json(clientes);
};

export const buscarClientePorCpf = (req: Request, res: Response): void => {
  const { cpf } = req.params;
  const cliente = clienteService.buscarPorCpf(cpf);

  if (!cliente) {
    res.status(404).json({ message: 'Cliente não encontrado' });
    return;
  }

  res.status(200).json(cliente);
};
