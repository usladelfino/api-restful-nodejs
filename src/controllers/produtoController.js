const produtoModel = require('../models/produto');

const produtoController = {};

produtoController.getProdutos = (req, res) => {
  res.json(produtoModel.lista_produtos.produtos);
};

produtoController.getProdutoById = (req, res) => {
  const produto = produtoModel.lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
      return res.status(404).send('Produto não encontrado');
  }
  res.json(produto);
};

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

produtoController.deleteProduto = (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtoModel.lista_produtos.produtos.findIndex(p => p.id === id);
  if (index === -1) {
      return res.status(404).send('Produto não encontrado');
  }
  produtoModel.lista_produtos.produtos.splice(index, 1);
  res.status(204).send(`Produto ${ id } removido com sucesso.`);
};

module.exports = produtoController;
