import request from 'supertest';
import app from '../app';

describe('Cliente', () => {
  it('deve cadastrar um cliente', async () => {
    const res = await request(app).post('/api/clientes').send({
      nome: 'João',
      email: 'joao@email.com',
      cpf: '12345678900',
      senha: '123456',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});