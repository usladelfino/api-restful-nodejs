const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: 'usladelfino.vps.webdock.cloud',
    port: 5432,
    user: 'postgres',
    password: 'p0$tgr3$',
    database: 'postgres'
  }
});


module.exports = db;
