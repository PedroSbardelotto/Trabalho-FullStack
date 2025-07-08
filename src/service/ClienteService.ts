import { Cliente } from '../models/Cliente';
import { ClienteDTO } from '../dtos/ClienteDTO';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class ClienteService {

  private async _criar(dados: ClienteDTO, tipo: 'user' | 'admin'): Promise<Cliente> {
    const { nome, email, cpf, senha } = dados;

    const clienteExistente = await Cliente.findOne({ where: { cpf } });
    if (clienteExistente) {
      throw new Error('Cliente já cadastrado com este CPF.');
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    const novoCliente = await Cliente.create({
      nome,
      email,
      cpf,
      senha: senhaHash,
      tipo: tipo,
    });

    return novoCliente;
  }

  public async listarTodos(): Promise<Cliente[]> {
    const clientes = await Cliente.findAll();
    return clientes;
  }

  public async criarClienteUser(dados: ClienteDTO): Promise<Cliente> {
    return this._criar(dados, 'user');
  }

  public async criarClienteAdmin(dados: ClienteDTO): Promise<Cliente> {
    return this._criar(dados, 'admin');
  }

  public async deletarPorId(id: string): Promise<void> {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado para deleção.');
    }
    await cliente.destroy();
  }
 
  public async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    const cliente = await Cliente.findOne({ where: { cpf } });
    return cliente;
  }

  public async validarLogin(cpf: string, senha: string): Promise<string> {
    const cliente = await Cliente.findOne({ where: { cpf } });
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      throw new Error('Cpf ou senha incorretos.');
    }

    // PONTO DA CORREÇÃO:
    // Trocamos a variável de ambiente para JWT_SECRET para ser consistente
    // com o middleware de autenticação.
    const token = jwt.sign(
      { id: cliente.id, nome: cliente.nome, cpf: cliente.cpf, tipo: cliente.tipo },
      process.env.JWT_SECRET as string, // <-- CHAVE CORRIGIDA AQUI
      { expiresIn: '8h' } // Aumentei a expiração para 8 horas
    );

    return token;
  }
}

export const clienteService = new ClienteService();