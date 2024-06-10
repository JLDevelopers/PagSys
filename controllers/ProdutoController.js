const Produto = require('../models/Produto');

exports.getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('admin/produtos', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos');
    }
};

exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('admin/produto', { produto });
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).send('Erro ao buscar produto');
    }
};

exports.createProduto = async (req, res) => {
    try {
        const { nome, descricao, valor } = req.body;
        const produto = await Produto.create({ nome, descricao, valor });
        res.redirect('/admin/produtos');
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).send('Erro ao criar produto');
    }
};

exports.updateProduto = async (req, res) => {
    try {
        const { nome, descricao, valor } = req.body;
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        await produto.update({ nome, descricao, valor });
        res.redirect('/admin/produtos');
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).send('Erro ao atualizar produto');
    }
};

exports.deleteProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        await produto.destroy();
        res.redirect('/admin/produtos');
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).send('Erro ao deletar produto');
    }
};
