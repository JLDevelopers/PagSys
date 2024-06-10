const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');

async function createUser() {
    await sequelize.sync();

    const hashedPassword = await bcrypt.hash('teste', 10);
    const usuario = await Usuario.create({
        clienteId: 1, // Certifique-se de que o cliente correspondente exista
        email: 'teste@teste.com',
        senha: hashedPassword
    });

    console.log('Usuario criado:', usuario);
    process.exit();
}

createUser();
