/**

Módulo que define as rotas para manipulação dos recursos relacionados a produtos.
@module routes/produtoRoutes
*/

const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.use(bodyParser.json());

router.get('/produtos', produtoController.getProdutos);
router.get('/produtos/:id', produtoController.getProdutoById);
router.post('/produtos', produtoController.createProduto);
router.put('/produtos/:id', produtoController.updateProduto);
router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;