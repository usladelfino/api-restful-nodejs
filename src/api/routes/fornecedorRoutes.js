/**
 * Módulo de roteamento para lidar com requisições relacionadas a fornecedores.
 * @module fornecedorRouter
 */

const express = require('express');
const bodyParser = require('body-parser');
const fornecedorController = require('../controllers/fornecedorController');
const segurancaController = require('../controllers/segurancaController');


/**
 * Router do Express para lidar com as rotas relacionadas a fornecedores.
 * @type {object}
 * @const
 * @namespace fornecedorRouter
 */
const router = express.Router();

/**
 * Middleware do body-parser para permitir requisições com formato JSON.
 * @function
 * @memberof fornecedorRouter
 */
router.use(bodyParser.json());

/**
 * Rota para buscar todos os fornecedores.
 * @name getfornecedores
 * @function
 * @memberof fornecedorRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object[]} Array contendo todos os fornecedores.
 */
router.get('/fornecedores', segurancaController.checkToken, fornecedorController.getFornecedores);
/**
 * Rota para buscar um fornecedor específico pelo ID.
 * @name getfornecedorById
 * @function
 * @memberof fornecedorRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo o ID do fornecedor.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do fornecedor encontrado.
 */
router.get('/fornecedores/:id', segurancaController.checkToken, fornecedorController.getFornecedorById);

/**
 * Rota para criar um novo fornecedor.
 * @name createfornecedor
 * @function
 * @memberof fornecedorRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo informações do novo fornecedor.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do novo fornecedor criado.
 */
router.post('/fornecedores', segurancaController.checkToken, segurancaController.isAdmin, fornecedorController.createFornecedor);

/**
 * Rota para atualizar informações de um fornecedor existente.
 * @name updatefornecedor
 * @function
 * @memberof fornecedorRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo o ID do fornecedor a ser atualizado e as informações a serem atualizadas.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do fornecedor atualizado.
 */
router.put('/fornecedores/:id', segurancaController.checkToken, segurancaController.isAdmin, fornecedorController.updateFornecedor);

/**
 * Rota para excluir um fornecedor existente.
 * @name deletefornecedor
 * @function
 * @memberof fornecedorRouter
 * @inner
 * @param {Object} req - Objeto de requisição HTTP contendo o ID do fornecedor a ser excluído.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {function} next - Próxima função de middleware a ser executada.
 * @returns {Object} Objeto contendo informações do fornecedor excluído.
 */
router.delete('/fornecedores/:id', segurancaController.checkToken, segurancaController.isAdmin, fornecedorController.deleteFornecedor);

module.exports = router;