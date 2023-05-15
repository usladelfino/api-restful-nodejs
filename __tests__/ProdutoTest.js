const request = require('supertest');
const app = require('../src/server');

describe('Testes de integração para o recurso de Produto', () => {
  let produtoId = null;

  it('Deve cadastrar um novo produto', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'admin',
        senha: '1234'
      });

    const response = await request(app)
      .post('/api/produtos')
      .auth(login.body.token, {type: "bearer"})
      .send({
        descricao: 'produto de teste',
        valor: 9.99,
        marca: 'Genérico'
      });

    expect(response.status).toBe(201);
    expect(response.body.descricao).toBe('produto de teste');
    expect(response.body.valor).toBe('9.99');
    expect(response.body.marca).toBe('Genérico');
    expect(response.body).toHaveProperty('id');

    produtoId = response.body.id;
  });

  it('Deve listar todos os produtos', async () => {
    const login = await request(app)
    .post('/api/seguranca/login')
    .send({
      login: 'usladelfino',
      senha: '1234'
    });

    const response = await request(app).get('/api/produtos').auth(login.body.token, {type: "bearer"});

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });


  it('Deve buscar um produto pelo ID', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'usladelfino',
        senha: '1234'
      });

    const response = await request(app).get(`/api/produtos/${produtoId}`).auth(login.body.token, {type: "bearer"});

    expect(response.status).toBe(200);
    expect(response.body.descricao).toBe('produto de teste');
    expect(response.body.valor).toBe("9.99");
    expect(response.body.marca).toBe('Genérico');
    expect(response.body.id).toBe(produtoId);
  });

  it('Deve atualizar um produto pelo ID', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'admin',
        senha: '1234'
      });

    const response = await request(app)
      .put(`/api/produtos/${produtoId}`)
      .auth(login.body.token, {type: "bearer"})
      .send({
        descricao: 'produto de teste alterado',
        valor: 10.99,
        marca: 'Super Genérico'
      });

    expect(response.status).toBe(200);
    expect(response.body.descricao).toBe('produto de teste alterado');
    expect(response.body.valor).toBe("10.99");
    expect(response.body.marca).toBe('Super Genérico');
    expect(response.body.id).toBe(produtoId);
  });

  it('Deve excluir um produto pelo ID', async () => {
    const login = await request(app)
      .post('/api/seguranca/login')
      .send({
        login: 'admin',
        senha: '1234'
      });
      
    const response = await request(app).delete(`/api/produtos/${produtoId}`).auth(login.body.token, {type: "bearer"});

    expect(response.status).toBe(204);
  });
});
