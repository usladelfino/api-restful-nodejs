const request = require('supertest');
const app = require("../src/server");

describe('Testando as rotas do produto', () => {
  test('Deve criar um novo produto', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({
        descricao: 'Produto de Teste',
        valor: 9.99,
        marca: 'Marca de Teste'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('descricao', 'Produto de Teste');
    expect(response.body).toHaveProperty('valor', 9.99);
    expect(response.body).toHaveProperty('marca', 'Marca de Teste');
  });

  test('Deve retornar uma lista com todos os produtos', async () => {
    const response = await request(app).get('/produtos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Deve retornar um produto com um id específico', async () => {
    const response = await request(app).get('/produtos/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('descricao', 'Arroz parboilizado 5Kg');
    expect(response.body).toHaveProperty('valor', 25.00);
    expect(response.body).toHaveProperty('marca', 'Tio João');
  });

  test('Deve atualizar um produto com um id específico', async () => {
    const response = await request(app)
      .put('/produtos/1')
      .send({
        descricao: 'Produto Genérico',
        valor: 19.99,
        marca: 'Marca Genérica'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('descricao', 'Produto Genérico');
    expect(response.body).toHaveProperty('valor', 19.99);
    expect(response.body).toHaveProperty('marca', 'Marca Genérica');
  });

  test('Deve deletar um produto com um id específico', async () => {
    const response = await request(app).delete('/produtos/1');
    expect(response.statusCode).toBe(204);
  });
});
