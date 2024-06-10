module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        console.log('Acesso não autorizado: usuário não autenticado');
        res.redirect('/auth/login');
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next();
    } else {
        console.log('Acesso não autorizado: usuário não é administrador');
        res.redirect('/auth/login');
    }
};

module.exports.isUser = (req, res, next) => {
    if (req.session.userId && !req.session.isAdmin) {
        return next();
    } else {
        console.log('Acesso não autorizado: usuário não autenticado');
        res.redirect('/auth/login');
    }
};
