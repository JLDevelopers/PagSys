const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const clienteController = require('../controllers/ClienteController');
const produtoController = require('../controllers/ProdutoController');
const pagamentoController = require('../controllers/PagamentoController');
const authMiddleware = require('../middleware/authMiddleware'); // Corrigido o caminho do middleware

// Rota para exibir o formulário de login do admin
router.get('/login', adminController.getLogin);

// Rota para lidar com o envio do formulário de login do admin
router.post('/login', adminController.postLogin);

// Rotas para o dashboard do admin
router.get('/dashboard', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.getDashboard);

// Rotas para clientes
router.get('/clientes', authMiddleware.isAuthenticated, authMiddleware.isAdmin, clienteController.getClientes);
router.get('/clientes/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, clienteController.getClienteById);
router.post('/clientes', authMiddleware.isAuthenticated, authMiddleware.isAdmin, clienteController.createCliente);
router.put('/clientes/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, clienteController.updateCliente);
router.delete('/clientes/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, clienteController.deleteCliente);

// Rotas para produtos
router.get('/produtos', authMiddleware.isAuthenticated, authMiddleware.isAdmin, produtoController.getProdutos);
router.get('/produtos/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, produtoController.getProdutoById);
router.post('/produtos', authMiddleware.isAuthenticated, authMiddleware.isAdmin, produtoController.createProduto);
router.put('/produtos/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, produtoController.updateProduto);
router.delete('/produtos/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, produtoController.deleteProduto);

// Rotas para pagamentos
router.get('/pagamentos', authMiddleware.isAuthenticated, authMiddleware.isAdmin, pagamentoController.getPagamentos);
router.get('/pagamentos/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, pagamentoController.getPagamentoById);
router.post('/pagamentos', authMiddleware.isAuthenticated, authMiddleware.isAdmin, pagamentoController.createPagamento);
router.put('/pagamentos/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, pagamentoController.updatePagamento);
router.delete('/pagamentos/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, pagamentoController.deletePagamento);

module.exports = router;
