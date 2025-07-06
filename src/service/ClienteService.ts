import { Cliente } from '../models/Cliente';
import { ClienteDTO } from '../dtos/ClienteDTO';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class ClienteService {

  // Método privado e genérico que lida com a lógica principal de criação
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
      tipo: tipo, // A role é passada como parâmetro
    });

    return novoCliente;
  }

  /**
   * Cria um novo cliente com a role 'user'.
   * Este método será usado pela rota pública de cadastro.
   */
  public async criarClienteUser(dados: ClienteDTO): Promise<Cliente> {
    return this._criar(dados, 'user');
  }

  /**
   * Cria um novo cliente com a role 'admin'.
   * Este método será usado por uma rota interna, apenas para setup.
   */
  public async criarClienteAdmin(dados: ClienteDTO): Promise<Cliente> {
    return this._criar(dados, 'admin');
  }

  // A função de login permanece a mesma
  public async validarLogin(cpf: string, senha: string): Promise<string> {
    const cliente = await Cliente.findOne({ where: { cpf } });
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      throw new Error('Cpf ou senha incorretos.');
    }

    const token = jwt.sign(
      { id: cliente.id, nome: cliente.nome, cpf: cliente.cpf, role: cliente.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return token;
  }
}

export const clienteService = new ClienteService();