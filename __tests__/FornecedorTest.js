const request = require('supertest');
const app = require('../src/server');

describe('Testes de integração para o recurso de fornecedor', () => {
  let fornecedorId = null;

  it('Deve cadastrar um novo fornecedor', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'admin',
        senha: '1234'
      });

    const response = await request(app)
      .post('/api/fornecedores')
      .auth(login.body.token, {type: "bearer"})
      .send({
        nome: 'fornecedor de teste',
        endereco: 'Rua Conde de Bonfim, 255, Tijuca',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        telefone: '(21) 99999-9999',
        email: 'teste@teste.com.br'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.fornecedor.nome).toBe('fornecedor de teste');
    expect(response.body.fornecedor.endereco).toBe('Rua Conde de Bonfim, 255, Tijuca');
    expect(response.body.fornecedor.cidade).toBe('Rio de Janeiro');
    expect(response.body.fornecedor.estado).toBe('RJ');
    expect(response.body.fornecedor.telefone).toBe('(21) 99999-9999');
    expect(response.body.fornecedor.email).toBe('teste@teste.com.br');
    expect(response.body.fornecedor).toHaveProperty('id');

    fornecedorId = response.body.fornecedor.id;
  });

  it('Deve listar todos os fornecedores', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'usladelfino',
        senha: '1234'
      });

    const response = await request(app).get('/api/fornecedores').auth(login.body.token, {type: "bearer"});

    expect(response.status).toBe(200);
    expect(response.body.fornecedores).toBeInstanceOf(Array);
    expect(response.body.fornecedores.length).toBeGreaterThan(0);
  });

  
  it('Deve buscar um fornecedor pelo ID', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'usladelfino',
        senha: '1234'
      });

    const response = await request(app).get(`/api/fornecedores/${fornecedorId}`).auth(login.body.token, {type: "bearer"});

    expect(response.status).toBe(200);
    expect(response.body.fornecedor.nome).toBe('fornecedor de teste');
    expect(response.body.fornecedor.endereco).toBe('Rua Conde de Bonfim, 255, Tijuca');
    expect(response.body.fornecedor.cidade).toBe('Rio de Janeiro');
    expect(response.body.fornecedor.estado).toBe('RJ');
    expect(response.body.fornecedor.telefone).toBe('(21) 99999-9999');
    expect(response.body.fornecedor.email).toBe('teste@teste.com.br');
    expect(response.body.fornecedor.id).toBe(fornecedorId);
  });

  it('Deve atualizar um fornecedor pelo ID', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'admin',
        senha: '1234'
      });

    const response = await request(app)
      .put(`/api/fornecedores/${fornecedorId}`)
      .auth(login.body.token, {type: "bearer"})
      .send({
        nome: 'fornecedor de teste alterado',
        endereco: 'Rua Conde de Bonfim, 255, Tijuca',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        telefone: '(21) 88888-8888',
        email: 'fornecedor-teste@teste.com.br'
      });

    expect(response.status).toBe(200);
    expect(response.body.updatedFornecedor.nome).toBe('fornecedor de teste alterado');
    expect(response.body.updatedFornecedor.endereco).toBe('Rua Conde de Bonfim, 255, Tijuca');
    expect(response.body.updatedFornecedor.cidade).toBe('Rio de Janeiro');
    expect(response.body.updatedFornecedor.estado).toBe('RJ');
    expect(response.body.updatedFornecedor.telefone).toBe('(21) 88888-8888');
    expect(response.body.updatedFornecedor.email).toBe('fornecedor-teste@teste.com.br');
    expect(response.body.updatedFornecedor.id).toBe(fornecedorId);
  });

  it('Deve excluir um fornecedor pelo ID', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'admin',
        senha: '1234'
      });
      
    const response = await request(app).delete(`/api/fornecedores/${fornecedorId}`).auth(login.body.token, {type: "bearer"});

    expect(response.status).toBe(204);
  });
});
