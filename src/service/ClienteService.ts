import { Cliente } from '../models/Cliente';

class ClienteService {
  private clientes: Cliente[] = [];

  criarCliente(cliente: Cliente): Cliente {
    if (!cliente.nome || !cliente.email || !cliente.cpf) {
      throw new Error('Nome, email e CPF são obrigatórios');
    }

    const existente = this.clientes.find(c => c.cpf === cliente.cpf);
    if (existente) {
      throw new Error('Cliente já cadastrado com este CPF');
    }

    this.clientes.push(cliente);
    return cliente;
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }

  buscarPorCpf(cpf: string): Cliente | undefined {
    return this.clientes.find(c => c.cpf === cpf);
  }
}

export const clienteService = new ClienteService();

