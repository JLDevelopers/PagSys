const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (admin) => {
            if (admin.senha) {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            }
        },
        beforeUpdate: async (admin) => {
            if (admin.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            }
        }
    }
});

// Associações (remova se não forem necessárias)
Admin.associate = (models) => {
    Admin.hasMany(models.Cliente, {
        foreignKey: 'adminId'
    });
    Admin.hasMany(models.Produto, {
        foreignKey: 'adminId'
    });
};

module.exports = Admin;
