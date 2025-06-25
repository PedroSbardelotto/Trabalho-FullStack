import request from 'supertest';
import app from '../app';
import database from '../database';
import { Cliente } from '../models/Cliente';

describe('Testes de Integração para Cliente', () => {

  // Hook que roda ANTES de TODOS os testes do arquivo
  beforeAll(async () => {
    // Conecta ao banco de dados e sincroniza os modelos
    await database.connection.sync({ force: true });
  });

  // Hook que roda ANTES de CADA teste (it)
  beforeEach(async () => {
    // Limpa a tabela de clientes para garantir que cada teste comece do zero
    await Cliente.destroy({ where: {}, truncate: true });
  });

  // Hook que roda DEPOIS de TODOS os testes do arquivo
  afterAll(async () => {
    // Fecha a conexão com o banco de dados
    await database.connection.close();
  });

  it('Deve criar um novo cliente com sucesso', async () => {
    const response = await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Maria Teste',
        email: 'maria.teste@example.com',
        cpf: '98765432100',
        senha: 'senha123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensagem', 'Cliente criado com sucesso');

    // Opcional: Verifica se o cliente foi realmente salvo no banco
    const clienteNoBanco = await Cliente.findOne({ where: { cpf: '98765432100' } });
    expect(clienteNoBanco).not.toBeNull();
  });

  it('Não deve permitir criar um cliente com um CPF já cadastrado', async () => {
    // 1. Cria um cliente inicial para o teste
    await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Maria Original',
        email: 'maria.original@example.com',
        cpf: '98765432100',
        senha: 'senha123'
      });

    // 2. Tenta criar um segundo cliente com o mesmo CPF
    const response = await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Maria Duplicada',
        email: 'maria.duplicada@example.com',
        cpf: '98765432100', // Mesmo CPF
        senha: 'senha123'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Cliente já cadastrado com este CPF.');
  });

  it('Deve realizar o login de um cliente com sucesso', async () => {
    // 1. Cria o cliente que tentará fazer login
    await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Carlos Teste',
        email: 'carlos.teste@example.com',
        cpf: '11122233344',
        senha: 'senha456'
      });

    // 2. Tenta fazer o login com as credenciais corretas
    const response = await request(app)
      .post('/api/login')
      .send({
        cpf: '11122233344', // Note que o login agora usa CPF, conforme refatoramos
        senha: 'senha456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Não deve realizar o login com senha incorreta', async () => {
    // 1. Cria o cliente
    await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Carlos Teste',
        email: 'carlos.teste@example.com',
        cpf: '11122233344',
        senha: 'senha456'
      });

    // 2. Tenta fazer login com a senha errada
    const response = await request(app)
      .post('/api/login')
      .send({
        cpf: '11122233344',
        senha: 'senha_errada'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Senha incorreta.');
  });
});
