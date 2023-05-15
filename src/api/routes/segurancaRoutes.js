const express = require('express');
const bodyParser = require('body-parser');
const segurancaController = require('../controllers/segurancaController');

const router = express.Router();
router.use(bodyParser.json());

router.post('/seguranca/register', segurancaController.createUsuario);
router.post('/seguranca/login', segurancaController.loginUsuario);

module.exports = router;