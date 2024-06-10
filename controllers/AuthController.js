const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await Admin.findOne({ where: { email } }) || await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(401).send('Email ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).send('Email ou senha inválidos');
        }

        req.session.userId = user.id;
        req.session.isAdmin = user instanceof Admin;
        res.redirect(req.session.isAdmin ? '/admin/dashboard' : '/user/dashboard');
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).send('Ocorreu um erro durante o login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout');
        }
        res.redirect('/');
    });
};
