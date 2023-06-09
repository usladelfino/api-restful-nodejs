/**
 * Módulo que contém as funções de controle para o recurso de fornecedores.
 * @module fornecedorController
 */

const fornecedorModel = require('../models/fornecedor');

const fornecedorController = {

  /**
   * Método assíncrono que retorna todos os fornecedores
   * @function
   * @async
   * @name getFornecedores
   * @memberof FornecedorController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com os fornecedores encontrados
   */
  getFornecedores: async (req, res) => {
    try {
      const fornecedores = await fornecedorModel.getFornecedores();
      res.json({success: true, fornecedores});
    } catch (err) {
      res.status(500).json({success: false, message: 'Erro ao consultar fornecedores - ' + err.message })
    }
  },

  /**
   * Método assíncrono que retorna um fornecedor específico
   * @function
   * @async
   * @name getFornecedorById
   * @memberof FornecedorController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com o fornecedor encontrado ou uma mensagem de erro se o fornecedor não for encontrado
   */
  getFornecedorById: async (req, res) => {
    const { id } = req.params;
    try {
      const fornecedor = await fornecedorModel.getFornecedorById(id);
      if (!fornecedor) {
        return res.status(404).send('Fornecedor não encontrado');
      }
      res.json({success: true, fornecedor});
    } catch (err) {
      res.status(500).json({success: false, message: 'Erro ao consultar fornecedor - ' + err.message })
    }
  },
  /**
   * Método assíncrono que cria um novo fornecedor
   * @function
   * @async
   * @name createFornecedor
   * @memberof FornecedorController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com o fornecedor criado ou uma mensagem de erro se ocorrer algum problema durante a criação
   */
  createFornecedor: async (req, res) => {
    const fornecedorData = req.body;
    try {
      const fornecedor = await fornecedorModel.createFornecedor(fornecedorData);
      res.status(201).json({success: true, fornecedor});
    } catch (err) {
      res.status(500).json({success: false, message: 'Erro ao cadastrar fornecedor - ' + err.message })
    }
  },
  /**
   * Método assíncrono que atualiza um fornecedor existente
   * @function
   * @async
   * @name updateFornecedor
   * @memberof FornecedorController
   * @param {Request} req - Objeto de requisição do Express
   * @param {Response} res - Objeto de resposta do Express
   * @returns {Promise<void>} - Não retorna nada, apenas envia uma resposta JSON com o fornecedor atualizado ou uma mensagem de erro se o fornecedor não for encontrado
   */
  updateFornecedor: async (req, res) => {
    const { id } = req.params;
    const FornecedorData = req.body;
    try {
      const fornecedor = await fornecedorModel.getFornecedorById(id);
      if (!fornecedor) {
        return res.status(404).send('Fornecedor não encontrado');
      }
      const updatedFornecedor = await fornecedorModel.updateFornecedor(id, FornecedorData);
      res.status(200).json({success: true, updatedFornecedor});
    } catch (err) {
      res.status(500).json({success: false, message: 'Erro ao editar dados do fornecedor - ' + err.message })
    }
  },
  /**
 * Método assíncrono que exclui um fornecedor existente
 * @function
 * @async
 * @name deleteFornecedor
 * @memberof FornecedorController
 * @param {Object} req - Objeto de solicitação HTTP
 * @param {Object} res - Objeto de resposta HTTP
 * @param {string} req.params.id - O ID do fornecedor a ser excluído
 * @returns {Promise<void>} - Retorna uma resposta HTTP sem conteúdo (204)
 * @throws {Error} - Retorna um erro se ocorrer um erro interno do servidor
 */
  deleteFornecedor: async (req, res) => {
    const { id } = req.params;
    try {
      const fornecedor = await fornecedorModel.getFornecedorById(id);

      if (!fornecedor) {
        return res.status(404).send('Fornecedor não encontrado');
      }
      const deletedFornecedor = await fornecedorModel.deleteFornecedor(id);

      res.status(204).json({sucess: true});
    } catch (err) {
      res.status(500).json({sucess: false, message: 'Erro ao excluir fornecedor - ' + err.message })
    }
  }
}

module.exports = fornecedorController;
