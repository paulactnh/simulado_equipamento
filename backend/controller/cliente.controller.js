const Cliente = require('../models/Cliente')
const cryptoJS = require('crypto-js')
const CHAVE = 'segredo'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.nome || !valores.cpf){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const cpfCripto = cryptoJS.AES.encrypt(valores.cpf, CHAVE).toString()

        await Cliente.create({
            nome: valores.nome,
            cpf: cpfCripto
        })
        res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar cliente!!'})
        console.error('Erro ao tentar cadastrar cliente!!',err)
    }
}

const consultar = async (req,res) => {
    const id = req.params.id
    
    try {
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: 'Cliente inexistente!!'})
        }
        const bytes = cryptoJS.AES.decrypt(cliente.cpf, CHAVE)
        const cpfDescript = bytes.toString(cryptoJS.enc.Utf8)

        res.status(200).json({
            nome: cliente.nome,
            cpf: cpfDescript
        })
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar consultar cliente!!'})
        console.error('Erro ao tentar consultar cliente!!',err)
    }
}

const apagar = async (req,res) => {
    const id = req.params.id
    
    try {
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: 'Cliente inexistente!!'})
        }

        await Cliente.destroy({where:{codCliente: id}})

        res.status(200).json({message: 'Cliente apagado com sucesso!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar consultar cliente!!'})
        console.error('Erro ao tentar consultar cliente!!',err)
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const id = req.params.id


    if(!valores.codCliente || !valores.nome || !valores.cpf){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }

    try {
        const cliente = await Cliente.findByPk(valores.codCliente)
        if(!cliente){
            return res.status(404).json({message: 'Cliente inexistente!!'})
        }

        const cpfCripto = cryptoJS.AES.encrypt(valores.cpf, CHAVE).toString()

        await Cliente.update({
            nome: valores.nome,
            cpf: cpfCripto
        },{where: {codCliente: valores.codCliente}})
        res.status(201).json({message: 'Dados atualizados com sucesso!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar atualizar cliente!!'})
        console.error('Erro ao tentar atualizar cliente!!',err)
    }
}

module.exports = { cadastrar, consultar, apagar, atualizar }