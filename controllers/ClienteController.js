const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.render('admin/clientes', { clientes });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro ao buscar clientes');
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).send('Cliente não encontrado');
        }
        res.render('admin/cliente', { cliente });
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).send('Erro ao buscar cliente');
    }
};

exports.createCliente = async (req, res) => {
    try {
        const { nome, telefone, endereco, email, data_nascimento } = req.body;
        const cliente = await Cliente.create({ nome, telefone, endereco, email, data_nascimento });
        res.redirect('/admin/clientes');
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).send('Erro ao criar cliente');
    }
};

exports.updateCliente = async (req, res) => {
    try {
        const { nome, telefone, endereco, email, data_nascimento } = req.body;
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).send('Cliente não encontrado');
        }
        await cliente.update({ nome, telefone, endereco, email, data_nascimento });
        res.redirect('/admin/clientes');
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).send('Erro ao atualizar cliente');
    }
};

exports.deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).send('Cliente não encontrado');
        }
        await cliente.destroy();
        res.redirect('/admin/clientes');
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).send('Erro ao deletar cliente');
    }
};
