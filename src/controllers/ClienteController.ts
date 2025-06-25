import { Request, Response } from 'express';
import { clienteService } from '../service/ClienteService';

export const criarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, cpf, senha } = req.body;
    // O service agora retorna uma Promise, então usamos await
    await clienteService.criarCliente({ nome, email, cpf, senha });

    // O status 201 é retornado apenas se a criação for bem-sucedida
    res.status(201).json({ mensagem: 'Cliente criado com sucesso' });
  } catch (error: any) {
    // Se o service lançar um erro (ex: CPF já existe), ele será capturado aqui
    res.status(400).json({ mensagem: error.message });
  }
};

export const loginCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cpf, senha } = req.body;

    // A validação de login agora é assíncrona (compara o hash do bcrypt)
    const token = await clienteService.validarLogin(cpf, senha);
    
    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error: any) {
    // Captura erros como "Cliente não encontrado" ou "Senha incorreta"
    res.status(401).json({ message: error.message });
  }
};

