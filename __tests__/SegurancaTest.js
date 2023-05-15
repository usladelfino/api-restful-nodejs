const request = require('supertest');
const app = require('../src/server');

describe('Testes de integração para o recurso de Seguranca', () => {
  let usuarioId = null;

  it('Deve cadastrar um novo usuario', async () => {
    
    const response = await request(app)
      .post('/api/seguranca/register')
      .send({
        nome: 'usuario teste',
        login: 'teste',
        email: 'teste@teste.com.br',
        senha: 'teste',
        roles: 'USER'
      });

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('usuario teste');
    expect(response.body.login).toBe('teste');
    expect(response.body.email).toBe('teste@teste.com.br');
    expect(response.body.roles).toBe('USER');
    expect(response.body).toHaveProperty('id');

    usuarioId = response.body.id;
  });

  it('Deve fazer login com o novo usuario', async () => {
    
    const response = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'teste',
        senha: 'teste'
      });

    expect(response.body).toHaveProperty('token');
  });
});
