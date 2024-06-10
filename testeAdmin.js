// createAdmin.js

const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const Admin = require('./models/Admin');

async function createAdmin() {
    try {
        await sequelize.sync();

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await Admin.create({
            nome: 'Admin',
            email: 'admin3@exemplo.com',
            senha: hashedPassword
        });

        console.log('Admin criado:', admin);
        process.exit();
    } catch (error) {
        console.error('Erro ao criar o admin:', error);
        process.exit(1);
    }
}

createAdmin();
