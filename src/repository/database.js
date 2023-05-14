/**
 * Configuração do banco de dados da aplicação.
 * @module database
 */

const knex = require('knex');
require('dotenv').config();

/**
 * Objeto de conexão com o banco de dados.
 * @type {object}
 * @const
 * @namespace database
 * @property {string} client - Cliente de banco de dados a ser utilizado (neste caso, PostgreSQL).
 * @property {object} connection - Configurações de conexão com o banco de dados.
 * @property {string} connection.host - Endereço do servidor de banco de dados.
 * @property {number} connection.port - Porta de conexão com o servidor de banco de dados.
 * @property {string} connection.user - Nome de usuário para autenticação no banco de dados.
 * @property {string} connection.password - Senha para autenticação no banco de dados.
 * @property {string} connection.database - Nome do banco de dados a ser utilizado.
 */
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

module.exports = db;