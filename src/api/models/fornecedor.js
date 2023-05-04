/**
 * Objeto com funções relacionadas a operações de persistência da tabela de fornecedores
 * @typedef {Object} FornecedorModel
 */

const db = require('../../repository/database');

/** @type {FornecedorModel} */
const fornecedorModel = {
   /**
     * Retorna uma lista de todos os fornecedores do banco de dados.
     * @async
     * @function getFornecedores
     * @memberof fornecedorModel
     * @returns {Promise<Array>} Array contendo todos os fornecedores.
     */
    getFornecedores: async () => {
        const fornecedores = await db('fornecedor').select('*');
        return fornecedores;
    },

     /**
     * Retorna um objeto fornecedor correspondente ao ID informado.
     * @async
     * @function getFornecedorById
     * @memberof fornecedorModel
     * @param {number} id - ID do fornecedor desejado.
     * @returns {Promise<Object>} Objeto fornecedor correspondente ao ID informado.
     */
    getFornecedorById: async (id) => {
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        return fornecedor;
    },

    /**
     * Cria um novo fornecedor no banco de dados com os dados informados.
     * @async
     * @function createFornecedor
     * @memberof fornecedorModel
     * @param {Object} fornecedorData - Dados do novo fornecedor.
     * @returns {Promise<Object>} Objeto fornecedor criado no banco de dados.
     */
    createFornecedor: async (fornecedorData) => {
        const [fornecedorId] = await db('fornecedor').insert(fornecedorData).returning("id");
        const fornecedor = await db('fornecedor').where({ id: fornecedorId.id }).select('*').first();
        return fornecedor;
    },

     /**
     * Atualiza os dados de um fornecedor correspondente ao ID informado.
     * @async
     * @function updateFornecedor
     * @memberof fornecedorModel
     * @param {number} id - ID do fornecedor a ser atualizado.
     * @param {Object} fornecedorData - Novos dados do fornecedor.
     * @returns {Promise<Object>} Objeto fornecedor atualizado no banco de dados.
     */
    updateFornecedor: async (id, fornecedorData) => {
        await db('fornecedor').where({ id }).update(fornecedorData);
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        return fornecedor;
    },

     /**
     * Remove um fornecedor correspondente ao ID informado do banco de dados.
     * @async
     * @function deleteFornecedor
     * @memberof fornecedorModel
     * @param {number} id - ID do fornecedor a ser removido.
     * @returns {Promise<Object>} Objeto fornecedor removido do banco de dados.
     */
    deleteFornecedor: async (id) => {
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        await db('fornecedor').where({ id }).delete();
        return fornecedor;
    }
};

module.exports = fornecedorModel;