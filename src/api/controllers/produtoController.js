/**
 * Módulo que contém as funções de controle para o recurso de produtos.
 * @module produtoController
 */

const produtoModel = require('../models/produto');

const produtoController = {
  getProdutos: async (req, res) => {
    try {
      const produtos = await produtoModel.getProdutos();
      res.json(produtos);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  getProdutoById: async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await produtoModel.getProdutoById(id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }
      res.json(produto);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  createProduto: async (req, res) => {
    const produtoData = req.body;
    try {
      const produto = await produtoModel.createProduto(produtoData);
      res.status(201).json(produto);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  updateProduto: async (req, res) => {
    const { id } = req.params;
    const ProdutoData = req.body;
    try {
      const produto = await produtoModel.getProdutoById(id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }
      const updatedProduto = await produtoModel.updateProduto(id, ProdutoData);
      res.json(updatedProduto);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  deleteProduto: async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await produtoModel.getProdutoById(id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }
      const deletedProduto = await produtoModel.deleteProduto(id);
      res.status(204).json(deletedProduto);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = produtoController;
