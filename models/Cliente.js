const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^[0-9]+$/i // Validar apenas números
        }
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    }
});

// Associações
Cliente.associate = (models) => {
    Cliente.hasMany(models.Usuario, {
        foreignKey: 'clienteId',
        as: 'usuarios'
    });
    Cliente.hasMany(models.Pagamento, {
        foreignKey: 'clienteId',
        as: 'pagamentos'
    });
};

module.exports = Cliente;
