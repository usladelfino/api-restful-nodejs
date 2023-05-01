/**
 * Módulo que contém as funções de controle para o recurso de produtos.
 * @module produtoController
 */

const produtoModel = require('../models/produto');

/**
 * Objeto que contém as funções de controle para o recurso de produtos.
 * @type {Object}
 */
const produtoController = {};

/**
 * Função de controle que retorna a lista de produtos.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
produtoController.getProdutos = (req, res) => {
  res.json(produtoModel.lista_produtos.produtos);
};

/**
 * Função de controle que retorna um produto pelo seu ID.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
produtoController.getProdutoById = (req, res) => {
  const produto = produtoModel.lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }
  res.json(produto);
};

/**
 * Função de controle que cria um novo produto.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
produtoController.createProduto = (req, res) => {
  const produto = {
    id: produtoModel.lista_produtos.produtos.length + 1,
    descricao: req.body.descricao,
    valor: req.body.valor,
    marca: req.body.marca
  };
  produtoModel.lista_produtos.produtos.push(produto);
  res.status(201).json(produto);
};

/**
 * Função de controle que atualiza um produto pelo seu ID.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
produtoController.updateProdutoById = (req, res) => {
  const produto = produtoModel.lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }
  produto.descricao = req.body.descricao;
  produto.valor = req.body.valor;
  produto.marca = req.body.marca;
  res.json(produto);
};

/**
 * Função de controle que deleta um produto pelo seu ID.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
produtoController.deleteProduto = (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtoModel.lista_produtos.produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).send('Produto não encontrado');
  }
  produtoModel.lista_produtos.produtos.splice(index, 1);
  res.status(204).send(`Produto ${id} removido com sucesso.`);
};

/**
 * Exporta o objeto com as funções de controle para o recurso de produtos.
 * @type {Object}
 */
module.exports = produtoController;