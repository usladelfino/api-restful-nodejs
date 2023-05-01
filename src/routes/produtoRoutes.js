const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.use(bodyParser.json());

router.get('/', produtoController.getProdutos);
router.get('/:id', produtoController.getProdutoById);
router.post('/', produtoController.createProduto);
router.put('/:id', produtoController.updateProdutoById);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;