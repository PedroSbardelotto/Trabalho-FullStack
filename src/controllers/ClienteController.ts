import { Request, Response } from 'express';
import { clienteService } from '../service/ClienteService';

// Controller para a rota pública
export const criarClienteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, cpf, senha } = req.body;
    await clienteService.criarClienteUser({
      nome, email, cpf, senha,
      tipo: ''
    });
    res.status(201).json({ mensagem: 'Cliente criado com sucesso' });
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
};

// Controller para a rota de admin
export const criarClienteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, cpf, senha } = req.body;
    await clienteService.criarClienteAdmin({
      nome, email, cpf, senha,
      tipo: ''
    });
    res.status(201).json({ mensagem: 'Administrador criado com sucesso' });
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
};

export const loginCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cpf, senha } = req.body;
    const token = await clienteService.validarLogin(cpf, senha);
    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }

  
};

export const listarClientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await clienteService.listarTodos();
    res.status(200).json(clientes);
  } catch (error: any) {
    res.status(500).json({ mensagem: 'Erro ao listar clientes.', erro: error.message });
  }
};

export const deletarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Pega o ID da URL
    await clienteService.deletarPorId(id);
    res.status(200).json({ mensagem: 'Cliente deletado com sucesso.' });
  } catch (error: any) {
    // Retorna 404 se o cliente não foi encontrado, 500 para outros erros
    if (error.message.includes('não encontrado')) {
      res.status(404).json({ mensagem: error.message });
    } else {
      res.status(500).json({ mensagem: 'Erro ao deletar cliente.', erro: error.message });
    }
  }
};
