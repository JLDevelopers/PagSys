const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Pagamento = require('../models/Pagamento');

// Middleware para verificar a sessão do administrador
const isAuthenticated = (req, res, next) => {
    if (req.session.adminId) {
        return next();
    } else {
        return res.redirect('/admin/login');
    }
};

exports.getLogin = (req, res) => {
    res.render('admin/login');
};

exports.postLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(401).send('Email ou senha inválidos');
        }

        const match = await bcrypt.compare(senha, admin.senha);
        if (match) {
            req.session.adminId = admin.id;
            return res.redirect('/admin/dashboard');
        } else {
            return res.status(401).send('Email ou senha inválidos');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro no servidor');
    }
};

exports.getDashboard = [isAuthenticated, (req, res) => {
    res.render('admin/dashboard');
}];

exports.getClientes = [isAuthenticated, async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.render('admin/clientes', { clientes });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar clientes');
    }
}];

exports.getProdutos = [isAuthenticated, async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('admin/produtos', { produtos });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar produtos');
    }
}];

exports.getPagamentos = [isAuthenticated, async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        res.render('admin/pagamentos', { pagamentos });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar pagamentos');
    }
}];
