import { Cliente } from '../models/Cliente';
import { ClienteDTO } from '../dtos/ClienteDTO';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class ClienteService {
  public async criarCliente(dados: ClienteDTO): Promise<Cliente> {
    const { nome, email, cpf, senha, tipo } = dados;

    const clienteExistente = await Cliente.findOne({ where: { cpf } });
    if (clienteExistente) {
      throw new Error('Cliente já cadastrado com este CPF.');
    }
    
    // Hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 8);

    const novoCliente = await Cliente.create({
      nome,
      email,
      cpf,
      senha: senhaHash,
      tipo
    });

    return novoCliente;
  }

  public async validarLogin(cpf: string, senha: string): Promise<string> {
    const cliente = await Cliente.findOne({ where: { cpf } });
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    // Compara a senha enviada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      throw new Error('Senha incorreta.');
    }

    const token = jwt.sign(
      { id: cliente.id, cpf: cliente.cpf , tipo: cliente.tipo},
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    return token;
  }

  public async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    return Cliente.findOne({ where: { cpf } });
  }
}

export const clienteService = new ClienteService();