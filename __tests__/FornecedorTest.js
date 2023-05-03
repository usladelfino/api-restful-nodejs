const request = require('supertest');
const app = require('../src/server');

describe('Testes de integração para o recurso de fornecedor', () => {
  let fornecedorId = null;

  it('Deve cadastrar um novo fornecedor', async () => {
    const response = await request(app)
      .post('/api/fornecedores')
      .send({
        nome: 'fornecedor de teste',
        endereco: 'Rua Conde de Bonfim, 255, Tijuca',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        telefone: '(21) 99999-9999',
        email: 'teste@teste.com.br'
      });

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('fornecedor de teste');
    expect(response.body.endereco).toBe('Rua Conde de Bonfim, 255, Tijuca');
    expect(response.body.cidade).toBe('Rio de Janeiro');
    expect(response.body.estado).toBe('RJ');
    expect(response.body.telefone).toBe('(21) 99999-9999');
    expect(response.body.email).toBe('teste@teste.com.br');
    expect(response.body).toHaveProperty('id');

    fornecedorId = response.body.id;
  });

  it('Deve listar todos os fornecedores', async () => {
    const response = await request(app).get('/api/fornecedores');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  
  it('Deve buscar um fornecedor pelo ID', async () => {
    const response = await request(app).get(`/api/fornecedores/${fornecedorId}`);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('fornecedor de teste');
    expect(response.body.endereco).toBe('Rua Conde de Bonfim, 255, Tijuca');
    expect(response.body.cidade).toBe('Rio de Janeiro');
    expect(response.body.estado).toBe('RJ');
    expect(response.body.telefone).toBe('(21) 99999-9999');
    expect(response.body.email).toBe('teste@teste.com.br');
    expect(response.body.id).toBe(fornecedorId);
  });

  it('Deve atualizar um fornecedor pelo ID', async () => {
    const response = await request(app)
      .put(`/api/fornecedores/${fornecedorId}`)
      .send({
        nome: 'fornecedor de teste alterado',
        endereco: 'Rua Conde de Bonfim, 255, Tijuca',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        telefone: '(21) 88888-8888',
        email: 'fornecedor-teste@teste.com.br'
      });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('fornecedor de teste alterado');
    expect(response.body.endereco).toBe('Rua Conde de Bonfim, 255, Tijuca');
    expect(response.body.cidade).toBe('Rio de Janeiro');
    expect(response.body.estado).toBe('RJ');
    expect(response.body.telefone).toBe('(21) 88888-8888');
    expect(response.body.email).toBe('fornecedor-teste@teste.com.br');
    expect(response.body.id).toBe(fornecedorId);
  });

  it('Deve excluir um fornecedor pelo ID', async () => {
    const response = await request(app).delete(`/api/fornecedores/${fornecedorId}`);

    expect(response.status).toBe(204);
  });
});
