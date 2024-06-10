const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota protegida para o painel do usuário
router.get('/user/dashboard', authMiddleware.isAuthenticated, userController.getDashboard);

// Rotas adicionais para clientes
router.get('/user/cursos', authMiddleware.isAuthenticated, userController.getCursos);
router.get('/user/pagamentos', authMiddleware.isAuthenticated, userController.getPagamentos);

module.exports = router;
