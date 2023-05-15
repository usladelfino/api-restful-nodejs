const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const segurancaModel = require('../models/seguranca');


const segurancaController = {

    createUsuario: async (req, res) => {
        let usuarioData = req.body;
        usuarioData.senha = bcrypt.hashSync(usuarioData.senha, 8);

        try {
            const usuario = await segurancaModel.createUsuario(usuarioData);
            res.status(201).json(usuario);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao registrar usuario - ' + err.message })
        }
    },
    loginUsuario: async (req, res) => {
        try {
            let usuario = await segurancaModel.getUsuarioByLogin(req.body.login);
            let checkSenha = bcrypt.compareSync(req.body.senha, usuario.senha);

            if (checkSenha) {
                var tokenJWT = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: 3600 });
                usuario.token = tokenJWT;
                res.status(200).json({token: usuario.token});
                return;
            }

            res.status(200).json({ message: 'Login ou senha incorretos.' });
        } catch (err) {
            res.status(500).json({ message: 'Erro na tentativa de login - ' + err.message })
        }
    },
    checkToken: async (req, res, next) => {
        let authToken = req.headers["authorization"];
        if (!authToken) {
            res.status(401).json({ message: 'Token de acesso requerido' });
            return;
        }
        else {
            let token = authToken.split(' ')[1];
            req.token = token;
        }
        jwt.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => {
            if (err) {
                res.status(401).json({ message: 'Acesso negado' });
                return;
            }
            req.usuarioId = decodeToken.id;
            next();
        })
    },
    isAdmin: async (req, res, next) => {
        try {
            const id = req.usuarioId;
            let usuario = await segurancaModel.getUsuarioById(id);
            let roles = usuario.roles.split(';');
            let adminRole = roles.find(i => i === 'ADMIN');

            if (adminRole === 'ADMIN') {
                next();
                return;
            }
            else {
                res.status(403).json({ message: 'Role de ADMIN requerida' })
                return;
            }
        } catch (err) {
            res.status(500).json({
                message: 'Erro ao verificar roles de usuário - ' + err.message
            });
        }
    }
}

module.exports = segurancaController;
