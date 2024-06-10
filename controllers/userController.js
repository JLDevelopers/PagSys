const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const Pagamento = require('../models/Pagamento');

// Middleware para verificar a sessão do usuário
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        return res.redirect('/user/login');
    }
};

exports.getLogin = (req, res) => {
    res.render('user/login');
};

exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            console.log('Usuário não encontrado:', email);
            return res.render('user/login', { error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            console.log('Senha incorreta para o usuário:', email);
            return res.render('user/login', { error: 'Senha incorreta' });
        }

        // Define informações de autenticação na sessão
        req.session.userId = usuario.id;
        console.log('ID do usuário na sessão:', req.session.userId);
        res.redirect('/user/dashboard');
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).send('Ocorreu um erro durante o login');
    }
};

exports.getDashboard = [isAuthenticated, (req, res) => {
    res.render('user/dashboard');
}];

exports.getCursos = [isAuthenticated, async (req, res) => {
    try {
        // Recupera todos os cursos do banco de dados
        const cursos = await Produto.findAll();
        // Renderiza a view user/cursos, passando os cursos como contexto
        console.log('Cursos encontrados:', cursos);
        res.render('user/cursos', { cursos });
    } catch (error) {
        console.error('Erro ao recuperar cursos:', error);
        res.status(500).send('Ocorreu um erro ao recuperar os cursos');
    }
}];

exports.getPagamentos = [isAuthenticated, async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll({ where: { usuarioId: req.session.userId } });
        res.render('user/pagamentos', { pagamentos });
    } catch (error) {
        console.error('Erro ao recuperar pagamentos:', error);
        res.status(500).send('Ocorreu um erro ao recuperar os pagamentos');
    }
}];
