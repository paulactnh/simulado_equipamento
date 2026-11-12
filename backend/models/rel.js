const Funcionario = require('./Funcionario')
const Cliente = require('./Cliente')
const Equipamento = require('./Equipamento')
const Inspecao = require('./Inspecao')

Cliente.hasMany(Equipamento,{
    foreignKey: 'idCliente',
    as: 'equipamentoCliente',
    onDelete: 'CASCADE'
})

Equipamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteEquipamento',
    allowNull: false
})


Equipamento.hasMany(Inspecao,{
    foreignKey: 'idEquipamento',
    as: 'inspecaoEquipamento',
    onDelete: 'CASCADE'
})

Inspecao.belongsTo(Equipamento,{
    foreignKey: 'idEquipamento',
    as: 'equipamentoInspecao',
    allowNull: false
})

module.exports = { Funcionario, Cliente, Equipamento, Inspecao }