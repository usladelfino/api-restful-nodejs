const app = require('./server');
const request = require('supertest');

describe('Testes da API de Produtos', () => {
    let idProduto;

    test('Deve retornar uma lista de produtos', async () => {
      const response = await request(app).get('/produtos');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    test('Deve retornar um produto específico', async () => {
      const response = await request(app).get('/produtos/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.descricao).toBe('Arroz parboilizado 5Kg');
    });
  
    test('Deve adicionar um novo produto', async () => {
      const novoProduto = {
        descricao: 'Feijão carioca 1Kg',
        valor: 10.00,
        marca: 'Tio Zezé'
      };
  
      const response = await request(app).post('/produtos').send(novoProduto);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.descricao).toBe(novoProduto.descricao);
  
      idProduto = response.body.id;
    });
  
    test('Deve atualizar um produto existente', async () => {
      const produtoAtualizado = {
        descricao: 'Feijão carioca 2Kg',
        valor: 15.00,
        marca: 'Tio Zezé'
      };
  
      const response = await request(app).put(`/produtos/${idProduto}`).send(produtoAtualizado);
      expect(response.statusCode).toBe(200);
      expect(response.body.descricao).toBe(produtoAtualizado.descricao);
      expect(response.body.valor).toBe(produtoAtualizado.valor);
      expect(response.body.marca).toBe(produtoAtualizado.marca);
    });
  
    test('Deve remover um produto existente', async () => {
      const response = await request(app).delete(`/produtos/${idProduto}`);
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(`Produto ${idProduto} removido com sucesso.`);
    });
  });