/**
 * Objeto com funções relacionadas a operações de persistência da tabela de produtos
 * @typedef {Object} ProdutoModel
 */

const db = require('../../repository/database');

const produtoModel = {
    /**
     * Retorna uma lista de todos os produtos do banco de dados.
     * @async
     * @function getProdutos
     * @memberof produtoModel
     * @returns {Promise<Array>} Array contendo todos os produtos.
     */
    getProdutos: async () => {
        const produtos = await db('produto').select('*');
        return produtos;
    },

    /**
     * Retorna um objeto produto correspondente ao ID informado.
     * @async
     * @function getProdutoById
     * @memberof produtoModel
     * @param {number} id - ID do produto desejado.
     * @returns {Promise<Object>} Objeto produto correspondente ao ID informado.
     */
    getProdutoById: async (id) => {
        const produto = await db('produto').where({ id }).select('*').first();
        return produto;
    },

    /**
     * Cria um novo produto no banco de dados com os dados informados.
     * @async
     * @function createProduto
     * @memberof produtoModel
     * @param {Object} produtoData - Dados do novo produto.
     * @returns {Promise<Object>} Objeto produto criado no banco de dados.
     */
    createProduto: async (produtoData) => {
        await db('produto').insert(produtoData);
        const produto = await db('produto').where(produtoData).first();
        return produto;
    },
    /*createProduto: async (produtoData) => {
        const [produtoId] = await db('produto').insert(produtoData).returning("id");
        const produto = await db('produto').where({ id: produtoId.id }).select('*').first();
        return produto;
    },*/

    /**
     * Atualiza os dados de um produto correspondente ao ID informado.
     * @async
     * @function updateProduto
     * @memberof produtoModel
     * @param {number} id - ID do produto a ser atualizado.
     * @param {Object} produtoData - Novos dados do produto.
     * @returns {Promise<Object>} Objeto produto atualizado no banco de dados.
     */
    updateProduto: async (id, produtoData) => {
        await db('produto').where({ id }).update(produtoData);
        const produto = await db('produto').where({ id }).select('*').first();
        return produto;
    },

    /**
     * Remove um produto correspondente ao ID informado do banco de dados.
     * @async
     * @function deleteProduto
     * @memberof produtoModel
     * @param {number} id - ID do produto a ser removido.
     * @returns {Promise<Object>} Objeto produto removido do banco de dados.
     */
    deleteProduto: async (id) => {
        const produto = await db('produto').where({ id }).select('*').first();
        await db('produto').where({ id }).delete();
        return produto;
    }

}

module.exports = produtoModel;
