/**
 * Objeto com funções relacionadas a operações de persistência da tabela de fornecedores
 * @typedef {Object} FornecedorModel
 */

const db = require('../../repository/database');

/** @type {FornecedorModel} */
const fornecedorModel = {
    /**
     * Retorna uma lista de todos os fornecedores cadastrados no banco de dados
     * @returns {Promise<Object[]>} Lista de objetos contendo informações dos fornecedores
     */
    getfornecedores: async () => {
        const fornecedores = await db('fornecedor').select('*');
        return fornecedores;
    },

    /**
     * Retorna as informações do fornecedor com o id informado
     * @param {number} id - Id do fornecedor
     * @returns {Promise<Object>} Objeto contendo as informações do fornecedor
     */
    getfornecedorById: async (id) => {
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        return fornecedor;
    },

    /**
     * Insere um novo fornecedor no banco de dados
     * @param {Object} fornecedorData - Objeto contendo as informações do novo fornecedor
     * @returns {Promise<Object>} Objeto contendo as informações do novo fornecedor inserido no banco de dados
     */
    createfornecedor: async (fornecedorData) => {
        const [fornecedorId] = await db('fornecedor').insert(fornecedorData).returning("id");
        const fornecedor = await db('fornecedor').where({ id: fornecedorId.id }).select('*').first();
        return fornecedor;
    },

    /**
     * Atualiza as informações do fornecedor com o id informado
     * @param {number} id - Id do fornecedor
     * @param {Object} fornecedorData - Objeto contendo as novas informações do fornecedor
     * @returns {Promise<Object>} Objeto contendo as informações atualizadas do fornecedor
     */
    updatefornecedor: async (id, fornecedorData) => {
        await db('fornecedor').where({ id }).update(fornecedorData);
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        return fornecedor;
    },

    /**
     * Remove o fornecedor com o id informado do banco de dados
     * @param {number} id - Id do fornecedor
     * @returns {Promise<Object>} Objeto contendo as informações do fornecedor removido do banco de dados
     */
    deletefornecedor: async (id) => {
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        await db('fornecedor').where({ id }).delete();
        return fornecedor;
    }
};

module.exports = fornecedorModel;