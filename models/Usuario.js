const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const Cliente = require('./Cliente');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id'
        },
        validate: {
            notNull: {
                msg: 'O campo clienteId não pode ser nulo'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'O campo email deve ser um email válido'
            }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo senha não pode ser vazio'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.senha) {
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        }
    }
});

// Associações
Usuario.associate = (models) => {
    Usuario.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente'
    });
    Usuario.hasMany(models.Pagamento, {
        foreignKey: 'usuarioId',
        as: 'pagamentos'
    });
};

module.exports = Usuario;
