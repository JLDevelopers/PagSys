const sequelize = require('./config/database');
const Cliente = require('./models/Cliente');

async function createCliente() {
    try {
        await sequelize.sync(); // Sincroniza os modelos com o banco de dados

        // Cria um novo cliente
        const cliente = await Cliente.create({
            nome: 'Nome do Cliente',
            telefone: '123456789',
            endereco: 'Endereço do Cliente',
            email: 'cliente@example.com',
            data_nascimento: '2000-01-01' // Data de nascimento no formato 'YYYY-MM-DD'
        });

        console.log('Cliente criado:', cliente.toJSON()); // Exibe os detalhes do cliente criado
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    } finally {
        // Fecha a conexão com o banco de dados
        await sequelize.close();
    }
}

createCliente();
