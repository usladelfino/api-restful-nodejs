/**
 * Módulo de roteamento para lidar com requisições relacionadas a produtos.
 * @module produtoRouter
 */

const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('../controllers/produtoController');
const segurancaController = require('../controllers/segurancaController');

/**
 * Router do Express para lidar com as rotas relacionadas a produtos.
 * @type {object}
 * @const
 * @namespace produtoRouter
 */
const router = express.Router();

/**
 * Middleware do body-parser para permitir requisições com formato JSON.
 * @function
 * @memberof produtoRouter
 */
router.use(bodyParser.json());

/**
 * Rota para buscar todos os produtos.
 * @name getProdutos
 * @function
 * @memberof produtoRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object[]} Array contendo todos os produtos.
 */
router.get('/produtos', segurancaController.checkToken, produtoController.getProdutos);

/**
 * Rota para buscar um produto específico pelo ID.
 * @name getProdutoById
 * @function
 * @memberof produtoRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo o ID do produto.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do produto encontrado.
 */
router.get('/produtos/:id', segurancaController.checkToken, produtoController.getProdutoById);

/**
 * Rota para criar um novo produto.
 * @name createProduto
 * @function
 * @memberof produtoRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo informações do novo produto.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do novo produto criado.
 */
router.post('/produtos', segurancaController.checkToken, segurancaController.isAdmin, produtoController.createProduto);

/**
 * Rota para atualizar informações de um produto existente.
 * @name updateProduto
 * @function
 * @memberof produtoRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo o ID do produto a ser atualizado e as informações a serem atualizadas.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do produto atualizado.
 */
router.put('/produtos/:id', segurancaController.checkToken, segurancaController.isAdmin, produtoController.updateProduto);

/**
 * Rota para excluir um produto existente.
 * @name deleteProduto
 * @function
 * @memberof produtoRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo o ID do produto a ser excluído.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do produto excluído.
 */
router.delete('/produtos/:id', segurancaController.checkToken, segurancaController.isAdmin, produtoController.deleteProduto);

module.exports = router;