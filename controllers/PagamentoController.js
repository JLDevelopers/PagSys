const Pagamento = require('../models/Pagamento');

exports.getPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        res.render('admin/pagamentos', { pagamentos });
    } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
        res.status(500).send('Erro ao buscar pagamentos');
    }
};

exports.getPagamentoById = async (req, res) => {
    try {
        const pagamento = await Pagamento.findByPk(req.params.id);
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrado');
        }
        res.render('admin/pagamento', { pagamento });
    } catch (error) {
        console.error('Erro ao buscar pagamento:', error);
        res.status(500).send('Erro ao buscar pagamento');
    }
};

exports.createPagamento = async (req, res) => {
    try {
        const { usuarioId, produtoId, data_pagamento, status } = req.body;
        const pagamento = await Pagamento.create({ usuarioId, produtoId, data_pagamento, status });
        res.redirect('/admin/pagamentos');
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).send('Erro ao criar pagamento');
    }
};

exports.updatePagamento = async (req, res) => {
    try {
        const { usuarioId, produtoId, data_pagamento, status } = req.body;
        const pagamento = await Pagamento.findByPk(req.params.id);
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrado');
        }
        await pagamento.update({ usuarioId, produtoId, data_pagamento, status });
        res.redirect('/admin/pagamentos');
    } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);
        res.status(500).send('Erro ao atualizar pagamento');
    }
};

exports.deletePagamento = async (req, res) => {
    try {
        const pagamento = await Pagamento.findByPk(req.params.id);
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrado');
        }
        await pagamento.destroy();
        res.redirect('/admin/pagamentos');
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        res.status(500).send('Erro ao deletar pagamento');
    }
};
