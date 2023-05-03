/**
 * @file server.js é o arquivo principal da aplicação
 * @requires http
 * @requires serve-static
 * @requires express
 * @requires produtoRoutes
 * @module server
 */

const http = require('http');
const serveStatic = require('serve-static');
const express = require('express');
const produtoRoutes = require('./api/routes/produtoRoutes');

const app = express();

/** @constant {number} apiPort - Porta utilizada pela API */
const apiPort = process.env.API_PORT || 3000;
/** @constant {number} jsdocPort - Porta utilizada pela documentação */
const jsdocPort = process.env.JSDOC_PORT || 80;

/** 
 * @constant {Function} serve 
 * @description Middleware que serve os arquivos estáticos da documentação
 */
const serve = serveStatic('./docs', { 'index': ['index.html'] });

/** 
 * @description Utiliza as rotas definidas em produtoRoutes para a rota '/produtos'
 */
app.use('/api', produtoRoutes);

/** 
 * @constant {Object} server
 * @description Cria servidor HTTP para lidar com as requisições de arquivos estáticos
 */
const server = http.createServer((req, res) => {
    serve(req, res, () => {
        res.statusCode = 404;
        res.end('404 Not Found');
    });
});

/** 
 * @description Inicia servidor de API e servidor de documentação, caso não esteja em modo de teste
 */
if (process.env.NODE_ENV !== 'test') {
    app.listen(apiPort, () => {
        console.log(`Servidor de API iniciado na porta ${apiPort}`);
    });

    server.listen(jsdocPort, () => {
        console.log(`Servidor de documentação iniciado na porta ${jsdocPort}`);
    });
}

/** 
 * @description Exporta objeto app para uso em outros módulos
 * @type {Object}
 */
module.exports = app;