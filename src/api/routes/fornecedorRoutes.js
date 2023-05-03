/**

Módulo que define as rotas para manipulação dos recursos relacionados a fornecedores.
@module routes/fornecedorRoutes
*/

const express = require('express');
const bodyParser = require('body-parser');
const fornecedorController = require('../controllers/fornecedorController');
const router = express.Router();

router.use(bodyParser.json());

router.get('/fornecedores', fornecedorController.getfornecedores);
router.get('/fornecedores/:id', fornecedorController.getfornecedorById);
router.post('/fornecedores', fornecedorController.createfornecedor);
router.put('/fornecedores/:id', fornecedorController.updatefornecedor);
router.delete('/fornecedores/:id', fornecedorController.deletefornecedor);

module.exports = router;