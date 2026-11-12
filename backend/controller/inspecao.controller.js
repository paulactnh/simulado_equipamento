const Inspecao = require('../models/Inspecao')
const Equipamento = require('../models/Equipamento')

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.status || !valores.data ||!valores.idEquipamento){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const equipamento = await Equipamento.findByPk(valores.idEquipamento)
        if(!equipamento){
            return res.status(404).json({message: 'Equipamento inexistente!!'})
        }

        await Inspecao.create(valores)
        res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar inspeção!!'})
        console.error('Erro ao tentar cadastrar inspeção!!',err)
    }
}

module.exports = { cadastrar }