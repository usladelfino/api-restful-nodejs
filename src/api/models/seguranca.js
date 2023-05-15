const db = require('../../repository/database');

const segurancaModel = {
    
    createUsuario: async (usuarioData) => {
        await db('usuario').insert(usuarioData);
        const produto = await db('usuario').where(usuarioData).first();
        return produto;
    },
    getUsuarioByLogin: async (login) => {
        const usuario = await db('usuario').select('*').where( { login: login }).first();
        return usuario;   
    },
    getUsuarioById: async (id) => {
        const usuario = await db('usuario').select('*').where( { id: id }).first();
        return usuario;   
    }
}

module.exports = segurancaModel;
