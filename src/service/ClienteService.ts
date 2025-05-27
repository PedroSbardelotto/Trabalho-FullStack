import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../models/Cliente';
import jwt from 'jsonwebtoken';

interface CriarClienteDTO {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

class ClienteService {
  private clientes: Cliente[] = [];

  public criarCliente(dados: CriarClienteDTO): Cliente {
    const { nome, email, cpf, senha } = dados;


    const clienteExistente = this.clientes.find(c => c.cpf === cpf);
    if (clienteExistente) {
      throw new Error('Cliente já cadastrado com este CPF.');
    }

    const novoCliente: Cliente = {
      id: uuidv4(),
      nome,
      email,
      cpf,
      senha
    };

    this.clientes.push(novoCliente);

    return novoCliente;
  }

  public buscarPorCpf(cpf: string): Cliente | undefined {
    return this.clientes.find(c => c.cpf === cpf);
  }
  public validarLogin(cpf: string, senha: string): string {
    const cliente = this.clientes.find(c => c.cpf === cpf);

    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    if (cliente.senha !== senha) {
      throw new Error('Senha incorreta.');
    }

    const token = jwt.sign(
      { id: cliente.id, cpf: cliente.cpf, email: cliente.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return token;
  }

}

export const clienteService = new ClienteService();
