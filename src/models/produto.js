const db = require('../repository/database');

const produtoModel = {
    getProdutos: async () => {
        const produtos = await db('produto').select('*');
        return produtos;
    },
    getProdutoById: async (id) => {
        const produto = await db('produto').where({ id }).select('*').first();
        return produto;
    },
    createProduto: async (produtoData) => {
        const [produtoId] = await db('produto').insert(produtoData).returning("id");
        const produto = await db('produto').where({id : produtoId.id}).select('*').first();
        return produto;
    },
    updateProduto: async (id, produtoData) => {
        await db('produto').where({ id }).update(produtoData);
        const produto = await db('produto').where({ id }).select('*').first();
        return produto;
    },
    deleteProduto: async (id) => {
        const produto = await db('produto').where({ id }).select('*').first();
        await db('produto').where({ id }).delete();
        return produto;
    }
}

module.exports = produtoModel;
