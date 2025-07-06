// import { v4 as uuidv4 } from 'uuid';
// import { Cliente } from '../models/Cliente';
// import jwt from 'jsonwebtoken';

// interface CriarClienteDTO {
//   nome: string;
//   email: string;
//   cpf: string;
//   senha: string;
// }

// class ClienteService {
//   private clientes: Cliente[] = [];

//   public criarCliente(dados: CriarClienteDTO): Cliente {
//     const { nome, email, cpf, senha } = dados;


//     const clienteExistente = this.clientes.find(c => c.cpf === cpf);
//     if (clienteExistente) {
//       throw new Error('Cliente já cadastrado com este CPF.');
//     }

//     const novoCliente: Cliente = {
//       id: uuidv4(),
//       nome,
//       email,
//       cpf,
//       senha
//     };

//     this.clientes.push(novoCliente);

//     return novoCliente;
//   }

//   public buscarPorCpf(cpf: string): Cliente | undefined {
//     return this.clientes.find(c => c.cpf === cpf);
//   }
//   public validarLogin(cpf: string, senha: string): string {
//     const cliente = this.clientes.find(c => c.cpf === cpf);

//     if (!cliente) {
//       throw new Error('Cliente não encontrado.');
//     }

//     if (cliente.senha !== senha) {
//       throw new Error('Senha incorreta.');
//     }

//     const token = jwt.sign(
//       { id: cliente.id, cpf: cliente.cpf, email: cliente.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '1h' }
//     );

//     return token;
//   }

// }

// export const clienteService = new ClienteService();


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

  public async validarLogin(cpf: string, senha: string): Promise<Cliente> {
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
      { id: cliente.id, cpf: cliente.cpf },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    cliente.token = token;
    return cliente;
  }

  public async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    return Cliente.findOne({ where: { cpf } });
  }
}

export const clienteService = new ClienteService();