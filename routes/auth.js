const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas para administradores
router.get('/admin/login', adminController.getLogin);
router.post('/admin/login', adminController.postLogin);

// Rota protegida para o painel do administrador
router.get('/admin/dashboard', authMiddleware.isAdmin, adminController.getDashboard);

// Rotas para clientes
router.get('/user/login', userController.getLogin);
router.post('/user/login', userController.postLogin);

module.exports = router;
