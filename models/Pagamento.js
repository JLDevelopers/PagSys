const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Produto = require('./Produto');

const Pagamento = sequelize.define('Pagamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        },
        validate: {
            notNull: {
                msg: 'O campo usuarioId não pode ser nulo'
            }
        }
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id'
        },
        validate: {
            notNull: {
                msg: 'O campo produtoId não pode ser nulo'
            }
        }
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo data_pagamento não pode ser nulo'
            },
            isDate: {
                msg: 'O campo data_pagamento deve ser uma data válida'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo status não pode ser nulo'
            },
            isIn: {
                args: [['ativo', 'pendente', 'desativado']],
                msg: 'O campo status deve ser um dos seguintes valores: ativo, pendente, desativado'
            }
        }
    }
});

// Associações
Pagamento.associate = (models) => {
    Pagamento.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
    });
    Pagamento.belongsTo(models.Produto, {
        foreignKey: 'produtoId',
        as: 'produto'
    });
};

module.exports = Pagamento;
