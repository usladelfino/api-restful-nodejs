const db = require('../../repository/database');

const fornecedorModel = {
    getfornecedores: async () => {
        const fornecedors = await db('fornecedor').select('*');
        return fornecedors;
    },
    getfornecedorById: async (id) => {
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        return fornecedor;
    },
    createfornecedor: async (fornecedorData) => {
        const [fornecedorId] = await db('fornecedor').insert(fornecedorData).returning("id");
        const fornecedor = await db('fornecedor').where({id : fornecedorId.id}).select('*').first();
        return fornecedor;
    },
    updatefornecedor: async (id, fornecedorData) => {
        await db('fornecedor').where({ id }).update(fornecedorData);
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        return fornecedor;
    },
    deletefornecedor: async (id) => {
        const fornecedor = await db('fornecedor').where({ id }).select('*').first();
        await db('fornecedor').where({ id }).delete();
        return fornecedor;
    }
}

module.exports = fornecedorModel;
