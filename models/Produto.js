const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo nome não pode ser vazio'
            }
        }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo descricao não pode ser vazio'
            }
        }
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: {
                msg: 'O campo valor deve ser um número decimal'
            },
            min: {
                args: [0],
                msg: 'O campo valor deve ser maior ou igual a zero'
            }
        }
    }
});

// Associações
Produto.associate = (models) => {
    Produto.hasMany(models.Pagamento, {
        foreignKey: 'produtoId',
        as: 'pagamentos'
    });
};

module.exports = Produto;
