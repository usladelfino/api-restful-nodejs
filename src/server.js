/**
 * Módulo principal da aplicação web.
 * @module index
 */

const http = require('http');
const serveStatic = require('serve-static');
const express = require('express');
const produtoRoutes = require('./api/routes/produtoRoutes');
const fornecedorRoutes = require('./api/routes/fornecedorRoutes');

const app = express();

/**
 * Porta para a API. Pode ser definida pela variável de ambiente API_PORT ou padrão para 3000.
 * @type {number}
 */
const apiPort = process.env.API_PORT || 3000;

/**
 * Porta para o servidor de documentação. Pode ser definida pela variável de ambiente JSDOC_PORT ou padrão para 80.
 * @type {number}
 */
const jsdocPort = process.env.JSDOC_PORT || 80;

/**
 * Middleware para servir arquivos estáticos da documentação JSDoc.
 * @type {function}
 */
const serve = serveStatic('./docs', { 'index': ['index.html'] });

app.use('/api', produtoRoutes);
app.use('/api', fornecedorRoutes);

/**
 * Servidor HTTP para o middleware de arquivos estáticos.
 * @type {http.Server}
 */
const server = http.createServer((req, res) => {
    serve(req, res, () => {
        res.statusCode = 404;
        res.end('404 Not Found');
    });
});

/**
 * Inicia o servidor de API e o servidor de documentação (exceto em modo de teste).
 */
if (process.env.NODE_ENV !== 'test') {
    app.listen(apiPort, () => {
        console.log(`Servidor de API iniciado na porta ${apiPort}`);
    });

    server.listen(jsdocPort, () => {
        console.log(`Servidor de documentação iniciado na porta ${jsdocPort}`);
    });
}

module.exports = app;