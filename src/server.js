/**
 * Módulo principal da aplicação web.
 * @module server
 */

const express = require('express');
const cors = require('cors');
const path = require ('path');
const produtoRoutes = require('./api/routes/produtoRoutes');
const fornecedorRoutes = require('./api/routes/fornecedorRoutes');

const app = express();

/**
 * Porta para a API. Pode ser definida pela variável de ambiente API_PORT ou padrão para 3000.
 * @type {number}
 */
const apiPort = process.env.API_PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/app', express.static (path.join (__dirname, '/public')));
app.use('/api', produtoRoutes);
app.use('/api', fornecedorRoutes);

/**
 * Inicia o servidor de API e o servidor de documentação (exceto em modo de teste).
 */
if (process.env.NODE_ENV !== 'test') {
    app.listen(apiPort, () => {
        console.log(`Servidor de API iniciado na porta ${apiPort}`);
    });
}

module.exports = app;