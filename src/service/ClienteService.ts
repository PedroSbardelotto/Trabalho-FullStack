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
  * Lista todos os clientes cadastrados no banco de dados.
  */
  public async listarTodos(): Promise<Cliente[]> {
    const clientes = await Cliente.findAll();
    return clientes;
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

  /**
   * Deleta um cliente do banco de dados pelo seu ID.
   */
  public async deletarPorId(id: string): Promise<void> {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado para deleção.');
    }
    await cliente.destroy();
  }
  /**
   * Busca um cliente pelo seu CPF.
   */
  public async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    const cliente = await Cliente.findOne({ where: { cpf } });
    return cliente;
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
      { id: cliente.id, nome: cliente.nome, cpf: cliente.cpf, tipo: cliente.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return token;
  }
}

export const clienteService = new ClienteService();