const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Equipamento = db.define('equipamento',{
    codEquipamento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    numSerie: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idCliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'clientes',
            key: 'codCliente'
        }
    }
},{
    timestamps: false,
    tableName: 'equipamentos'
})

module.exports = Equipamento