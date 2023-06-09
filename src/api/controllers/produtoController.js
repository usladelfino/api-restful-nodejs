/**
 * Módulo que contém as funções de controle para o recurso de produtos.
 * @module produtoController
 */

const produtoModel = require('../models/produto');

const produtoController = {

  /**
   * Método assíncrono que retorna todos os produtos
   * @function
   * @async
   * @name getProdutos
   * @memberof ProdutoController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com os produtos encontrados
   */
  getProdutos: async (req, res) => {
    try {
      const produtos = await produtoModel.getProdutos();
      res.json(produtos);
    } catch (err) {
      res.status(500).json({message: 'Erro ao consultar produtos - ' + err.message })
    }
  },

  /**
   * Método assíncrono que retorna um produto específico
   * @function
   * @async
   * @name getProdutoById
   * @memberof ProdutoController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com o produto encontrado ou uma mensagem de erro se o produto não for encontrado
   */
  getProdutoById: async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await produtoModel.getProdutoById(id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }
      res.json(produto);
    } catch (err) {
      res.status(500).json({message: 'Erro ao consultar produto - ' + err.message })
    }
  },
  /**
   * Método assíncrono que cria um novo produto
   * @function
   * @async
   * @name createProduto
   * @memberof ProdutoController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com o produto criado ou uma mensagem de erro se ocorrer algum problema durante a criação
   */
  createProduto: async (req, res) => {
    const produtoData = req.body;
    try {
      const produto = await produtoModel.createProduto(produtoData);
      res.status(201).json(produto);
    } catch (err) {
      res.status(500).json({message: 'Erro ao cadastrar produto - ' + err.message })
    }
  },
  /**
   * Método assíncrono que atualiza um produto existente
   * @function
   * @async
   * @name updateProduto
   * @memberof ProdutoController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com o produto atualizado ou uma mensagem de erro se o produto não for encontrado
   */
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
      res.status(500).json({message: 'Erro ao editar produto - ' + err.message })
    }
  },
  /**
 * Método assíncrono que exclui um produto existente
 * @function
 * @async
 * @name deleteProduto
 * @memberof ProdutoController
 * @param {Object} req - Objeto de solicitação HTTP
 * @param {Object} res - Objeto de resposta HTTP
 * @param {string} req.params.id - O ID do produto a ser excluído
 * @returns {Promise<void>} - Retorna uma resposta HTTP sem conteúdo (204)
 * @throws {Error} - Retorna um erro se ocorrer um erro interno do servidor
 */
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
      res.status(500).json({message: 'Erro ao excluir produto - ' + err.message })
    }
  }
}

module.exports = produtoController;
