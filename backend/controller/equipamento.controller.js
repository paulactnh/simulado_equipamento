const Equipamento = require('../models/Equipamento')
const Cliente = require('../models/Cliente')
const cryptoJS = require('crypto-js')
const CHAVE = 'segredo'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.modelo || !valores.fabricante ||!valores.numSerie || !valores.idCliente){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({message: 'Cliente inexistente!!'})
        }

        const numSerieCripto = cryptoJS.AES.encrypt(valores.numSerie, CHAVE).toString()

        await Equipamento.create({
            modelo: valores.modelo,
            fabricante: valores.fabricante,
            numSerie: numSerieCripto,
            idCliente: valores.idCliente
        })
        res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar equipamento!!'})
        console.error('Erro ao tentar cadastrar equipamento!!',err)
    }
}

module.exports = { cadastrar }