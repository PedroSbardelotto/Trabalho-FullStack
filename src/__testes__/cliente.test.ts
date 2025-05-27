import request from 'supertest';
import app from '../app';

describe('Testes para Cliente', () => {

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
  });

  it('Não deve permitir criar cliente com mesmo CPF', async () => {
    await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Maria Teste',
        email: 'maria.teste@example.com',
        cpf: '98765432100',
        senha: 'senha123'
      });

    const response = await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Maria Teste',
        email: 'maria.teste@example.com',
        cpf: '98765432100',
        senha: 'senha123'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Cliente já cadastrado');
  });

  it('Deve realizar o login do cliente', async () => {
    await request(app)
      .post('/api/clientes')
      .send({
        nome: 'Carlos Teste',
        email: 'carlos.teste@example.com',
        cpf: '11122233344',
        senha: 'senha456'
      });

    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'carlos.teste@example.com',
        senha: 'senha456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

});
